# Push Project to GitHub

## Quick Commands

Run these commands in your terminal from the project directory:

```bash
cd /Users/rishikeshdubey/Downloads/Us/ProjectA

# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: PropTech News platform with Next.js and headless WordPress setup"

# 4. Create new repository on GitHub (via web or CLI)
# Option A: Using GitHub CLI (if installed)
gh repo create proptech-news --public --source=. --remote=origin --push

# Option B: Manual steps (if GitHub CLI not available)
# 4a. Go to https://github.com/new
# 4b. Create new repository named "proptech-news" (or your preferred name)
# 4c. Don't initialize with README, .gitignore, or license
# 4d. Copy the repository URL

# 5. Add remote and push (if using manual method)
git remote add origin https://github.com/YOUR_USERNAME/proptech-news.git
git branch -M main
git push -u origin main
```

## Step-by-Step Instructions

### Step 1: Initialize Git Repository

```bash
cd /Users/rishikeshdubey/Downloads/Us/ProjectA
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: PropTech News platform with Next.js and headless WordPress setup"
```

### Step 4: Create GitHub Repository

**Option A: Using GitHub CLI (Recommended)**

If you have GitHub CLI installed:

```bash
gh repo create proptech-news --public --source=. --remote=origin --push
```

**Option B: Using GitHub Website**

1. Go to https://github.com/new
2. Repository name: `proptech-news` (or your preferred name)
3. Description: "PropTech-focused B2B news and intelligence website built with Next.js and headless WordPress"
4. Choose Public or Private
5. **Don't** check "Add a README file"
6. **Don't** check "Add .gitignore"
7. **Don't** check "Choose a license"
8. Click "Create repository"

### Step 5: Connect and Push (If using manual method)

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/proptech-news.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Verify Push

After pushing, verify by:
1. Going to: `https://github.com/YOUR_USERNAME/proptech-news`
2. You should see all your files
3. Check that `.env.local` and `node_modules` are NOT in the repo (they're in .gitignore)

## What Gets Pushed

✅ **Included:**
- All source code
- Configuration files
- Documentation
- WordPress setup files

❌ **Excluded (via .gitignore):**
- `node_modules/`
- `.next/`
- `.env.local`
- `.env`
- Build files
- Cache files

## Troubleshooting

### Authentication Issues

If you get authentication errors:

**Option 1: Use Personal Access Token**
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/proptech-news.git
```

**Option 2: Use SSH (if configured)**
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/proptech-news.git
```

**Option 3: Use GitHub CLI**
```bash
gh auth login
```

### Permission Denied

If you get permission errors:
- Make sure you're logged into GitHub
- Check repository permissions
- Verify you have write access

### Large Files

If you have large files:
- Make sure they're in `.gitignore`
- Use Git LFS if needed: `git lfs install`

## Next Steps After Push

1. ✅ Add repository description on GitHub
2. ✅ Add topics/tags: `nextjs`, `wordpress`, `headless-cms`, `proptech`
3. ✅ Enable GitHub Pages (if needed)
4. ✅ Set up GitHub Actions for CI/CD (optional)
5. ✅ Add collaborators (if team project)

## Repository Settings

After creating the repo, consider:

1. **Settings → General**
   - Add description
   - Enable Issues
   - Enable Discussions

2. **Settings → Secrets**
   - Add `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` (if needed)
   - Add deployment secrets

3. **Settings → Branches**
   - Protect main branch
   - Require pull request reviews
