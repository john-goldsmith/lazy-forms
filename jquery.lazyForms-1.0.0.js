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
          spriteWidth          : {
            left   : 5,
            middle : 1,
            right  : 5
          },
          spriteHeight         : {
            left   : 30,
            middle : 30,
            right  : 30
          },
          spriteUnits          : 'px',
          spriteDirection      : 'vertical',
          pathToSprite         : {
            left   : 'images/button_left_vertical.png',
            middle : 'images/button_mid_vertical.png',
            right  : 'images/button_right_vertical.png'
          },
          spriteOrder          : {
            left   : ['mouseOut', 'mouseOver'],
            middle : ['mouseOut', 'mouseOver'],
            right  : ['mouseOut', 'mouseOver']
          },
          htmlWrapperTag       : 'div',
          htmlWrapperClass     : 'lazy-button-wrapper',
          htmlAnchorClass      : 'lazy-button-anchor',
          htmlSpanClass        : 'lazy-button-span',
          onBeforeClick        : false,
          onAfterClick         : false,
          onBeforeMouseOver    : false,
          onAfterMouseOver     : false,
          onBeforeMouseOut     : false,
          onAfterMouseOut      : false
        },
        select : {
          spriteWidth          : {
            left   : 5,
            middle : 1,
            right  : 29
          },
          spriteHeight         : {
            left   : 30,
            middle : 30,
            right  : 30
          },
          spriteUnits          : 'px',
          spriteDirection      : 'vertical',
          pathToSprite         : {
            left   : 'images/select_left_vertical.png',
            middle : 'images/select_mid_vertical.png',
            right  : 'images/select_right_vertical.png'
          },
          spriteOrder          : {
            left   : ['mouseOut', 'mouseOver'],
            middle : ['mouseOut', 'mouseOver'],
            right  : ['mouseOut', 'mouseOver']
          },
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

    // Based on what type of form element it is, figure out which subset of options to use
    if ( this.tag == 'input' ) {
      this.isInput = true;
      if ( this.attrType == 'checkbox' ) {
        this.isCheckbox = true;
        this.options = this.options.checkbox;
      } else if ( this.attrType == 'radio' ) {
        this.isRadio = true;
        this.options = this.options.radio;
      } else if ( this.attrType == 'button' ) {
        this.isInputButton = true;
        this.options = this.options.button;
      } else if ( this.attrType == 'submit' ) {
        this.isSubmit = true;
        this.options = this.options.button;
      }
      //this.options = this.options[ this.attrType ];
    } else if ( this.tag == 'select' ) {
      this.isSelect = true;
      this.options = this.options.select;
    } else if ( this.tag == 'button' ) {
      this.isButton = true;
      this.options = this.options.button;
    } else {
      this.notSupported = true;
      // TODO: Unsupported tags
      //return;
    };

    this.init();
  };

  /**
   * Public methods
   */

  LazyForms.prototype.init = function () {

    this.rebind = function () {
      this.unbind();
      this.bind();
    };

    this.unbind = function () {
      // TODO: Allow ability to unbind (destroy?) the plugin
    };

    this.bind = function () {
      // TODO: Allow ability to bind the plugin (to another element?)
    };

    this.injectWrapper = function () {
      if ( this.options.htmlWrapperTag && typeof( this.options.htmlWrapperTag ) == 'string' ) {
        this.rawHtmlWrapperTag = this.options.htmlWrapperTag.replace(/[^a-zA-Z]/g, '').toLowerCase();
        this.$element.wrap( '<' + this.rawHtmlWrapperTag + '/>' );
        this.setWrapper();
        this.setWrapperClass();
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
        
      });
    };

    // TODO: Upon initialization, checked for pre-selected checkboxes, radios, selects, etc.

    this.injectLabel = function () {
      if ( this.isInput ) {
        if ( this.isCheckbox || this.isRadio ) {
          if ( this.$element.attr('data-label') ) {
            this.$wrapper.append( '<label/>' );
            this.setLabel();
            this.setLabelClass();
            this.$label.html( this.$element.attr('data-label') );
          };
        } else if ( this.isSubmit || this.isInputButton ) {
          this.setLabel();
          this.$midSpan.html( this.$label );
        };
      } else if ( this.isSelect || this.isButton ) {
        this.setLabel();
        this.$midSpan.html( this.$label );
      };
      
    };

    this.setLabel = function () {
      // TODO: Note that for checkboxes and radios, this.$label is an actual object, whereas for submits, buttons, and selects it's just text
      if ( this.isInput ) {
        if ( this.isCheckbox || this.isRadio ) {
          this.$label = this.$element.siblings('label');
        } else if ( this.isSubmit || this.isInputButton ) {
          this.$label = this.$element.attr('value');
        };
      } else if ( this.isSelect ) {
        this.$label = this.$element.children('option').first().html();
      } else if ( this.isButton ) {
        this.$label = this.$element.html();
      };
    };

    this.setLabelClass = function () {
      if ( this.isInput ) {
        if ( this.isCheckbox || this.isRadio ) {
          if ( this.options.htmlLabelClass && typeof( this.options.htmlLabelClass ) == 'string' ) {
            this.$label.addClass( this.options.htmlLabelClass );
          };
        };
      };
    };

    this.injectAnchor = function () {
      this.$wrapper.append('<a href="#"/>');
      this.setAnchor();
      this.injectSpans();
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
      if ( this.isInput ) {
        if ( this.isCheckbox || this.isRadio ) {
          if ( this.options.pathToSprite && typeof( this.options.pathToSprite ) == 'string' ) {
            this.$anchor.css({
              'background-image' : 'url(' + this.options.pathToSprite + ')',
              'background-repeat': 'no-repeat no-repeat',
              'height' : this.rawSpriteHeight + this.options.spriteUnits,
              'width'  : this.rawSpriteWidth + this.options.spriteUnits,
              'display': 'block'
            });
          };
        } else if ( this.isSubmit || this.isInputButton ) {
          this.$anchor.css({
            'display' : 'block',
            //'height' : '',
            //'width' : ''
          });
          this.$leftSpan.css({
            'background-image' : 'url(' + this.options.pathToSprite.left + ')',
            'background-repeat' : 'no-repeat',
            'width' : this.rawSpriteWidth.left,
            'height' : this.rawSpriteHeight.left,
            'display': 'block',
            'float' : 'left'
          });
          this.$midSpan.css({
            'background-image' : 'url(' + this.options.pathToSprite.middle + ')',
            'background-repeat' : 'repeat-x',
            //'width' : this.rawSpriteWidth.middle,
            'height' : this.rawSpriteHeight.middle,
            'display': 'block',
            'float' : 'left',
            'vertical-align' : 'middle',
            'line-height' : this.rawSpriteHeight.middle + this.options.spriteUnits
          });
          this.$rightSpan.css({
            'background-image' : 'url(' + this.options.pathToSprite.right + ')',
            'background-repeat' : 'no-repeat',
            'width' : this.rawSpriteWidth.right,
            'height' : this.rawSpriteHeight.right,
            'display': 'block',
            'float' : 'left'
          });
        };
      } else if ( this.isSelect || this.isButton ) {
        this.$anchor.css({
          'display' : 'block',
          //'height' : '',
          //'width' : ''
        });
        this.$leftSpan.css({
          'background-image' : 'url(' + this.options.pathToSprite.left + ')',
          'background-repeat' : 'no-repeat',
          'width' : this.rawSpriteWidth.left,
          'height' : this.rawSpriteHeight.left,
          'display': 'block',
          'float' : 'left'
        });
        this.$midSpan.css({
          'background-image' : 'url(' + this.options.pathToSprite.middle + ')',
          'background-repeat' : 'repeat-x',
          //'width' : this.rawSpriteWidth.middle,
          'height' : this.rawSpriteHeight.middle,
          'display': 'block',
          'float' : 'left',
          'vertical-align' : 'middle',
          'line-height' : this.rawSpriteHeight.middle + this.options.spriteUnits
        });
        this.$rightSpan.css({
          'background-image' : 'url(' + this.options.pathToSprite.right + ')',
          'background-repeat' : 'no-repeat',
          'width' : this.rawSpriteWidth.right,
          'height' : this.rawSpriteHeight.right,
          'display': 'block',
          'float' : 'left'
        });
      };

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

    this.injectSpans = function () {
      if ( this.isInput ) {
        if ( this.isSubmit || this.isInputButton ) {
          this.$anchor.append('<span/><span/><span/>');
        };
      } else if ( this.isSelect || this.isButton ) {
        this.$anchor.append('<span/><span/><span/>');
      };
      this.setSpans();
      this.setSpanClass();
    };

    this.setSpans = function () {
      this.$spans     = this.$anchor.children('span');
      this.$leftSpan  = this.$anchor.children('span').first();
      this.$midSpan   = this.$anchor.children('span:not(:first, :last)')
      this.$rightSpan = this.$anchor.children('span').last();
    };

    this.setSpanClass = function () {
      if ( this.options.htmlSpanClass && typeof(this.options.htmlSpanClass) == 'string' ) {
        this.$spans.addClass( this.options.htmlSpanClass );
        this.$leftSpan.addClass( this.options.htmlSpanClass + '-left' );
        this.$midSpan.addClass( this.options.htmlSpanClass + '-mid' );
        this.$rightSpan.addClass( this.options.htmlSpanClass + '-right' );
      };
    };

    this.hideElement = function () {
      this.$element.hide();
    };

    this.computeSprite = function () {this.spriteStates = {};

      if ( this.options.spriteOrder && typeof( this.options.spriteOrder ) == 'object' ) {
        this.spriteOrderLength = _.size( this.options.spriteOrder ); // TODO: Don't rely on Underscore
      };

      if ( this.isInput ) {

        this.spriteStates = {};

        if ( this.isCheckbox || this.isRadio ) {

          if ( this.options.spriteWidth ) {
            this.rawSpriteWidth = ( typeof( this.options.spriteWidth ) == 'number' ) ? this.options.spriteWidth : parseInt( this.options.spriteWidth );
          };
          if ( this.options.spriteHeight ) {
            this.rawSpriteHeight = ( typeof( this.options.spriteHeight ) == 'number' ) ? this.options.spriteHeight : parseInt( this.options.spriteHeight );
          };

          for ( var i = 0; i < this.spriteOrderLength; i++ ) {
            if ( this.options.spriteDirection == 'vertical' ) {
              this.spriteStates[ this.options.spriteOrder[ i ] ] = '0' + this.options.spriteUnits + ' ' + ((this.rawSpriteHeight * i) * -1).toString() + this.options.spriteUnits;
            } else if ( this.options.spriteDirection == 'horizontal' ) {
              this.spriteStates[ this.options.spriteOrder[ i ] ] = ((this.rawSpriteWidth * i) * -1).toString() + this.options.spriteUnits + ' 0' + this.options.spriteUnits;
            };
          };

        } else if ( this.isSubmit || this.isInputButton ) {

          this.spriteStates = {
            left : {},
            middle : {},
            right : {}
          };

          this.rawSpriteHeight = {
            left : null,
            middle : null,
            right : null
          };

          this.rawSpriteWidth = {
            left : null,
            middle : null,
            right : null
          };

          this.spriteOrderKeys  = _.keys( this.options.spriteOrder );
          this.spriteWidthKeys  = _.keys( this.options.spriteWidth );
          this.spriteHeightKeys = _.keys( this.options.spriteHeight );

          this.spriteOrderKeysLength = this.spriteOrderKeys.length;
          this.spriteWidthKeysLength = this.spriteWidthKeys.length;
          this.spriteHeightKeysLength = this.spriteHeightKeys.length;

          if ( this.options.spriteWidth.left ) {
            this.rawSpriteWidth.left = ( typeof( this.options.spriteWidth.left ) == 'number' ) ? this.options.spriteWidth.left : parseInt( this.options.spriteWidth.left );
          };
          if ( this.options.spriteHeight.left ) {
            this.rawSpriteHeight.left = ( typeof( this.options.spriteHeight.left ) == 'number' ) ? this.options.spriteHeight.left : parseInt( this.options.spriteHeight.left );
          };

          if ( this.options.spriteWidth.middle ) {
            this.rawSpriteWidth.middle = ( typeof( this.options.spriteWidth.middle ) == 'number' ) ? this.options.spriteWidth.middle : parseInt( this.options.spriteWidth.middle );
          };
          if ( this.options.spriteHeight.middle ) {
            this.rawSpriteHeight.middle = ( typeof( this.options.spriteHeight.middle ) == 'number' ) ? this.options.spriteHeight.middle : parseInt( this.options.spriteHeight.middle );
          };

          if ( this.options.spriteWidth.right ) {
            this.rawSpriteWidth.right = ( typeof( this.options.spriteWidth.right ) == 'number' ) ? this.options.spriteWidth.right : parseInt( this.options.spriteWidth.right );
          };
          if ( this.options.spriteHeight.right ) {
            this.rawSpriteHeight.right = ( typeof( this.options.spriteHeight.right ) == 'number' ) ? this.options.spriteHeight.right : parseInt( this.options.spriteHeight.right );
          };

          for ( var i = 0; i < this.spriteOrderLength; i++ ) {

            var spanOrder = this.spriteOrderKeys[ i ];
            var mouseOrder = this.options.spriteOrder[ this.spriteOrderKeys[ i ] ];

            for (var j = 0; j < mouseOrder.length; j++ ) {

              if ( this.options.spriteDirection == 'vertical' ) {
                this.spriteStates[ spanOrder ][ mouseOrder[ j ] ] = '0' + this.options.spriteUnits + ' ' + ((this.rawSpriteHeight[ spanOrder ] * j) * -1).toString() + this.options.spriteUnits;
              } else if ( this.options.spriteDirection == 'horizontal' ) {
                this.spriteStates[ spanOrder ][ mouseOrder[ j ] ] = ((this.rawSpriteWidth[ spanOrder ] * j) * -1).toString() + this.options.spriteUnits + ' 0' + this.options.spriteUnits;
              };

            };

          };

        };

      } else if ( this.isSelect || this.isButton ) {

        this.spriteStates = {
          left : {},
          middle : {},
          right : {}
        };

        this.rawSpriteHeight = {
          left : null,
          middle : null,
          right : null
        };

        this.rawSpriteWidth = {
          left : null,
          middle : null,
          right : null
        };

        this.spriteOrderKeys  = _.keys( this.options.spriteOrder );
        this.spriteWidthKeys  = _.keys( this.options.spriteWidth );
        this.spriteHeightKeys = _.keys( this.options.spriteHeight );

        this.spriteOrderKeysLength = this.spriteOrderKeys.length;
        this.spriteWidthKeysLength = this.spriteWidthKeys.length;
        this.spriteHeightKeysLength = this.spriteHeightKeys.length;

        if ( this.options.spriteWidth.left ) {
          this.rawSpriteWidth.left = ( typeof( this.options.spriteWidth.left ) == 'number' ) ? this.options.spriteWidth.left : parseInt( this.options.spriteWidth.left );
        };
        if ( this.options.spriteHeight.left ) {
          this.rawSpriteHeight.left = ( typeof( this.options.spriteHeight.left ) == 'number' ) ? this.options.spriteHeight.left : parseInt( this.options.spriteHeight.left );
        };

        if ( this.options.spriteWidth.middle ) {
          this.rawSpriteWidth.middle = ( typeof( this.options.spriteWidth.middle ) == 'number' ) ? this.options.spriteWidth.middle : parseInt( this.options.spriteWidth.middle );
        };
        if ( this.options.spriteHeight.middle ) {
          this.rawSpriteHeight.middle = ( typeof( this.options.spriteHeight.middle ) == 'number' ) ? this.options.spriteHeight.middle : parseInt( this.options.spriteHeight.middle );
        };

        if ( this.options.spriteWidth.right ) {
          this.rawSpriteWidth.right = ( typeof( this.options.spriteWidth.right ) == 'number' ) ? this.options.spriteWidth.right : parseInt( this.options.spriteWidth.right );
        };
        if ( this.options.spriteHeight.right ) {
          this.rawSpriteHeight.right = ( typeof( this.options.spriteHeight.right ) == 'number' ) ? this.options.spriteHeight.right : parseInt( this.options.spriteHeight.right );
        };

        for ( var i = 0; i < this.spriteOrderLength; i++ ) {

          var spanOrder = this.spriteOrderKeys[ i ];
          var mouseOrder = this.options.spriteOrder[ this.spriteOrderKeys[ i ] ];

          for (var j = 0; j < mouseOrder.length; j++ ) {

            if ( this.options.spriteDirection == 'vertical' ) {
              this.spriteStates[ spanOrder ][ mouseOrder[ j ] ] = '0' + this.options.spriteUnits + ' ' + ((this.rawSpriteHeight[ spanOrder ] * j) * -1).toString() + this.options.spriteUnits;
            } else if ( this.options.spriteDirection == 'horizontal' ) {
              this.spriteStates[ spanOrder ][ mouseOrder[ j ] ] = ((this.rawSpriteWidth[ spanOrder ] * j) * -1).toString() + this.options.spriteUnits + ' 0' + this.options.spriteUnits;
            };

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

      if ( this.isCheckbox ) {
        this.$wrapper.toggle( function ( event ) {
          self.checkboxClickOn( event );
        }, function ( event ) {
          self.checkboxClickOff( event );
        });
      } else if ( this.isRadio ) {
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

    this.buildCheckbox = function () {

    };

    this.buildRadio = function () {

    };

    this.buildSelect = function () {

    };

    this.buildButton = function () {

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