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
        // $('[name*="cnpj"], [class*="cnpj"]').mask('00.000.000/0000-00', {reverse: true});
        $('[name*="cnpj"], [class*="cnpj"]').mask('0#');

        $(document).on('submit','.form',function(e){
          e.preventDefault();
          this.submit();
        });
      })();      
    }
  };

})(jQuery, Drupal);
;
