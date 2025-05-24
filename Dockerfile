# Use PHP 8.3 with Apache
FROM php:8.3-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install system dependencies, PHP extensions, and SSH
RUN apt-get update && apt-get install -y \
    openssh-server \
    libzip-dev zip unzip curl git \
    && docker-php-ext-install pdo pdo_mysql zip

# Create SSH folder and set root password
RUN mkdir /var/run/sshd \
    && echo 'root:rootpassword' | chpasswd \
    && sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Install Composer from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Copy .env if not exists
RUN cp .env.example .env || true

# Avoid Composer asking questions or failing as root
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Set Apache document root to the Lumen public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Update Apache config
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Expose Apache and SSH ports
EXPOSE 80 22

# Start both SSH and Apache when container starts
CMD service ssh start && apache2-foreground
