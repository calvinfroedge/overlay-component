/*
 * Overlay Component
 *
 * Options:
 * {
 *  classes: ['foo', 'bar'], //A list of custom classes to add to the overlay
 *  close: function(){}, //A callback on close
 *  noShow: true //Don't show the modal when the instance is created (You can use modal.show())
 * }
 */
(function (module) {
    if (typeof define === "function" && define.amd) {
        define(['jquery'], function ($){ 
          return module.component($); 
        });
    } else {
        window.Overlay = module.component($);
    }
}({
  component: function($){
    /*
     * Keep a list of els
     */
    var els = {}

    /*
     * Overlay
     */
    var Overlay = function(content, o){
      $('.overlay').remove();
      var o = o || {};
      var overlay = $('<div class="overlay"><div class="overlay-bg"></div><div class="overlay-content-wrapper"><a href="#" class="overlay-close">Close</a><div class="overlay-content"></div></div></div>');

      els.container = overlay;

      overlay.css({
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0,
        'z-index': 9999,
        'color':'black'
      });

      if(o.classes){
        $.each(o.classes, function(i, class_){
          overlay.addClass(class_);
        });
      }

      var bg = overlay.find('.overlay-bg');
      bg.css({
        'position': 'absolute',
        'background-color': 'rgba(255,255,255,1)',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0'
      });
      els.bg = bg;

      var contentWrapper = overlay.find('.overlay-content-wrapper');
      contentWrapper.css({
        'width': '80%',
        'margin': '0 auto',
        'position': 'relative'
      });
      els.contentWrapper = contentWrapper;

      var contentContainer = overlay.find('.overlay-content');
      contentContainer.css({
        'position': 'relative',
        'background-color': 'rgba(255,255,255,1.0)',
        'padding': '2em',
        'overflow-y': 'auto',
        'box-sizing': 'border-box'
      });
      els.contentContainer = contentContainer;

      var closeBtn = overlay.find('.overlay-close');
      closeBtn.css({
        'position': 'absolute',
        'top': 0,
        'right': 0,
        'display': 'inline-block'
      });
      els.closeBtn = closeBtn;

      contentContainer.append(content);

      /*
       * Set the overlay's vertical position
       */
      function position(){
        overlay.css('height', $(window).height());
        var topPos = $(document).scrollTop();
        var y = $(document).scrollTop() 
            + ($(window).height() / 10);

        if(y < 0) y = 20;

        y = Math.max(y, '40');

        contentContainer.css('top', y);

        contentContainer.trigger('overlay:position', {y: y});

        closeBtn.css('top', y / 2 - 5);
      }

      /*
       * Apply sizing constraints
       */
      function constraints(){
        //Shouldn't bleed over the end of the page, should scroll instead
        var height = contentContainer.height();
        var offset = parseInt(contentContainer.css('top').replace('px', ''));

        var windowheight = $(window).height();
        var newHeight = windowheight - (2 * offset);
        contentContainer.css('height', windowheight - (2 * offset) + 'px');
      }

      /*
       * Apply positioning and constraints simultaneously
       */ 
      function positionAndConstrain(){
        position();
        constraints();
      }

      /*
       * Close the overlay
       */
      var close = function(){
        overlay.fadeOut('fast', function(){
          $(window).off('resize.overlay');
          overlay.off();
          overlay.remove();

          contentContainer.trigger('overlay:close');

          if(o.onClose){
            o.onClose();
          }
        });
      }

      /*
       * Overlay should close when the close button is clicked
       */
      overlay.find('.overlay-close').click(function(e){
        e.preventDefault();
        close();
      });

      /*
       * Show the overlay
       */
      var show = function(){
        overlay.hide();
        overlay.appendTo('body');
        overlay.fadeIn('fast');
        positionAndConstrain();
      }

      /*
       * Open the overlay
       */
      if(!o.noShow) show();

      /*
       * When the window resizes, reposition the overlay
       */
      $(window).on('resize.overlay', function(){
        positionAndConstrain();
      });

      /*
       * Return API for interacting with the overlay programmatically
       */
      return {
        els: els,
        show: show,
        close: close,
        position: positionAndConstrain
      }
    }

    return Overlay;
  }
}));
