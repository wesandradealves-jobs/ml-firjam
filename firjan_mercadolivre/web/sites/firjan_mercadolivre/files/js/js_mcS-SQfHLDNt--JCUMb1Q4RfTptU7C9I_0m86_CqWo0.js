/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.firjan_mercadolivre = {
    attach: function (context, settings) {
      $('main', context).once('firjan_mercadolivre').each(function () {
        console.log(true)
      })
    }
  };

})(jQuery, Drupal);
;
