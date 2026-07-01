(function () {
  // Centralized reviews carousel — used on index.html and details.html.
  // Injects the markup where this script tag sits, then loops it for infinite scroll.
  var reviews = [
    {
      stars: '★★★★★',
      text: '"Increíble servicio. Muy eficaz y muy cercano y agradable, se adelantaba a las demandas y necesidades que tenía y aportó incontables soluciones novedosas y creativas. Volveré a acudir a él sin duda."',
      author: 'Natalia Sierra',
      href: 'https://maps.app.goo.gl/hv4825F8jdd6TdKe6',
      verified: 'verificado'
    },
    {
      stars: '★★★★★',
      text: '"Vicente is a great web designer and professional. I highly recommend working with him. He helped with my website and I am really happy with the results."',
      author: 'Matías Obando Ruiz',
      href: 'https://maps.app.goo.gl/Xt7aHorCtVC6YFfu5',
      verified: 'verified'
    }
  ];

  var cards = reviews.map(function (r) {
    return '' +
      '<div class="review-card">' +
        '<div class="review-body">' +
          '<div class="review-stars">' + r.stars + '</div>' +
          '<div class="review-text">' + r.text + '</div>' +
          '<div class="review-author">' + r.author +
            ' &nbsp;<a class="verified-link" href="' + r.href + '" target="_blank" rel="noopener">' + r.verified + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }).join('');

  var html = '' +
    '<div class="reviews">' +
      '<div class="reviews-label">' +
        '<span data-lang="en">What clients say</span>' +
        '<span data-lang="es">Lo que dicen los clientes</span>' +
      '</div>' +
      '<div class="carousel-track-wrap">' +
        '<div class="carousel-track" id="reviews-track">' + cards + '</div>' +
      '</div>' +
    '</div>';

  var script = document.currentScript;
  script.insertAdjacentHTML('beforebegin', html);

  // Duplicate the cards so the -50% scroll loops seamlessly.
  var track = script.previousElementSibling.querySelector('#reviews-track');
  Array.from(track.children).forEach(function (item) {
    track.appendChild(item.cloneNode(true));
  });
  track.style.animationDuration = '20s';
})();
