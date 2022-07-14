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
        $(document).on('submit','.form',function(e){
          $(e.target).submit();
          console.log(e);
        });
      })();      
    }
  };

})(jQuery, Drupal);
;
