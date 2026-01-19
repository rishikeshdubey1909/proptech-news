# One-Command Setup Guide

## 🚀 Simplest Way: Run This on Your Server

### On Your VPS/Server, Run:

```bash
# Download and run setup script
curl -fsSL https://raw.githubusercontent.com/rishikeshdubey1909/proptech-news/main/auto-setup.sh | bash
```

**OR** if you have the repo cloned:

```bash
cd proptech-news
bash auto-setup.sh
```

---

## 📋 What the Script Does Automatically

1. ✅ Installs Node.js, PHP, MySQL, Nginx
2. ✅ Downloads and configures WordPress
3. ✅ Creates database and user
4. ✅ Clones your Next.js repo
5. ✅ Installs dependencies
6. ✅ Builds Next.js app
7. ✅ Configures Nginx
8. ✅ Starts PM2
9. ✅ Everything ready!

---

## 🎯 After Script Runs

### 1. Complete WordPress Installation

Visit: `http://your-server-ip/wordpress/wp-admin`

- Enter site title, admin username, password
- Click "Install WordPress"

### 2. Install WPGraphQL Plugin

1. In WordPress admin → Plugins → Add New
2. Search "WPGraphQL"
3. Install and Activate

### 3. Test Your Site

Visit: `http://your-server-ip` (or your domain)

Should see your Next.js site with WordPress content!

---

## 🔧 Manual Steps (If Script Fails)

If the automated script doesn't work, follow:

1. `SINGLE_HOST_SETUP.md` - Complete manual guide
2. `SETUP_CHECKLIST.md` - Step-by-step checklist

---

## ✅ Verification

```bash
# Check services
pm2 status              # Next.js should be running
sudo systemctl status nginx    # Nginx should be active
sudo systemctl status mysql    # MySQL should be active

# Test WordPress API
curl http://localhost/wordpress/wp-json/wp/v2/posts

# Test GraphQL
curl -X POST http://localhost/wordpress/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

---

## 🎉 That's It!

The script does everything. You just need to:
1. Run the script
2. Complete WordPress installation in browser
3. Install WPGraphQL plugin
4. Done!
