/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.firjan_mercadolivre = {
    attach: function (context, settings) {
      (function() {
        $('[name*="cpf"]').mask('000.000.000-00', {reverse: true});
        $(".form").submit(function(e){
            return false;

            setTimeout(() => {
              $(this).submit()
            }, 500)
        });        
      })();      
    }
  };

})(jQuery, Drupal);
;
