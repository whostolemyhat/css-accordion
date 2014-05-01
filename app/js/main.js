$(document).ready(function() {
    accordion.init();
});

var accordion = (function () {

    /**
    * init
    *
    * Loop through each instance and trigger accordion functionality
    */
    function init() {
      $('.accordion').each(function() {
        accordion($(this));
      });
    }

    /**
    * accordion
    *
    * Sets config options for each accordion, hides content and adds click handler
    * elementDOM: jQuery object of accordion
    */
    function accordion(elementDOM) {
      // set config
      elementDOM.settings = populateOptions(elementDOM);

      // hide content
      hideAccordionContent(elementDOM);

      // handle clicks
      $('.' + elementDOM.settings.triggerClass + ' a', elementDOM).off('click').on('click', function(e) {
        e.preventDefault();

        var triggerDOM = $(this);

        if(elementDOM.settings.thereCanBeOnlyOne) {
          if(triggerDOM.hasClass(elementDOM.settings.closedClass)) {
            // if clicking on already open item, don't want the content to hide then show again
            // so only close everything if you're trying to open an item which is currently closed
            closeAll(elementDOM);
          }
        }

        if(triggerDOM.hasClass(elementDOM.settings.closedClass)) {
          triggerDOM.closest('.' + elementDOM.settings.triggerClass).next('.' + elementDOM.settings.contentClass).addClass(elementDOM.settings.contentOpenClass);
          triggerDOM.removeClass(elementDOM.settings.closedClass).addClass(elementDOM.settings.openClass);
        } else if(triggerDOM.hasClass(elementDOM.settings.openClass)) {
          triggerDOM.removeClass(elementDOM.settings.openClass).addClass(elementDOM.settings.closedClass);
          triggerDOM.closest('.' + elementDOM.settings.triggerClass).next('.' + elementDOM.settings.contentClass).removeClass(elementDOM.settings.contentOpenClass);
        }
      });
    }

    /**
    * hideAccordionContent
    *
    * Hides all content and adds closed class. Skips any elements with open class
    * elementDOM: jQuery object of accordion container class
    */
    function hideAccordionContent(elementDOM) {
      $('.' + elementDOM.settings.triggerClass + ' a', elementDOM).each(function() {
        var triggerDOM = $(this);

        // if trigger has open class set, leave it open
        if(!triggerDOM.hasClass(elementDOM.settings.openClass)) {
          triggerDOM.addClass(elementDOM.settings.closedClass);
          if(triggerDOM.closest('.' + elementDOM.settings.triggerClass).next('.' + elementDOM.settings.contentClass).is(':visible')) {
              triggerDOM.closest('.' + elementDOM.settings.triggerClass).next('.' + elementDOM.settings.contentClass).removeClass(elementDOM.settings.contentOpenClass);
            }
          } else {
            triggerDOM.closest('.' + elementDOM.settings.triggerClass).next('.' + elementDOM.settings.contentClass).addClass(elementDOM.settings.contentOpenClass);
          }
      });
    }


    /**
    * populateOptions
    *
    * Set config options from data attributes on accordion container
    * elementDOM: jQuery object of accordion container
    */
    function populateOptions(elementDOM) {
      var settings = {
        closedClass: elementDOM.data('accordion-closed-class') || 'closed',
        contentClass: elementDOM.data('accordion-content-class') || 'accordion-content',
        contentOpenClass: elementDOM.data('accordion-content-open-class') || 'content-open',
        openClass: elementDOM.data('accordion-open-class') || 'open',
        speed: elementDOM.data('accordion-speed') || 300,
        thereCanBeOnlyOne: elementDOM.data('accordion-there-can-be-only-one') || false,
        triggerClass: elementDOM.data('accordion-trigger-class') || 'accordion-trigger'
      };

      return settings;
    }

    /**
    * closeAll
    *
    * Hide all content and set appropriate classes
    *
    * elementDOM: jQuery object of accordion container
    */
    function closeAll(elementDOM) {
      $('.' + elementDOM.settings.contentClass, elementDOM).removeClass(elementDOM.settings.contentOpenClass);
      $('.' + elementDOM.settings.triggerClass + ' a', elementDOM)
        .removeClass(elementDOM.settings.openClass)
        .addClass(elementDOM.settings.closedClass);
    }


    return {
      init: init
    };
    
})();
