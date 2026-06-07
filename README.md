# Ur Friendly Photographer - GitHub Pages demo site

A static photography request site designed for GitHub Pages.

## Demo flow

1. Open `index.html`.
2. Go to Albums.
3. Open an album and click photos.
4. Add a few photos to the request list.
5. Open Request and create the email request.

## Replace these before publishing

### Email address

Open:

`assets/js/site.js`

Change:

```js
const PHOTOGRAPHER_EMAIL = "replace-with-jess-email@example.com";
```

### PayPal link

Open:

`request.html`

Find the PayPal placeholder link and replace it with Jess's real PayPal.me link.

### Demo images

Replace the images inside:

- `assets/images/albums/sunset-demo/`
- `assets/images/albums/nature-demo/`
- `assets/images/albums/city-demo/`

Only upload watermarked, lower-resolution preview images to the website. Keep the original full-quality files private and send them only after payment/request confirmation.

## Photo IDs

The included demo IDs are:

- `UFP-SUN-001` etc
- `UFP-NAT-001` etc
- `UFP-CITY-001` etc

When replacing photos, keep unique IDs so customers can clearly request the right photos.

## GitHub Pages

Upload this folder to a GitHub repository and enable GitHub Pages from the repository settings.
