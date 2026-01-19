# Single-Host Setup Checklist

## ✅ Server Setup

- [ ] Server/VPS with Ubuntu 20.04+ (2GB+ RAM, 2+ CPU)
- [ ] Domain name pointed to server IP
- [ ] SSH access configured
- [ ] Firewall configured (ports 22, 80, 443)

## ✅ Software Installation

- [ ] Node.js 18+ installed
- [ ] PM2 installed globally
- [ ] PHP 8.1+ installed
- [ ] PHP-FPM installed and running
- [ ] MySQL/MariaDB installed
- [ ] Nginx installed and running

## ✅ WordPress Setup

- [ ] WordPress downloaded to `/home/youruser/wordpress`
- [ ] Database created (`wordpress_db`)
- [ ] Database user created with permissions
- [ ] `wp-config.php` configured with database credentials
- [ ] Headless configuration added to `wp-config.php`
- [ ] `functions.php` created with headless code
- [ ] WordPress installation completed via browser
- [ ] WPGraphQL plugin installed and activated
- [ ] ACF plugin installed (optional)
- [ ] WPGraphQL for ACF installed (if using ACF)

## ✅ Next.js Setup

- [ ] Repository cloned to `/home/youruser/proptech-news`
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with WordPress GraphQL URL
- [ ] App built successfully (`npm run build`)
- [ ] PM2 configured to run Next.js
- [ ] PM2 startup script configured

## ✅ Nginx Configuration

- [ ] Nginx config file created
- [ ] Next.js proxy configured (port 3000)
- [ ] WordPress `/cms` location configured
- [ ] GraphQL endpoint accessible
- [ ] Config tested (`nginx -t`)
- [ ] Nginx restarted

## ✅ Testing

- [ ] WordPress admin accessible: `https://yourbrand.com/cms/wp-admin`
- [ ] GraphQL endpoint works: `https://yourbrand.com/cms/graphql`
- [ ] Next.js frontend loads: `https://yourbrand.com`
- [ ] Next.js fetches data from WordPress
- [ ] Content appears on frontend

## ✅ Security

- [ ] SSL certificate installed (Let's Encrypt)
- [ ] HTTPS redirect configured
- [ ] WordPress file editing disabled
- [ ] Strong passwords set
- [ ] Firewall rules configured

## ✅ Monitoring

- [ ] PM2 monitoring Next.js
- [ ] Nginx logs accessible
- [ ] WordPress logs configured
- [ ] Backup strategy planned

---

## 🚀 Quick Commands Reference

```bash
# Check services
pm2 status
sudo systemctl status nginx
sudo systemctl status php8.1-fpm
sudo systemctl status mysql

# View logs
pm2 logs proptech-news
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart proptech-news
sudo systemctl restart nginx

# Deploy updates
cd /home/youruser/proptech-news
git pull
npm install
npm run build
pm2 restart proptech-news
```
