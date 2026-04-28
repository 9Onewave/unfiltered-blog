# Unfiltered — Setup Guide

## File Structure

```
unfiltered/
├── index.html          ← Homepage (blog feed)
├── about.html          ← About page
├── contact.html        ← Contact page
├── css/
│   └── style.css       ← All styling
├── js/
│   ├── posts.js        ← Your blog post data (edit this to add posts)
│   └── main.js         ← Filter logic & copy protection
└── posts/
    └── getting-started-investing.html   ← Example post (template)
```

---

## Step 1 — Create a GitHub Account
Go to https://github.com and sign up for free.

---

## Step 2 — Create a Repository
1. Click the green "New" button on your GitHub dashboard
2. Name it exactly: `yourusername.github.io`
   (replace "yourusername" with your actual GitHub username)
3. Set it to Public
4. Click "Create repository"

---

## Step 3 — Upload Your Files
1. On your new repo page, click "Add file" → "Upload files"
2. Drag in all the files and folders from this project
3. Click "Commit changes"

Your site will be live at: https://yourusername.github.io

---

## Step 4 — Set Up Google Analytics (view your traffic)
1. Go to https://analytics.google.com
2. Sign in with a Google account
3. Click "Start measuring" → create an account named "Unfiltered"
4. Create a property → choose "Web" → enter your GitHub Pages URL
5. Copy your Measurement ID (looks like G-XXXXXXXXXX)
6. In index.html, about.html, contact.html, and every post file:
   Replace `G-XXXXXXXXXX` with your actual ID
7. Push the changes to GitHub

You'll start seeing visitor data within 24-48 hours.

---

## Step 5 — Submit to Google Search Console (get on Google)
1. Go to https://search.google.com/search-console
2. Click "Add property" → choose "URL prefix"
3. Enter your GitHub Pages URL
4. Verify ownership (Google will give you an HTML file to upload to your repo)
5. Submit your sitemap — for a simple site like this, just submit:
   https://yourusername.github.io/index.html

Google will start indexing your pages. It usually takes 1-4 weeks to show up in search results.

---

## Step 6 — Set Up the Contact Form (real email delivery)
1. Go to https://formspree.io and sign up free
2. Create a new form and copy your form endpoint (looks like https://formspree.io/f/abcdefgh)
3. In contact.html, replace `YOUR_FORM_ID` in the form action URL
4. Messages will now be delivered to your email

---

## How to Add a New Blog Post

### Step 1 — Add the post data
Open `js/posts.js` and copy this block at the TOP of the POSTS array:

```js
{
  id: "your-post-slug",
  title: "Your Post Title Here",
  category: "Finance",            // Must match a filter button category exactly
  summary: "One or two sentences describing what the post is about.",
  date: "28 Apr 2026",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-XXXXXXX?w=800&q=80",
  file: "posts/your-post-slug.html"
},
```

Available categories: Finance, Fitness & Health, Engineering, Life, Investing, Politics

### Step 2 — Create the post HTML file
1. Copy `posts/getting-started-investing.html`
2. Rename it to match your slug (e.g. `posts/your-post-slug.html`)
3. Update:
   - The `<title>` tag
   - The `<meta name="description">` content
   - The `<span class="post-category-badge">` text
   - The `<h1 class="post-title">` text
   - The date and read time in `.post-meta`
   - The cover image `src`
   - The article body content inside `<article class="post-content">`

### Step 3 — Push to GitHub
Upload the updated `posts.js` and new HTML file to your GitHub repo.
Your new post will appear on the homepage automatically.

---

## Free image sources (use these for post cover images)
- https://unsplash.com — high quality, free
- https://www.pexels.com — also free
- Copy the image URL and use it directly in posts.js

---

## Copy Protection
The site already includes:
- Right-click disabled on all pages
- Ctrl+C / Ctrl+U / Ctrl+S / Ctrl+A disabled on post content
- Images are non-draggable
- Text selection disabled on post content

Note: This stops casual copying but is not 100% foolproof. Anyone determined enough can still view source. The copyright notice in the footer provides legal protection.
