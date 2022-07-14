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
        var cnpjError = 0;
        var formTitle = document.getElementsByClassName('wrapper-title')[0];
        var formSubtitle = document.getElementsByClassName('wrapper-subtitle')[0];
        var modals = document.querySelector('.block-form').querySelectorAll('.modal');
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
            formTitle.textContent = 'Login';
            formSubtitle.style.display = 'block';
          } else {
            owl.trigger('next.owl.carousel');
            e.target.textContent = 'Clique aqui.';
            e.target.parentNode.firstElementChild.innerText = 'Deseja fazer o login?';  
            formTitle.textContent = 'Cadastro';
            formSubtitle.style.display = 'none';
          }
        })        

        for (let index = 0; index < document.getElementsByClassName('form-item--error-message').length; index++) {
          const element = document.getElementsByClassName('form-item--error-message')[index];
          if(element.innerText.includes("cnpj")) hasError = true;
          else hasError = false;
        }

        setTimeout(() => {
          if(hasError) {
            owl.trigger('next.owl.carousel');

            for (let i = 0; i < $('[data-modal]').length; i++) {
              const e = $('[data-modal]')[i]; 

              let modal = e.dataset.modal;
    
              if(current) {
                e.textContent = 'Clique aqui.';
                e.parentNode.firstElementChild.innerText = 'Deseja fazer o login?';
                formTitle.textContent = 'Cadastro';
                formSubtitle.style.display = 'none';
              } else {
                e.textContent = 'Cadastre-se aqui.';
                e.parentNode.firstElementChild.innerText = 'Não tem cadastro ainda?';
                formTitle.textContent = 'Login';
                formSubtitle.style.display = 'block';
              }              
            }
          } else {
            owl.trigger('play.owl.carousel');
          }
          
          for (let i = 0; i < modals.length; i++) {
            modals[i].style.opacity = 1
          }          
        })
      });
    }    
  };

})(jQuery, Drupal);
;
