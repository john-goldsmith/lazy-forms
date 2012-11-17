/**
 * Lazy Forms
 *
 * Highly customizable HTML checkboxes, radios, dropdowns,
 * and buttons.
 *
 * https://github.com/marlorn/lazy-forms
 * 
 * Copyright 2012 John Goldsmith <http://github.com/marlorn>
 *
 */

;(function ($, window, document) {

  var

    // Set some defaults
    defaults = {

      // Checkboxes <input type="checkbox" />
      checkbox : {
        spriteWidth          : 20,
        spriteHeight         : 20,
        spriteUnits          : 'px',
        spriteOrder          : ['uncheckedMouseLeave', 'uncheckedMouseEnter', 'uncheckedMouseDown', 'checkedMouseLeave', 'checkedMouseEnter', 'checkedMouseDown'],
        spriteDirection      : 'vertical',
        pathToSprite         : 'images/checkbox_vertical.png',
        labelToThe           : 'right',
        wrapperTag           : 'div',
        wrapperClass         : 'lazy-checkbox-wrapper',
        anchorClass          : 'lazy-checkbox-anchor',
        labelClass           : 'lazy-checkbox-label',
        onBeforeClick        : false,
        onAfterClick         : false,
        onBeforeMouseOver    : false,
        onAfterMouseOver     : false,
        onBeforeMouseOut     : false,
        onAfterMouseOut      : false
      },

      // Radios <input type="radio" />
      radio : {
        spriteWidth          : 20,
        spriteHeight         : 20,
        spriteUnits          : 'px',
        spriteOrder          : ['uncheckedMouseLeave', 'uncheckedMouseEnter', 'uncheckedMouseDown', 'checkedMouseLeave', 'checkedMouseEnter', 'checkedMouseDown'],
        spriteDirection      : 'vertical',
        pathToSprite         : 'images/radio_vertical.png',
        labelToThe           : 'right',
        wrapperTag           : 'div',
        wrapperClass         : 'lazy-radio-wrapper',
        anchorClass          : 'lazy-radio-anchor',
        labelClass           : 'lazy-radio-label',
        onBeforeClick        : false,
        onAfterClick         : false,
        onBeforeMouseOver    : false,
        onAfterMouseOver     : false,
        onBeforeMouseOut     : false,
        onAfterMouseOut      : false
      },

      // Buttons <input type="submit" />, <input type="button" />, and <button>
      button : {
        spriteWidth : {
          left   : 5,
          middle : 1,
          right  : 5
        },
        spriteHeight : {
          left   : 30,
          middle : 30,
          right  : 30
        },
        spriteUnits          : 'px',
        spriteDirection      : 'vertical',
        pathToSprite : {
          left   : 'images/button_left_vertical.png',
          middle : 'images/button_mid_vertical.png',
          right  : 'images/button_right_vertical.png'
        },
        spriteOrder : {
          left   : ['mouseLeave', 'mouseEnter', 'mouseDown'],
          middle : ['mouseLeave', 'mouseEnter', 'mouseDown'],
          right  : ['mouseLeave', 'mouseEnter', 'mouseDown']
        },
        wrapperTag           : 'div',
        wrapperClass         : 'lazy-button-wrapper',
        anchorClass          : 'lazy-button-anchor',
        spanClass            : 'lazy-button-span',
        onBeforeClick        : false,
        onAfterClick         : false,
        onBeforeMouseOver    : false,
        onAfterMouseOver     : false,
        onBeforeMouseOut     : false,
        onAfterMouseOut      : false
      },

      // Dropdowns <select> parent and <option> children
      select : {
        spriteWidth : {
          left   : 5,
          middle : 1,
          right  : 29
        },
        spriteHeight : {
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
        spriteOrder : {
          left   : ['mouseLeave', 'mouseEnter', 'mouseDown'],
          middle : ['mouseLeave', 'mouseEnter', 'mouseDown'],
          right  : ['mouseLeave', 'mouseEnter', 'mouseDown']
        },
        wrapperTag           : 'div',
        wrapperClass         : 'lazy-select-wrapper',
        anchorClass          : 'lazy-select-anchor',
        spanClass            : 'lazy-select-span',
        optionsWrapperClass  : 'lazy-select-options-wrapper',
        onBeforeClick        : false,
        onAfterClick         : false,
        onBeforeMouseOver    : false,
        onAfterMouseOver     : false,
        onBeforeMouseOut     : false,
        onAfterMouseOut      : false
      }
    },

    // Set the name of the plugin
    pluginName = 'lazyForms',

    // Set a container for publicly exposed methods
    methods = {};

  /**
   * Constructor
   */

  function LazyForms (element, options) {

    // Set the current DOM node being acted upon
    this.element = element;

    // Set the current jQuery object being acted upon
    this.$element = $(element);

    // Set the current DOM node tag name being acted upon (e.g. "select" or "input")
    this.tag = this.$element.prop('tagName').toLowerCase();

    // Merge the options into the defaults
    this.options = $.extend( {}, defaults, options );

    // Set a reference to the original, un-merged defaults
    this._defaults = defaults;

    // Set a reference to the name of the plugin
    this._name = pluginName;

    // To find if we're currently acting upon a "submit", "checkbox" or "radio" element,
    // set references to the <input> "type" and "name" attributes
    if (this.tag == 'input') {
      this.attrType = this.$element.attr('type');
      this.attrName = this.$element.attr('name');
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
      // TODO: Handle an unsupported tag
    };

    // Away we go!
    this.init();

  };

  /**
   * Public methods
   */

  LazyForms.prototype.init = function () {

    // TODO: Upon initialization, checked for pre-selected checkboxes, radios, selects, etc.

    /**
     * Wrapper method to build the wrapper
     */
    this.buildWrapper = function () {
      this.injectWrapper();
      this.setWrapper();
      this.setWrapperClass();
      this.setWrapperStyle();
    };

    /**
     * Inject a wrapper around the element
     */
    this.injectWrapper = function () {
      if ( this.options.wrapperTag && typeof( this.options.wrapperTag ) == 'string' ) {
        this.rawHtmlWrapperTag = this.options.wrapperTag.replace(/[^a-zA-Z]/g, '').toLowerCase();
        this.$element.wrap( '<' + this.rawHtmlWrapperTag + '/>' );
      };
    };

    /**
     * Set a reference to the newly created wrapper
     */
    this.setWrapper = function () {
      this.$wrapper = this.$element.parent( this.rawHtmlWrapperTag );
      this.wrapper = this.$wrapper.get();
    };

    /**
     * Add a class to the wrapper, if defined
     */
    this.setWrapperClass = function () {
      if ( this.options.wrapperClass && typeof(this.options.wrapperClass) == 'string' ) {
        this.$wrapper.addClass( this.options.wrapperClass );
      };
    };

    /**
     * Apply some styles to the wrapper
     */
    this.setWrapperStyle = function () {
      this.$wrapper.css({
        //'height' : this.$wrapper.height(),
        //'width' : this.$wrapper.width()
      });
    };

    /**
     * Wrapper method to build the label
     */

    this.buildLabel = function () {
      this.injectLabel();
      this.setLabel();
      this.injectLabelText();
      this.setLabelClass();
    };

    this.injectLabel = function () {
      if ( this.isCheckbox || this.isRadio ) {
        if ( this.$element.attr('data-label') ) {
          this.$wrapper.append( '<label/>' );
        };
      } else if ( this.isSubmit || this.isInputButton ) {
        this.setLabel();
      } else if ( this.isSelect || this.isButton ) {
        this.setLabel();
      };
    };

    this.setLabel = function () {
      // TODO: Note that for checkboxes and radios, this.$label is an actual object, whereas for submits, buttons, and selects it's just text
      if ( this.isCheckbox || this.isRadio ) {
        this.$label = this.$element.siblings('label');
      } else if ( this.isSubmit || this.isInputButton ) {
        this.$label = this.$element.attr('value');
      } else if ( this.isSelect ) {
        this.$label = this.$element.children('option').first().html();
      } else if ( this.isButton ) {
        this.$label = this.$element.html();
      };
    };

    this.injectLabelText = function () {
      if ( this.isCheckbox || this.isRadio ) {
        if ( this.$element.attr('data-label') ) {
          this.$label.html( this.$element.attr('data-label') );
        };
      } else if ( this.isSubmit || this.isInputButton || this.isSelect || this.isButton ) {
        this.$midSpan.html( this.$label );
      };
    };

    this.setLabelClass = function () {
      if ( this.isCheckbox || this.isRadio ) {
        if ( this.options.labelClass && typeof( this.options.labelClass ) == 'string' ) {
          this.$label.addClass( this.options.labelClass );
        };
      };
    };


    /**
     * Wrapper method to build the anchor
     */

    this.buildAnchor = function () {
      this.injectAnchor();
      this.setAnchor();
      this.setAnchorClass();
      this.setAnchorStyle();
    };

    this.injectAnchor = function () {
      this.$wrapper.append('<a href="#"/>');
    };

    this.setAnchor = function () {
      this.$anchor = this.$element.siblings('a');
    };

    this.setAnchorClass = function () {
      if ( this.options.anchorClass && typeof(this.options.anchorClass) == 'string' ) {
        this.$anchor.addClass( this.options.anchorClass );
      };
    };

    this.setAnchorStyle = function () {

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
      } else if ( this.isSubmit || this.isInputButton || this.isSelect || this.isButton ) {
        this.$anchor.css({
          'display' : 'block',
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

    /**
     * Wrapper method to build the spans inside the anchor
     */

    this.buildSpans = function () {
      this.injectSpans();
      this.setSpans();
      this.setSpanClass();
      this.setSpanStyle();
    };

    this.injectSpans = function () {
      if ( this.isSubmit || this.isInputButton ) {
        this.$anchor.append('<span/><span/><span/>');
      } else if ( this.isSelect || this.isButton ) {
        this.$anchor.append('<span/><span/><span/>');
      };
    };

    this.setSpans = function () {
      this.$spans     = this.$anchor.children('span');
      this.$leftSpan  = this.$anchor.children('span').first();
      this.$midSpan   = this.$anchor.children('span:not(:first, :last)')
      this.$rightSpan = this.$anchor.children('span').last();
    };

    this.setSpanClass = function () {
      if ( this.options.spanClass && typeof(this.options.spanClass) == 'string' ) {
        this.$spans.addClass( this.options.spanClass );
        this.$leftSpan.addClass( this.options.spanClass + '-left' );
        this.$midSpan.addClass( this.options.spanClass + '-mid' );
        this.$rightSpan.addClass( this.options.spanClass + '-right' );
      };
    };

    this.setSpanStyle = function () {
      if ( this.isSubmit || this.isInputButton || this.isSelect || this.isButton ) {
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
    };

    /**
     * Wrapper method to build the options dropdown
     */

    this.buildOptions = function () {
      this.injectOptionsWrapper();
      this.setOptionsWrapper();
      this.setOptionsWrapperClass();
      this.toggleOptions();
      this.injectOptionsList();
      this.setOptionsList();
      this.injectOptions();
      this.setOptions();
      this.positionOptions();
    };

    foobar = function(){
      console.log('foobar');
    }

    this.injectOptionsWrapper = function () {
      if ( this.isSelect ) {
        this.$wrapper.append('<div/>');
      };
    };

    this.setOptionsWrapper = function () {
      this.$optionsWrapper = this.$wrapper.children('div');
    };

    this.setOptionsWrapperClass = function () {
      if ( this.options.optionsWrapperClass && typeof( this.options.optionsWrapperClass ) == 'string' ) {
        this.$optionsWrapper.addClass( this.options.optionsWrapperClass );
      };
    };

    this.injectOptionsList = function () {
      this.$optionsWrapper.append('<ul/>');
    };

    this.setOptionsList = function () {
      this.$optionsList = this.$optionsWrapper.children('ul');
    };

    this.injectOptions = function () {
      this.$realOptions = this.$wrapper.children('select').children('option');
      var self = this;
      this.$realOptions.each( function() {
        self.$optionsList.append('<li>' + $(this).html() + '</li>');
      });      
    };

    this.setOptions = function () {
      this.$options = this.$optionsList.children('li');
    };

    this.positionOptions = function () {
      this.$optionsWrapper.css({
        'position' : 'absolute',
        'left' : this.$wrapper.position().left,
        'top' : this.$wrapper.position().top + this.$wrapper.get(0).offsetHeight
        //'min-width' : 
      });
    };

    this.toggleOptions = function () {
      this.$optionsWrapper.toggle();
    };

    /**
     * Utility methods
     */

    this.hideElement = function () {
      this.$element.hide();
    };

    // TODO: Allow the ability to unbind and rebind on the fly
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

    this.resetGroup = function () {
      $( this.tag + '[type="' + this.attrType + '"][name="' + this.attrName + '"]' ).attr( 'checked', false );
      $( this.tag + '[type="' + this.attrType + '"][name="' + this.attrName + '"]' ).siblings( this.$label ).css({
        'background-position' : this.spriteStates.uncheckedMouseLeave
      });
    };

    this.computeSprite = function () {

      this.spriteStates = {};

      if ( this.options.spriteOrder && typeof( this.options.spriteOrder ) == 'object' ) {
        this.spriteOrderLength = _.size( this.options.spriteOrder ); // TODO: Don't rely on Underscore
      };


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

      } else if ( this.isSubmit || this.isInputButton || this.isSelect || this.isButton ) {

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

    this.customBeforeMouseDown = function ( event ) {
      if ( this.options.onBeforeMouseDown ) {
        this.options.onBeforeMouseDown( this, event );
      };
    };

    this.customAfterMouseDown = function ( event ) {
      if ( this.options.onAfterMouseDown ) {
        this.options.onAfterMouseDown( this, event );
      };
    };

    this.customBeforeMouseUp = function ( event ) {
      if ( this.options.onBeforeMouseUp ) {
        this.options.onBeforeMouseUp( this, event );
      };
    };

    this.customAfterMouseUp = function ( event ) {
      if ( this.options.onAfterMouseUp ) {
        this.options.onAfterMouseUp( this, event );
      };
    };

    this.customBeforeMouseEnter = function ( event ) {
      if ( this.options.onBeforeMouseOver ) {
        this.options.onBeforeMouseOver( this, event );
      };
    };

    this.customAfterMouseEnter = function ( event ) {
      if ( this.options.onAfterMouseOver ) {
        this.options.onAfterMouseOver( this, event );
      };
    };

    this.customBeforeMouseLeave = function ( event ) {
      if ( this.options.onBeforeMouseOut ) {
        this.options.onBeforeMouseOut( this, event );
      };
    };

    this.customAfterMouseLeave = function ( event ) {
      if ( this.options.onAfterMouseOut ) {
        this.options.onAfterMouseOut( this, event );
      };
    };

    this.mouseLeave = function ( event ) {
      this.customBeforeMouseLeave( event );
      if ( this.isCheckbox || this.isRadio ) {
        if ( this.$element.attr('checked') == 'checked' || this.$element.attr('checked') == true ) {
          this.$anchor.css({
            'background-position' : this.spriteStates.checkedMouseLeave
          });
        } else {
          this.$anchor.css({
            'background-position' : this.spriteStates.uncheckedMouseLeave
          });
        };
      } else if ( this.isSelect || this.isButton || this.isInputButton || this.isSubmit ) {
        this.$leftSpan.css({
          'background-position' : this.spriteStates.left.mouseLeave
        });
        this.$midSpan.css({
          'background-position' : this.spriteStates.middle.mouseLeave
        });
        this.$rightSpan.css({
          'background-position' : this.spriteStates.right.mouseLeave
        });
      };
      this.customAfterMouseLeave( event );
    };

    this.mouseEnter = function ( event ) {
      this.customBeforeMouseEnter( event );
      if ( this.isCheckbox || this.isRadio ) {
        if ( this.$element.attr('checked') == 'checked' || this.$element.attr('checked') == true ) {
          this.$anchor.css({
            'background-position' : this.spriteStates.checkedMouseEnter
          });
        } else {
          this.$anchor.css({
            'background-position' : this.spriteStates.uncheckedMouseEnter
          });
        };
      } else if ( this.isSelect || this.isButton || this.isInputButton || this.isSubmit ) {
        this.$leftSpan.css({
          'background-position' : this.spriteStates.left.mouseEnter
        });
        this.$midSpan.css({
          'background-position' : this.spriteStates.middle.mouseEnter
        });
        this.$rightSpan.css({
          'background-position' : this.spriteStates.right.mouseEnter
        });
      };
      this.customAfterMouseEnter( event );
    };

    this.mouseDown = function ( event ) {
      event.preventDefault();
      this.customBeforeMouseDown( event );
      if ( this.isCheckbox || this.isRadio ) {
        if ( this.$element.attr('checked') == 'checked' || this.$element.attr('checked') == true ) {
          this.$anchor.css({
            'background-position' : this.spriteStates.checkedMouseDown
          });
        } else {
          this.$anchor.css({
            'background-position' : this.spriteStates.uncheckedMouseDown
          });
        };
      } else if ( this.isSelect || this.isButton || this.isInputButton || this.isSubmit ) {
        this.$leftSpan.css({
          'background-position' : this.spriteStates.left.mouseDown
        });
        this.$midSpan.css({
          'background-position' : this.spriteStates.middle.mouseDown
        });
        this.$rightSpan.css({
          'background-position' : this.spriteStates.right.mouseDown
        });
      };
      this.customAfterMouseDown( event );
    };

    this.mouseUp = function ( event ) {
      event.preventDefault();
      this.customBeforeMouseUp( event );
      if ( this.isCheckbox ) {
        this.$element.attr( 'checked', !this.$element.attr('checked') );
        if ( this.$element.attr('checked') == 'checked' ) {
          this.$anchor.css({
            'background-position' : this.spriteStates.checkedMouseEnter
          });
        } else {
          this.$anchor.css({
            'background-position' : this.spriteStates.uncheckedMouseEnter
          });
        };
      } else if ( this.isRadio ) {
        this.resetGroup();
        this.$element.attr( 'checked', true );
        if ( this.$element.attr('checked') == 'checked' || this.$element.attr('checked') == true ) {
          this.$anchor.css({
            'background-position' : this.spriteStates.checkedMouseEnter
          });
        } else {
          this.$anchor.css({
            'background-position' : this.spriteStates.uncheckedMouseEnter
          });
        };
      } else if ( this.isSelect ) {
        this.toggleOptions();
        this.$leftSpan.css({
          'background-position' : this.spriteStates.left.mouseEnter
        });
        this.$midSpan.css({
          'background-position' : this.spriteStates.middle.mouseEnter
        });
        this.$rightSpan.css({
          'background-position' : this.spriteStates.right.mouseEnter
        });
      } else if ( this.isButton || this.isInputButton || this.isSubmit ) {
        this.$leftSpan.css({
          'background-position' : this.spriteStates.left.mouseEnter
        });
        this.$midSpan.css({
          'background-position' : this.spriteStates.middle.mouseEnter
        });
        this.$rightSpan.css({
          'background-position' : this.spriteStates.right.mouseEnter
        });
      };
      this.customAfterMouseUp( event );
    };

    this.bindEvents = function () {
      var self = this;

      this.$wrapper.bind( 'mousedown', function (event) {
        self.mouseDown( event );
      });

      this.$wrapper.bind( 'mouseup', function (event) {
        self.mouseUp( event );
      });

      this.$wrapper.bind( 'mouseenter', function (event) {
        self.mouseEnter( event );
      });

      this.$wrapper.bind( 'mouseleave', function (event) {
        self.mouseLeave( event );
      });

    };

    this.build = function () {
      this.hideElement();
      this.computeSprite();
      this.buildWrapper();
      this.buildAnchor();
      this.buildSpans();
      this.buildOptions();
      this.buildLabel();
      this.bindEvents();
    };

    this.build();

  };

  /*
   * Plugin wrapper
   */

  $.fn[pluginName] = function (options) {

    // For every matched selector found...
    return this.each( function () {

      // Set some jQuery data if it doesn't already exist
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' + pluginName, new LazyForms( this, options ) );
      };

    });

  };

})($, window, document);