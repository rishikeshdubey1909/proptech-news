# Troubleshooting: Blank Page Issue

## The Problem
You're seeing a blank page because macOS is blocking Next.js from reading files in `node_modules` due to extended attributes (security feature).

## Quick Fix (Run in Terminal)

```bash
cd /Users/rishikeshdubey/Downloads/Us/ProjectA

# Option 1: Run the fix script
./fix-permissions.sh

# Option 2: Manual fix (if script doesn't work)
sudo find node_modules -type f -exec xattr -c {} \;
sudo find node_modules -type d -exec xattr -c {} \;
sudo chmod -R u+r node_modules
rm -rf .next

# Then restart
npm run dev
```

## Alternative: Move Project Location

If permissions keep getting re-added, try moving the project to a different location:

```bash
# Move to a location without restrictions
mv /Users/rishikeshdubey/Downloads/Us/ProjectA ~/Projects/proptech-news
cd ~/Projects/proptech-news
npm install
npm run dev
```

## Check macOS Security Settings

1. Open **System Settings** → **Privacy & Security**
2. Under **Full Disk Access**, add your Terminal app
3. Restart Terminal and try again

## If Still Not Working

Try using a different Node version manager or reinstall Node.js:

```bash
# If using Homebrew
brew reinstall node

# Or use nvm
nvm install 20
nvm use 20
npm install
npm run dev
```
