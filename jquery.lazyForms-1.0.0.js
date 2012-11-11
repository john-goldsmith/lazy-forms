;(function ($, window) {

  var defaults = {
        checkbox : {
          spriteWidth          : 20,
          spriteHeight         : 20,
          spriteUnits          : 'px',
          spriteOrder          : ['uncheckedMouseOut', 'uncheckedMouseOver', 'checkedMouseOut', 'checkedMouseOver'],
          spriteDirection      : 'vertical',
          pathToSprite         : 'images/checkbox_vertical.png',
          labelToThe           : 'right',
          htmlWrapperTag       : 'div',
          htmlWrapperClass     : 'lazy-checkbox-wrapper',
          htmlAnchorClass      : 'lazy-checkbox-anchor',
          htmlLabelClass       : 'lazy-checkbox-label',
          onBeforeClick        : false,
          onAfterClick         : false,
          onBeforeMouseOver    : false,
          onAfterMouseOver     : false,
          onBeforeMouseOut     : false,
          onAfterMouseOut      : false
        },
        radio : {
          spriteWidth          : 20,
          spriteHeight         : 20,
          spriteUnits          : 'px',
          spriteOrder          : ['uncheckedMouseOut', 'uncheckedMouseOver', 'checkedMouseOut', 'checkedMouseOver'],
          spriteDirection      : 'vertical',
          pathToSprite         : 'images/radio_vertical.png',
          labelToThe           : 'right',
          htmlWrapperTag       : 'div',
          htmlWrapperClass     : 'lazy-radio-wrapper',
          htmlAnchorClass      : 'lazy-radio-anchor',
          htmlLabelClass       : 'lazy-radio-label',
          onBeforeClick        : false,
          onAfterClick         : false,
          onBeforeMouseOver    : false,
          onAfterMouseOver     : false,
          onBeforeMouseOut     : false,
          onAfterMouseOut      : false
        },
        button : {
          spriteLeftWidth      : 5,
          spriteLeftHeight     : 30,
          spriteMidWidth       : 1,
          spriteMidHeight      : 30,
          spriteRightWidth     : 5,
          spriteRightHeight    : 30,
          spriteUnits          : 'px',
          spriteOrder          : ['mouseOut', 'mouseOver'],
          spriteDirection      : 'vertical',
          pathToLeftSprite     : 'images/button_left_vertical.png',
          pathToMidSprite      : 'images/button_mid_vertical.png',
          pathToRightSprite    : 'images/button_right_vertical.png',
          htmlWrapperTag       : 'div',
          htmlWrapperClass     : 'lazy-button-wrapper',
          htmlAnchorClass      : 'lazy-button-anchor',
          onBeforeClick        : false,
          onAfterClick         : false,
          onBeforeMouseOver    : false,
          onAfterMouseOver     : false,
          onBeforeMouseOut     : false,
          onAfterMouseOut      : false
        },
        select : {
          spriteLeftWidth      : 5,
          spriteLeftHeight     : 30,
          spriteMidWidth       : 1,
          spriteMidHeight      : 30,
          spriteRightWidth     : 29,
          spriteRightHeight    : 30,
          spriteUnits          : 'px',
          spriteOrder          : ['mouseOut', 'mouseOver'],
          spriteDirection      : 'vertical',
          pathToLeftSprite     : 'images/select_left_vertical.png',
          pathToMidSprite      : 'images/select_mid_vertical.png',
          pathToRightSprite    : 'images/select_right_vertical.png',
          htmlWrapperTag       : 'div',
          htmlWrapperClass     : 'lazy-select-wrapper',
          htmlAnchorClass      : 'lazy-select-anchor',
          htmlSpanClass        : 'lazy-select-span',
          onBeforeClick        : false,
          onAfterClick         : false,
          onBeforeMouseOver    : false,
          onAfterMouseOver     : false,
          onBeforeMouseOut     : false,
          onAfterMouseOut      : false
        }
      },
      pluginName = 'lazyForms',
      document = window.document;

  /**
   * Constructor
   */

  function LazyForms (element, options) {
    this.element    = element;
    this.$element   = $(element);
    this.tag        = this.$element.prop('tagName').toLowerCase();
    this.attrName   = this.$element.attr('name');
    this.options    = $.extend( {}, defaults, options );
    this._defaults  = defaults;
    this._name      = pluginName;
    if (this.tag == 'input') {
      this.attrType = this.$element.attr('type');
    };

    this.init();
  };

  /**
   * Private members
   */

  var _myPrivateVar;

  /**
   * Private methods
   */

  var _myPrivateMethod = function () {
    
  };

  /**
   * Public methods
   */

  LazyForms.prototype.init = function () {

    this.rebind = function () {
      this.unbind();
      this.bind();
    };

    this.bind = function () {
      // TODO: Allow ability to unbind (destroy?) the plugin
    };

    this.unbind = function () {
      // TODO: Allow ability to rebind the plugin
    };

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
      if ( this.attrType == 'checkbox' ) {
        if ( this.options.pathToCheckboxSprite && typeof( this.options.pathToCheckboxSprite ) == 'string' ) {
          this.pathToSprite = this.options.pathToCheckboxSprite;
        };
      } else if ( this.attrType == 'radio' ) {
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

    this.resetGroup = function () {
      $( this.tag + '[type="' + this.attrType + '"][name="' + this.attrName + '"]' ).attr( 'checked', false );
      $( this.tag + '[type="' + this.attrType + '"][name="' + this.attrName + '"]' ).siblings( this.$label ).css({
        'background-position' : this.spriteStates.uncheckedMouseOut
      });
    };

    this.radioClick = function ( event ) {
      this.resetGroup();
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

      if ( this.attrType == 'checkbox' ) {
        this.$wrapper.toggle( function ( event ) {
          self.checkboxClickOn( event );
        }, function ( event ) {
          self.checkboxClickOff( event );
        });
      } else if ( this.attrType == 'radio' ) {
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
    return this.each( function () {
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' + pluginName, new LazyForms( this, options ) );
      };
    });
  };

})($, window);