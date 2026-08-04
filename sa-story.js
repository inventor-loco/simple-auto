/* sa-story.js — photo carousel for the About page.
   To add photos: drop the files into img/story/ and add one entry per photo below.
   Leave PHOTOS empty and nothing is rendered at all. See img/story/README.md. */
(function () {
  var PHOTOS = [
    // { file: 'lab-01.jpg', en: 'ICT Laboratory, University of Chile', es: 'Laboratorio TIC, Universidad de Chile' },
    // { file: 'lab-02.jpg', en: 'Sensor prototype for an industrial partner', es: 'Prototipo de sensor para un socio industrial' },
  ];

  if (!PHOTOS.length) return;

  function slide(p) {
    var caption = '';
    if (p.en || p.es) {
      caption = '<div class="story-caption">' +
        (p.en ? '<span data-lang="en">' + p.en + '</span>' : '') +
        (p.es ? '<span data-lang="es">' + p.es + '</span>' : '') +
      '</div>';
    }
    return '<figure class="story-card">' +
      '<img src="img/story/' + p.file + '" alt="" loading="lazy" />' +
      caption +
    '</figure>';
  }

  // The track holds the list twice so the CSS loop (translateX -50%) is seamless.
  var slides = PHOTOS.map(slide).join('');

  var html = '<section class="story">' +
    '<div class="story-label">' +
      '<span data-lang="en">where we come from</span>' +
      '<span data-lang="es">de dónde venimos</span>' +
    '</div>' +
    '<div class="carousel-track-wrap">' +
      '<div class="carousel-track" style="animation-duration:' + Math.max(30, PHOTOS.length * 9) + 's">' +
        slides + slides +
      '</div>' +
    '</div>' +
  '</section>';

  document.currentScript.insertAdjacentHTML('beforebegin', html);
})();
