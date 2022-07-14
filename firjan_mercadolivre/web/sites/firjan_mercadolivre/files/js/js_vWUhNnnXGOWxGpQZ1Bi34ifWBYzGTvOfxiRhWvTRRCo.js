/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.firjan_mercadolivre = {
    attach: function (context, settings) {
      $(window).on('load', function () {
        var hasError = document.getElementsByClassName('form-item--error-message').length;
        var current = 0;

        $('[name*="cnpj"], [class*="cnpj"]').mask('0#');

        var owl = $('.owl-form').owlCarousel({
          loop:false,
          nav:false,
          autoplay: false, 
          dots:false,
          items: 1,
          autoHeight:true,
          autoHeightClass: 'owl-height',
          mouseDrag:false,
          animateIn: 'false',
          touchDrag:false,
          pullDrag:false,
          freeDrag:false,
        });

        owl.on('changed.owl.carousel', function (e) {
          current = e.item.index
        })        

        $("body").on("click", "[data-modal]", function(e){
          if(current) {
            owl.trigger('prev.owl.carousel');
            e.target.textContent = 'Cadastre-se aqui.';
            e.target.parentNode.firstElementChild.innerText = 'Não tem cadastro ainda?';   
          } else {
            owl.trigger('next.owl.carousel');
            e.target.textContent = 'Clique aqui.';
            e.target.parentNode.firstElementChild.innerText = 'Deseja fazer o login?';  
          }
        })        

        setTimeout(() => {
          if(hasError) {
            owl.trigger('next.owl.carousel');

            for (let i = 0; i < $('[data-modal]').length; i++) {
              const e = $('[data-modal]')[i]; 

              let modal = e.dataset.modal;
    
              if(current) {
                e.textContent = 'Clique aqui.';
                e.parentNode.firstElementChild.innerText = 'Deseja fazer o login?';
              } else {
                e.textContent = 'Cadastre-se aqui.';
                e.parentNode.firstElementChild.innerText = 'Não tem cadastro ainda?';
              }              
            }
          }
        }, "100")
      });
    }    
  };

})(jQuery, Drupal);
;
