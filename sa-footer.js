(function () {
  var html = '<footer>' +
    '<div class="footer-inner">' +
      '<div class="footer-nap">' +
        '<div class="footer-brand"><span class="logo-simple">simple</span><span class="logo-auto">auto</span></div>' +
        '<div><span data-lang="en">Trusted technology consultants helping businesses since 2015.</span><span data-lang="es">Consultores tecnológicos de confianza ayudando a negocios desde 2015.</span></div>' +
        '<div><a href="tel:+34677028042">+34 677 028 042</a></div>' +
        '<div>C. Practicante Ignacio Rodríguez, Edificio Polivalente II,<br>Oficina 209, 35017 Las Palmas de Gran Canaria, Las Palmas</div>' +
      '</div>' +
      '<div class="footer-map">' +
        '<a href="https://maps.app.goo.gl/UGoYU6PrfWXQBvTcA" target="_blank" rel="noopener" style="display:block;position:relative;">' +
          '<iframe' +
            ' title="Ubicación simpleauto"' +
            ' loading="lazy"' +
            ' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.1!2d-15.4538161!3d28.0791876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc4095536eafa225:0x87c8f1d4f708b3ed!2ssimpleauto!5e0!3m2!1ses!2ses!4v1"' +
            ' allowfullscreen' +
            ' style="pointer-events:none;"' +
          '></iframe>' +
          '<span style="position:absolute;inset:0;"></span>' +
        '</a>' +
      '</div>' +
    '</div>' +
  '</footer>';

  document.currentScript.insertAdjacentHTML('beforebegin', html);
})();
