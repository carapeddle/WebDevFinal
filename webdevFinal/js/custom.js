/*added by Claire*/

document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = this.querySelector('input').value;
  if (query) {
      // Redirect to search results page or handle search
      window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
  }
});

/*added by Claire*/




  (function ($) {
  
  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').delay(500).slideUp('slow'); // set duration in brackets    
    });

    // NAVBAR
    $(".navbar").headroom();

    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    $('.slick-slideshow').slick({
      autoplay: true,
      infinite: true,
      arrows: false,
      fade: true,
      dots: true,
    });

    $('.slick-testimonial').slick({
      arrows: false,
      dots: true,
    });
    
  })(window.jQuery);
