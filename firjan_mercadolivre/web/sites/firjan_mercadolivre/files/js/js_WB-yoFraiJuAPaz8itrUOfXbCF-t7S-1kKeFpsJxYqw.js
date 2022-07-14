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
        var o = XMLHttpRequest.prototype.open;
        window.openHTTPs = 0;
        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
          window.openHTTPs++;
          this.addEventListener("readystatechange", function(e) {
              // if(this.readyState == 4) {
              //   window.openHTTPs--;
              // }
              console.log(this)
            }, false);
          o.call(this, method, url, async, user, pass);
        }
      })();      
    }
  };

})(jQuery, Drupal);
;
