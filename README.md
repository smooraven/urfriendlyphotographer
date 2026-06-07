# Jess Photography - GitHub Pages Starter

A free static photography site for GitHub Pages.

## What this does

- Home page
- Albums page
- Sample album page
- Photo request basket using browser localStorage
- Lightbox preview
- Request form that opens the visitor's email app
- PayPal link placeholder

## Important setup changes

1. Open `assets/js/site.js`.
2. Replace:

```js
const JESS_EMAIL = "replace-with-jess-email@example.com";
```

with Jess's real email address.

3. Open `request.html`.
4. Replace the PayPal button link:

```html
<a class="button primary" href="https://www.paypal.com/" target="_blank" rel="noopener">Open PayPal</a>
```

with Jess's real PayPal.me or donation link.

## Adding a new album

1. Create a folder in:

```txt
assets/images/albums/
```

Example:

```txt
assets/images/albums/mt-coot-tha-2026/
```

2. Add lower-resolution watermarked preview images only.

Never upload full-quality unwatermarked originals to GitHub.

3. Copy `album-sample.html`, rename it, and update:

- Page title
- Album title
- Photo IDs
- Image paths
- Alt text

4. Add the album link to `albums.html`.

## Publishing on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files.
3. Go to repository Settings.
4. Go to Pages.
5. Set source to `Deploy from a branch`.
6. Choose `main` branch and `/root`.
7. Save.

Your site will publish as a GitHub Pages URL.
