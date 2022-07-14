/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.firjan_mercadolivre = {
    attach: function (context, settings) {
      var init = function() {
        var hasError = document.getElementsByClassName('form-item--error-message').length;
        var cnpjError = 0;
        var formTitle = document.getElementsByClassName('wrapper-title')[0];
        var formSubtitle = document.getElementsByClassName('wrapper-subtitle')[0];
        var modals = document.querySelector('.block-form').querySelectorAll('.modal');
        var current = 0;    
        var bool = false;
        var cnpjs = [];

        const getTaxonomies = (url) => {
          return Promise.resolve($.ajax({
              url: url
          }));                  
        }          

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
            // owl.trigger('prev.owl.carousel');
            owl.trigger('to.owl.carousel', [0, 500, true]);
            e.target.textContent = 'Cadastre-se aqui.';
            e.target.parentNode.firstElementChild.innerText = 'Não tem cadastro ainda?';   
            formTitle.textContent = 'Login';
            formSubtitle.style.display = 'block';
          } else {
            // owl.trigger('next.owl.carousel');
            owl.trigger('to.owl.carousel', [1, 500, true]);
            e.target.textContent = 'Clique aqui.';
            e.target.parentNode.firstElementChild.innerText = 'Deseja fazer o login?';  
            formTitle.textContent = 'Cadastro';
            formSubtitle.style.display = 'none';
          }
        })        

        for (let index = 0; index < document.getElementsByClassName('form-item--error-message').length; index++) {
          const element = document.getElementsByClassName('form-item--error-message')[index];
          if(element.innerText.includes("cnpj") || element.innerText.includes("CNPJ")) cnpjError+=1
        }

        setTimeout(() => {
          if(cnpjError) {
            // owl.trigger('next.owl.carousel');
            owl.trigger('to.owl.carousel', [2, 500, true]);

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
          
          // $(document).ajaxComplete(function (e) { 
          //   console.log(e, 'Request Complete'); 
          // });    
          
          $( document ).ajaxComplete(function( event, xhr, settings ) {
            console.log(xhr)
          });     
          
          $(document).on('submit','form.cpf',function(e) {
            var counter = 0;

            var val = $(this).serialize();
            val = val.split('=')[1];         

            getTaxonomies('/jsonapi/taxonomy_term/whitelist?fields[whitelist--name]=name&sort=name&page[limit]=50').then(response => {
              // if(response.data.length) {
              //   response.data.forEach(element => {
              //     if(counter < response.data.length) counter+=1
              //     console.log(counter)
              //   });
              // } 
              console.log(response)
            }).catch(error => console.log(error));    

            e.preventDefault();
          });              
        })
      }    

      window.onload = init;
    }    
  };

})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, drupalSettings) {
  Drupal.behaviors.activeLinks = {
    attach: function attach(context) {
      var path = drupalSettings.path;
      var queryString = JSON.stringify(path.currentQuery);
      var querySelector = path.currentQuery ? "[data-drupal-link-query='".concat(queryString, "']") : ':not([data-drupal-link-query])';
      var originalSelectors = ["[data-drupal-link-system-path=\"".concat(path.currentPath, "\"]")];
      var selectors;

      if (path.isFront) {
        originalSelectors.push('[data-drupal-link-system-path="<front>"]');
      }

      selectors = [].concat(originalSelectors.map(function (selector) {
        return "".concat(selector, ":not([hreflang])");
      }), originalSelectors.map(function (selector) {
        return "".concat(selector, "[hreflang=\"").concat(path.currentLanguage, "\"]");
      }));
      selectors = selectors.map(function (current) {
        return current + querySelector;
      });
      var activeLinks = context.querySelectorAll(selectors.join(','));
      var il = activeLinks.length;

      for (var i = 0; i < il; i++) {
        activeLinks[i].classList.add('is-active');
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        var activeLinks = context.querySelectorAll('[data-drupal-link-system-path].is-active');
        var il = activeLinks.length;

        for (var i = 0; i < il; i++) {
          activeLinks[i].classList.remove('is-active');
        }
      }
    }
  };
})(Drupal, drupalSettings);;
