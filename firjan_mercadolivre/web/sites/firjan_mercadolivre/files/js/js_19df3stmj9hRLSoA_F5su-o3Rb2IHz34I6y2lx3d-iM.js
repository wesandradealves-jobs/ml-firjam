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
        var submitedVal = null;
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

        setTimeout(() => {
          for (let index = 0; index < document.getElementsByClassName('form-item--error-message').length; index++) {
            const element = document.getElementsByClassName('form-item--error-message')[index];
            if(element.innerText.includes("is already taken")) {
              cnpjError+=1
              owl.trigger('to.owl.carousel', [2, 500, true]);
            }
          }
  
          if(cnpjError) {
            // owl.trigger('next.owl.carousel');
            // owl.trigger('to.owl.carousel', [2, 500, true]);

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

          if(modals && modals.length) {
            for (let i = 0; i < modals.length; i++) {
              modals[i].style.opacity = 1
            }    
          }
        }, 500)

        function isAvailable(array, val = submitedVal) {
          return array.find(el => {
            return el.attributes.name.includes(val);
          }); 
        }

        $( document ).ajaxComplete(function( event, xhr, settings ) {          
          if(xhr.responseJSON.links.next) {
            getTaxonomies(xhr.responseJSON.links.next.href).then(response => {
              if(response.data) cnpjs.push(response.data)
            }).catch(error => console.log(error));   
            
            console.log(cnpjs)

            if(cnpjs.length == 27) {
              $('.spinner').removeClass('d-flex').addClass('d-none')

              if(isAvailable(cnpjs.flat())) {
                owl.trigger('to.owl.carousel', [2, 500, true]);
                $('.block--modalblockregister .cnpj-field[name*="name"]').val(submitedVal);
              } else {
                let html = `
                  <div id="cnpj-first-validate" class="form-item--error-message mt-2">
                    Esse CNPJ não faz parte da nossa lista de associados. Colocar a caixa de Ainda não é associado? Associe-se à Firjan.
                  </div>
                `;
                $('.block--modalblockcpf .field-group[data-name="cpf"]').append(html);
                owl.trigger('refresh.owl.carousel');
              }
              cnpjs = [];
            }
          }
        });     
        
        $(document).on('submit','form.cpf',function(e) {
          if(document.querySelectorAll('#cnpj-first-validate').length) {
            document.querySelectorAll('#cnpj-first-validate').forEach(element => {
              element.parentNode.removeChild( element );
            });   
          }
          $('.block--modalblockregister .cnpj-field[name*="name"]').val();
        
          var counter = 0;
          cnpjs = [];

          $('.spinner').removeClass('d-none').addClass('d-flex')

          var val = $(this).serialize();
          submitedVal = val.split('=')[1];         

          getTaxonomies('/jsonapi/taxonomy_term/whitelist?fields[whitelist--name]=name&sort=name&page[limit]=50').then(response => {
            if(response.data) cnpjs.push(response.data)
          }).catch(error => console.log(error));    

          e.preventDefault();
        });   
      }    

      window.onload = init;

      $(".js-modal-btn").modalVideo({
        enablejsapi: true
      });

      $( ".arrow" ).click(function(e) {
        $(this).closest('.accordion-item').find('.accordion-content').toggle()
        $(this).toggleClass('--on')
      });      
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
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, storage) {
  var currentUserID = parseInt(drupalSettings.user.uid, 10);
  var secondsIn30Days = 2592000;
  var thirtyDaysAgo = Math.round(new Date().getTime() / 1000) - secondsIn30Days;
  var embeddedLastReadTimestamps = false;

  if (drupalSettings.history && drupalSettings.history.lastReadTimestamps) {
    embeddedLastReadTimestamps = drupalSettings.history.lastReadTimestamps;
  }

  Drupal.history = {
    fetchTimestamps: function fetchTimestamps(nodeIDs, callback) {
      if (embeddedLastReadTimestamps) {
        callback();
        return;
      }

      $.ajax({
        url: Drupal.url('history/get_node_read_timestamps'),
        type: 'POST',
        data: {
          'node_ids[]': nodeIDs
        },
        dataType: 'json',
        success: function success(results) {
          Object.keys(results || {}).forEach(function (nodeID) {
            storage.setItem("Drupal.history.".concat(currentUserID, ".").concat(nodeID), results[nodeID]);
          });
          callback();
        }
      });
    },
    getLastRead: function getLastRead(nodeID) {
      if (embeddedLastReadTimestamps && embeddedLastReadTimestamps[nodeID]) {
        return parseInt(embeddedLastReadTimestamps[nodeID], 10);
      }

      return parseInt(storage.getItem("Drupal.history.".concat(currentUserID, ".").concat(nodeID)) || 0, 10);
    },
    markAsRead: function markAsRead(nodeID) {
      $.ajax({
        url: Drupal.url("history/".concat(nodeID, "/read")),
        type: 'POST',
        dataType: 'json',
        success: function success(timestamp) {
          if (embeddedLastReadTimestamps && embeddedLastReadTimestamps[nodeID]) {
            return;
          }

          storage.setItem("Drupal.history.".concat(currentUserID, ".").concat(nodeID), timestamp);
        }
      });
    },
    needsServerCheck: function needsServerCheck(nodeID, contentTimestamp) {
      if (contentTimestamp < thirtyDaysAgo) {
        return false;
      }

      if (embeddedLastReadTimestamps && embeddedLastReadTimestamps[nodeID]) {
        return contentTimestamp > parseInt(embeddedLastReadTimestamps[nodeID], 10);
      }

      var minLastReadTimestamp = parseInt(storage.getItem("Drupal.history.".concat(currentUserID, ".").concat(nodeID)) || 0, 10);
      return contentTimestamp > minLastReadTimestamp;
    }
  };
})(jQuery, Drupal, drupalSettings, window.localStorage);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (window, Drupal, drupalSettings) {
  window.addEventListener('load', function () {
    if (drupalSettings.history && drupalSettings.history.nodesToMarkAsRead) {
      Object.keys(drupalSettings.history.nodesToMarkAsRead).forEach(Drupal.history.markAsRead);
    }
  });
})(window, Drupal, drupalSettings);;
