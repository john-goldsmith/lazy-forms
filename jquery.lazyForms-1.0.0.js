;(function ($, window) {

  var defaults = {
        spriteWidth          : '20px',
        spriteHeight         : '20px',
        spriteUnits          : 'px',
        spriteOrder          : ['uncheckedMouseOut', 'uncheckedMouseOver', 'checkedMouseOut', 'checkedMouseOver'],
        spriteDirection      : 'vertical',
        pathToCheckboxSprite : 'images/checkbox_sprite_vertical.png',
        pathToRadioSprite    : 'images/radio_sprite_vertical.png',
        labelToThe           : 'right',
        htmlWrapperTag       : 'div',
        htmlWrapperClass     : 'sleepy-checkbox-wrapper',
        htmlAnchorClass      : 'sleepy-checkbox-anchor',
        htmlLabelClass       : 'sleepy-checkbox-label',
      },
      pluginName = 'sleepyCheckbox',
      document = window.document;

  /*
   * Constructor
   */

  function SleepyCheckbox (element, options) {
    this.element    = element;
    this.$element   = $(element);
    this.selector   = this.$element.prop('tagName').toLowerCase();
    if (this.selector == 'input') {
      this.selectorType = this.$element.attr('type');
    };
    this.options    = $.extend( {}, defaults, options);
    this._defaults  = defaults;
    this._name      = pluginName;

    this.init();
  };

  /**
   * Public methods
   */

  SleepyCheckbox.prototype.init = function () {

    this.injectWrapper = function () {
      if ( this.options.htmlWrapperTag && typeof( this.options.htmlWrapperTag ) == 'string' ) {
        this.rawHtmlWrapperTag = this.options.htmlWrapperTag.replace(/[^a-zA-Z]/g, '').toLowerCase();
        this.$element.wrap( '<' + this.rawHtmlWrapperTag + '/>' );
        this.setWrapper();
        this.setWrapperClass();
        //this.styleWrapper();
      };
    };

    this.setWrapperClass = function () {
      if ( this.options.htmlWrapperClass && typeof(this.options.htmlWrapperClass) == 'string' ) {
        this.$wrapper.addClass( this.options.htmlWrapperClass );
      };
    };

    this.setWrapper = function () {
      this.$wrapper = this.$element.parent( this.rawHtmlWrapperTag );
    };

    this.styleWrapper = function () {
      this.$wrapper.css({
        'display' : 'inline-block'
      });
    };

    this.injectLabel = function () {
      this.$wrapper.append( '<label/>' );
      this.setLabel();
      this.setLabelClass();
      if ( this.$element.attr('data-label') ) {
        this.$label.html( this.$element.attr('data-label') );
      };
    };

    this.setLabel = function () {
      this.$label = this.$element.siblings('label');
    };

    this.setLabelClass = function () {
      if ( this.options.htmlLabelClass && typeof( this.options.htmlLabelClass ) == 'string' ) {
        this.$label.addClass( this.options.htmlLabelClass );
      };
    };

    this.injectAnchor = function () {
      this.$wrapper.append('<a href="#"/>');
      this.setAnchor();
      this.setAnchorClass();
      this.styleAnchor();
    };

    this.setAnchor = function () {
      this.$anchor = this.$element.siblings('a');
    };

    this.setAnchorClass = function () {
      if ( this.options.htmlAnchorClass && typeof(this.options.htmlAnchorClass) == 'string' ) {
        this.$anchor.addClass( this.options.htmlAnchorClass );
      };
    };

    this.styleAnchor = function () {
      if ( this.selectorType == 'checkbox' ) {
        if ( this.options.pathToCheckboxSprite && typeof( this.options.pathToCheckboxSprite ) == 'string' ) {
          this.pathToSprite = this.options.pathToCheckboxSprite;
        };
      } else if ( this.selectorType == 'radio' ) {
        if ( this.options.pathToRadioSprite && typeof( this.options.pathToRadioSprite ) == 'string' ) {
          this.pathToSprite = this.options.pathToRadioSprite;
        };
      };

      this.$anchor.css({
        'background-image' : 'url(' + this.pathToSprite + ')',
        'background-repeat': 'no-repeat no-repeat'
      });

      this.$anchor.css({
        'height' : this.rawSpriteHeight + this.options.spriteUnits,
        'width'  : this.rawSpriteWidth + this.options.spriteUnits,
        'display': 'block'
      });

      if ( this.options.labelToThe && typeof( this.options.labelToThe ) == 'string' ) {
        if ( this.options.labelToThe == 'right' ) {
          this.$anchor.css({
            'float' : 'left'
          });
        } else if ( this.options.labelToThe == 'left' ) {
          this.$anchor.css({
            'float' : 'right'
          });
        };
      };
    };

    this.hideElement = function () {
      this.$element.hide();
    };

    this.computeSprite = function () {
      if ( this.options.spriteOrder && typeof( this.options.spriteOrder ) == 'object' ) {
        this.spriteLength = this.options.spriteOrder.length;
        this.spriteStates = {};
        if ( this.options.spriteHeight ) {
          if ( typeof( this.options.spriteHeight ) == 'string' ) {
            this.rawSpriteHeight = parseInt( this.options.spriteHeight );
          } else if ( typeof( this.options.spriteHeight ) == 'number' ) {
            this.rawSpriteHeight = this.options.spriteHeight;
          };
        };
        if ( this.options.spriteWidth ) {
          if ( typeof( this.options.spriteWidth ) == 'string' ) {
            this.rawSpriteHeight = parseInt( this.options.spriteWidth );
          } else if ( typeof( this.options.spriteWidth ) == 'number' ) {
            this.rawSpriteWidth = this.options.spriteWidth;
          };
        };
        for ( var i = 0; i < this.spriteLength; i++ ) {
          if ( this.options.spriteDirection == 'vertical' ) {
            this.spriteStates[ this.options.spriteOrder[ i ] ] = '0' + this.options.spriteUnits + ' ' + ((this.rawSpriteHeight * i) * -1).toString() + this.options.spriteUnits;
          } else if ( this.options.spriteDirection == 'horizontal' ) {
            this.spriteStates[ this.options.spriteOrder[ i ] ] = ((this.rawSpriteWidth * i) * -1).toString() + this.options.spriteUnits + ' 0' + this.options.spriteUnits;
          };
        };
      };
    };

    this.customBeforeClick = function ( event ) {
      if ( this.options.onBeforeClick ) {
        this.options.onBeforeClick( this, event );
      };
    };

    this.customAfterClick = function ( event ) {
      if ( this.options.onAfterClick ) {
        this.options.onAfterClick( this, event );
      };
    };

    this.customBeforeMouseOver = function ( event ) {
      if ( this.options.onBeforeMouseOver ) {
        this.options.onBeforeMouseOver( this, event );
      };
    };

    this.customAfterMouseOver = function ( event ) {
      if ( this.options.onAfterMouseOver ) {
        this.options.onAfterMouseOver( this, event );
      };
    };

    this.customBeforeMouseOut = function ( event ) {
      if ( this.options.onBeforeMouseOut ) {
        this.options.onBeforeMouseOut( this, event );
      };
    };

    this.customAfterMouseOut = function ( event ) {
      if ( this.options.onAfterMouseOut ) {
        this.options.onAfterMouseOut( this, event );
      };
    };

    this.resetAllRadios = function () {
      $( this.selector + '[type="' + this.selectorType + '"]' ).attr( 'checked', false ); // TODO: limit this to only elements affected by the plugin
      $( this.selector + '[type="' + this.selectorType + '"]' ).siblings( this.$label ).css({
        'background-position' : this.spriteStates.uncheckedMouseOut
      });
    };

    this.radioClick = function ( event ) {
      this.resetAllRadios();
      this.$element.attr( 'checked', true );
      this.$anchor.css({
        'background-position' : this.spriteStates.checkedMouseOut
      });
    };

    this.checkboxClickOn = function ( event ) {
      event.preventDefault();
      this.customBeforeClick( event );
      this.$element.attr( 'checked', !this.$element.attr('checked') );
      this.$anchor.css({
        'background-position' : this.spriteStates.checkedMouseOut
      });
      this.customAfterClick( event );
    };

    this.checkboxClickOff = function ( event ) {
      event.preventDefault();
      this.customBeforeClick( event );
      this.$element.attr( 'checked', !this.$element.attr('checked') );
      this.$anchor.css({
        'background-position' : this.spriteStates.uncheckedMouseOut
      });
      this.customAfterClick( event );
    };

    this.mouseOut = function ( event ) {
      this.customBeforeMouseOut( event );
      if ( this.$element.attr('checked') == 'checked' ) {
        this.$anchor.css({
          'background-position' : this.spriteStates.checkedMouseOut
        });
      } else {
        this.$anchor.css({
          'background-position' : this.spriteStates.uncheckedMouseOut
        });
      };
      this.customAfterMouseOut( event );
    };

    this.mouseOver = function ( event ) {
      this.customBeforeMouseOver( event );
      if ( this.$element.attr('checked') == 'checked' ) {
        this.$anchor.css({
          'background-position' : this.spriteStates.checkedMouseOver
        });
      } else {
        this.$anchor.css({
          'background-position' : this.spriteStates.uncheckedMouseOver
        });
      };
      this.customAfterMouseOver( event );
    };

    this.bindEvents = function () {
      var self = this;

      if ( this.selectorType == 'checkbox' ) {
        this.$wrapper.toggle( function ( event ) {
          self.checkboxClickOn( event );
        }, function ( event ) {
          self.checkboxClickOff( event );
        });
      } else if ( this.selectorType == 'radio' ) {
        this.$wrapper.bind( 'click', function (event) {
          self.radioClick( event );
        });
      };

      this.$wrapper.hover( function ( event ) {
        self.mouseOver( event );
      }, function ( event ) {
        self.mouseOut( event );
      });

    };

    this.build = function () {
      this.hideElement();
      this.computeSprite();
      this.injectWrapper();
      this.injectAnchor();
      this.injectLabel();
      this.bindEvents();
    };

    this.build();

  };

  /*
   * Plugin wrapper
   */

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new SleepyCheckbox( this, options ));
      }
    });
  };

})($, window);