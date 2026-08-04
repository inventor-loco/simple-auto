# Story photos (About page carousel)

Photographs from the ICT Laboratory days and from projects since. They appear as a
slow auto-scrolling carousel on `about.html`, under the "where we come from" label.

## Adding a photo

1. Drop the image file in this folder (`img/story/`).
2. Add one line to the `PHOTOS` array at the top of `/sa-story.js`:

```js
{ file: 'lab-01.jpg', en: 'ICT Laboratory, University of Chile', es: 'Laboratorio TIC, Universidad de Chile' },
```

`en` and `es` are the caption in each language. Both are optional — omit them for an
uncaptioned photo. The carousel is hidden entirely while `PHOTOS` is empty, so
nothing breaks before the first photo is added.

## What works best

- **Format:** JPG for photos, PNG only if the image has text or flat colour.
- **Size:** roughly 1200px on the long edge is plenty. Keep files under ~400 KB;
  they are loaded lazily but this is a static site with no image pipeline.
- **Shape:** landscape works best. Cards are a fixed height and crop to fill, so a
  portrait photo will lose its top and bottom.
- **Naming:** lowercase, no spaces or accents (`lab-01.jpg`, not `Laboratorio 1.JPG`).

## Rights

Only add photos you own or have permission to publish. If people are recognisable
in a photo, make sure they are happy to appear on a public website.
