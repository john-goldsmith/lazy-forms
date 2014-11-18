###*
Lazy Forms

Highly customizable HTML checkboxes, radios, dropdowns,
and buttons.

https://github.com/marlorn/lazy-forms

Copyright 2012 John Goldsmith <http://github.com/marlorn>
###
(($, window, document) ->
  
  # Set some defaults
  
  # Checkboxes <input type="checkbox" />
  
  # Radios <input type="radio" />
  
  # Buttons <input type="submit" />, <input type="button" />, and <button>
  
  # Dropdowns <select> parent and <option> children
  
  # Set the name of the plugin
  
  # Set a container for publicly exposed methods
  
  ###*
  Constructor
  ###
  LazyForms = (element, options) ->
    
    # Set the current DOM node being acted upon
    @element = element
    
    # Set the current jQuery object being acted upon
    @$element = $(element)
    
    # Set the current DOM node tag name being acted upon (e.g. "select" or "input")
    @tag = @$element.prop("tagName").toLowerCase()
    
    # Merge the options into the defaults
    @options = $.extend({}, defaults, options)
    
    # Set a reference to the original, un-merged defaults
    @_defaults = defaults
    
    # Set a reference to the name of the plugin
    @_name = pluginName
    
    # To find if we're currently acting upon a "submit", "checkbox" or "radio" element,
    # set references to the <input> "type" and "name" attributes
    if @tag is "input"
      @attrType = @$element.attr("type")
      @attrName = @$element.attr("name")
    
    # Based on what type of form element it is, figure out which subset of options to use
    if @tag is "input"
      @isInput = true
      if @attrType is "checkbox"
        @isCheckbox = true
        @options = @options.checkbox
      else if @attrType is "radio"
        @isRadio = true
        @options = @options.radio
      else if @attrType is "button"
        @isInputButton = true
        @options = @options.button
      else if @attrType is "submit"
        @isSubmit = true
        @options = @options.button
    
    #this.options = this.options[ this.attrType ];
    else if @tag is "select"
      @isSelect = true
      @options = @options.select
    else if @tag is "button"
      @isButton = true
      @options = @options.button
    else
      @notSupported = true
    
    # TODO: Handle an unsupported tag
    
    # Away we go!
    @init()
    return
  defaults =
    checkbox:
      spriteWidth: 20
      spriteHeight: 20
      spriteUnits: "px"
      spriteOrder: [
        "uncheckedMouseLeave"
        "uncheckedMouseEnter"
        "uncheckedMouseDown"
        "checkedMouseLeave"
        "checkedMouseEnter"
        "checkedMouseDown"
      ]
      spriteDirection: "vertical"
      pathToSprite: "images/checkbox_vertical.png"
      labelToThe: "right"
      wrapperTag: "div"
      wrapperClass: "lazy-checkbox-wrapper"
      anchorClass: "lazy-checkbox-anchor"
      labelClass: "lazy-checkbox-label"
      onBeforeClick: false
      onAfterClick: false
      onBeforeMouseOver: false
      onAfterMouseOver: false
      onBeforeMouseOut: false
      onAfterMouseOut: false

    radio:
      spriteWidth: 20
      spriteHeight: 20
      spriteUnits: "px"
      spriteOrder: [
        "uncheckedMouseLeave"
        "uncheckedMouseEnter"
        "uncheckedMouseDown"
        "checkedMouseLeave"
        "checkedMouseEnter"
        "checkedMouseDown"
      ]
      spriteDirection: "vertical"
      pathToSprite: "images/radio_vertical.png"
      labelToThe: "right"
      wrapperTag: "div"
      wrapperClass: "lazy-radio-wrapper"
      anchorClass: "lazy-radio-anchor"
      labelClass: "lazy-radio-label"
      onBeforeClick: false
      onAfterClick: false
      onBeforeMouseOver: false
      onAfterMouseOver: false
      onBeforeMouseOut: false
      onAfterMouseOut: false

    button:
      spriteWidth:
        left: 5
        middle: 1
        right: 5

      spriteHeight:
        left: 30
        middle: 30
        right: 30

      spriteUnits: "px"
      spriteDirection: "vertical"
      pathToSprite:
        left: "images/button_left_vertical.png"
        middle: "images/button_mid_vertical.png"
        right: "images/button_right_vertical.png"

      spriteOrder:
        left: [
          "mouseLeave"
          "mouseEnter"
          "mouseDown"
        ]
        middle: [
          "mouseLeave"
          "mouseEnter"
          "mouseDown"
        ]
        right: [
          "mouseLeave"
          "mouseEnter"
          "mouseDown"
        ]

      wrapperTag: "div"
      wrapperClass: "lazy-button-wrapper"
      anchorClass: "lazy-button-anchor"
      spanClass: "lazy-button-span"
      onBeforeClick: false
      onAfterClick: false
      onBeforeMouseOver: false
      onAfterMouseOver: false
      onBeforeMouseOut: false
      onAfterMouseOut: false

    select:
      spriteWidth:
        left: 5
        middle: 1
        right: 29

      spriteHeight:
        left: 30
        middle: 30
        right: 30

      spriteUnits: "px"
      spriteDirection: "vertical"
      pathToSprite:
        left: "images/select_left_vertical.png"
        middle: "images/select_mid_vertical.png"
        right: "images/select_right_vertical.png"

      spriteOrder:
        left: [
          "mouseLeave"
          "mouseEnter"
          "mouseDown"
        ]
        middle: [
          "mouseLeave"
          "mouseEnter"
          "mouseDown"
        ]
        right: [
          "mouseLeave"
          "mouseEnter"
          "mouseDown"
        ]

      wrapperTag: "div"
      wrapperClass: "lazy-select-wrapper"
      anchorClass: "lazy-select-anchor"
      spanClass: "lazy-select-span"
      optionsWrapperClass: "lazy-select-options-wrapper"
      onBeforeClick: false
      onAfterClick: false
      onBeforeMouseOver: false
      onAfterMouseOver: false
      onBeforeMouseOut: false
      onAfterMouseOut: false

  pluginName = "lazyForms"
  methods = {}
  
  ###*
  Public methods
  ###
  LazyForms::init = ->
    
    # TODO: Upon initialization, checked for pre-selected checkboxes, radios, selects, etc.
    
    ###*
    Wrapper method to build the wrapper
    ###
    @buildWrapper = ->
      @injectWrapper()
      @setWrapper()
      @setWrapperClass()
      @setWrapperStyle()
      return

    
    ###*
    Inject a wrapper around the element
    ###
    @injectWrapper = ->
      if @options.wrapperTag and typeof (@options.wrapperTag) is "string"
        @rawHtmlWrapperTag = @options.wrapperTag.replace(/[^a-zA-Z]/g, "").toLowerCase()
        @$element.wrap "<" + @rawHtmlWrapperTag + "/>"
      return

    
    ###*
    Set a reference to the newly created wrapper
    ###
    @setWrapper = ->
      @$wrapper = @$element.parent(@rawHtmlWrapperTag)
      @wrapper = @$wrapper.get()
      return

    
    ###*
    Add a class to the wrapper, if defined
    ###
    @setWrapperClass = ->
      @$wrapper.addClass @options.wrapperClass  if @options.wrapperClass and typeof (@options.wrapperClass) is "string"
      return

    
    ###*
    Apply some styles to the wrapper
    ###
    @setWrapperStyle = ->
      @$wrapper.css {}
      return

    
    #'height' : this.$wrapper.height(),
    #'width' : this.$wrapper.width()
    
    ###*
    Wrapper method to build the label
    ###
    @buildLabel = ->
      @injectLabel()
      @setLabel()
      @injectLabelText()
      @setLabelClass()
      return

    @injectLabel = ->
      if @isCheckbox or @isRadio
        @$wrapper.append "<label/>"  if @$element.attr("data-label")
      else if @isSubmit or @isInputButton
        @setLabel()
      else @setLabel()  if @isSelect or @isButton
      return

    @setLabel = ->
      
      # TODO: Note that for checkboxes and radios, this.$label is an actual object, whereas for submits, buttons, and selects it's just text
      if @isCheckbox or @isRadio
        @$label = @$element.siblings("label")
      else if @isSubmit or @isInputButton
        @$label = @$element.attr("value")
      else if @isSelect
        @$label = @$element.children("option").first().html()
      else @$label = @$element.html()  if @isButton
      return

    @injectLabelText = ->
      if @isCheckbox or @isRadio
        @$label.html @$element.attr("data-label")  if @$element.attr("data-label")
      else @$midSpan.html @$label  if @isSubmit or @isInputButton or @isSelect or @isButton
      return

    @setLabelClass = ->
      @$label.addClass @options.labelClass  if @options.labelClass and typeof (@options.labelClass) is "string"  if @isCheckbox or @isRadio
      return

    
    ###*
    Wrapper method to build the anchor
    ###
    @buildAnchor = ->
      @injectAnchor()
      @setAnchor()
      @setAnchorClass()
      @setAnchorStyle()
      return

    @injectAnchor = ->
      @$wrapper.append "<a href=\"#\"/>"
      return

    @setAnchor = ->
      @$anchor = @$element.siblings("a")
      return

    @setAnchorClass = ->
      @$anchor.addClass @options.anchorClass  if @options.anchorClass and typeof (@options.anchorClass) is "string"
      return

    @setAnchorStyle = ->
      if @isCheckbox or @isRadio
        if @options.pathToSprite and typeof (@options.pathToSprite) is "string"
          @$anchor.css
            "background-image": "url(" + @options.pathToSprite + ")"
            "background-repeat": "no-repeat no-repeat"
            height: @rawSpriteHeight + @options.spriteUnits
            width: @rawSpriteWidth + @options.spriteUnits
            display: "block"

      else @$anchor.css display: "block"  if @isSubmit or @isInputButton or @isSelect or @isButton
      if @options.labelToThe and typeof (@options.labelToThe) is "string"
        if @options.labelToThe is "right"
          @$anchor.css float: "left"
        else @$anchor.css float: "right"  if @options.labelToThe is "left"
      return

    
    ###*
    Wrapper method to build the spans inside the anchor
    ###
    @buildSpans = ->
      @injectSpans()
      @setSpans()
      @setSpanClass()
      @setSpanStyle()
      return

    @injectSpans = ->
      if @isSubmit or @isInputButton
        @$anchor.append "<span/><span/><span/>"
      else @$anchor.append "<span/><span/><span/>"  if @isSelect or @isButton
      return

    @setSpans = ->
      @$spans = @$anchor.children("span")
      @$leftSpan = @$anchor.children("span").first()
      @$midSpan = @$anchor.children("span:not(:first, :last)")
      @$rightSpan = @$anchor.children("span").last()
      return

    @setSpanClass = ->
      if @options.spanClass and typeof (@options.spanClass) is "string"
        @$spans.addClass @options.spanClass
        @$leftSpan.addClass @options.spanClass + "-left"
        @$midSpan.addClass @options.spanClass + "-mid"
        @$rightSpan.addClass @options.spanClass + "-right"
      return

    @setSpanStyle = ->
      if @isSubmit or @isInputButton or @isSelect or @isButton
        @$leftSpan.css
          "background-image": "url(" + @options.pathToSprite.left + ")"
          "background-repeat": "no-repeat"
          width: @rawSpriteWidth.left
          height: @rawSpriteHeight.left
          display: "block"
          float: "left"

        @$midSpan.css
          "background-image": "url(" + @options.pathToSprite.middle + ")"
          "background-repeat": "repeat-x"
          
          #'width' : this.rawSpriteWidth.middle,
          height: @rawSpriteHeight.middle
          display: "block"
          float: "left"
          "vertical-align": "middle"
          "line-height": @rawSpriteHeight.middle + @options.spriteUnits

        @$rightSpan.css
          "background-image": "url(" + @options.pathToSprite.right + ")"
          "background-repeat": "no-repeat"
          width: @rawSpriteWidth.right
          height: @rawSpriteHeight.right
          display: "block"
          float: "left"

      return

    
    ###*
    Wrapper method to build the options dropdown
    ###
    @buildOptions = ->
      @injectOptionsWrapper()
      @setOptionsWrapper()
      @setOptionsWrapperClass()
      @toggleOptions()
      @injectOptionsList()
      @setOptionsList()
      @injectOptions()
      @setOptions()
      @positionOptions()
      return

    foobar = ->
      console.log "foobar"
      return

    @injectOptionsWrapper = ->
      @$wrapper.append "<div/>"  if @isSelect
      return

    @setOptionsWrapper = ->
      @$optionsWrapper = @$wrapper.children("div")
      return

    @setOptionsWrapperClass = ->
      @$optionsWrapper.addClass @options.optionsWrapperClass  if @options.optionsWrapperClass and typeof (@options.optionsWrapperClass) is "string"
      return

    @injectOptionsList = ->
      @$optionsWrapper.append "<ul/>"
      return

    @setOptionsList = ->
      @$optionsList = @$optionsWrapper.children("ul")
      return

    @injectOptions = ->
      @$realOptions = @$wrapper.children("select").children("option")
      self = this
      @$realOptions.each ->
        self.$optionsList.append "<li>" + $(this).html() + "</li>"
        return

      return

    @setOptions = ->
      @$options = @$optionsList.children("li")
      return

    @positionOptions = ->
      @$optionsWrapper.css
        position: "absolute"
        left: @$wrapper.position().left
        top: @$wrapper.position().top + @$wrapper.get(0).offsetHeight

      return

    
    #'min-width' : 
    @toggleOptions = ->
      @$optionsWrapper.toggle()
      return

    
    ###*
    Utility methods
    ###
    @hideElement = ->
      @$element.hide()
      return

    
    # TODO: Allow the ability to unbind and rebind on the fly
    @rebind = ->
      @unbind()
      @bind()
      return

    @unbind = ->

    
    # TODO: Allow ability to unbind (destroy?) the plugin
    @bind = ->

    
    # TODO: Allow ability to bind the plugin (to another element?)
    @resetGroup = ->
      $(@tag + "[type=\"" + @attrType + "\"][name=\"" + @attrName + "\"]").attr "checked", false
      $(@tag + "[type=\"" + @attrType + "\"][name=\"" + @attrName + "\"]").siblings(@$label).css "background-position": @spriteStates.uncheckedMouseLeave
      return

    @computeSprite = ->
      @spriteStates = {}
      count = 0
      if @options.spriteOrder and typeof (@options.spriteOrder) is "object"
        for key of @options.spriteOrder
          count++  if @options.spriteOrder.hasOwnProperty(key)
        @spriteOrderLength = count
      @spriteStates = {}
      if @isCheckbox or @isRadio
        @rawSpriteWidth = (if (typeof (@options.spriteWidth) is "number") then @options.spriteWidth else parseInt(@options.spriteWidth))  if @options.spriteWidth
        @rawSpriteHeight = (if (typeof (@options.spriteHeight) is "number") then @options.spriteHeight else parseInt(@options.spriteHeight))  if @options.spriteHeight
        i = 0

        while i < @spriteOrderLength
          if @options.spriteDirection is "vertical"
            @spriteStates[@options.spriteOrder[i]] = "0" + @options.spriteUnits + " " + ((@rawSpriteHeight * i) * -1).toString() + @options.spriteUnits
          else @spriteStates[@options.spriteOrder[i]] = ((@rawSpriteWidth * i) * -1).toString() + @options.spriteUnits + " 0" + @options.spriteUnits  if @options.spriteDirection is "horizontal"
          i++
      else if @isSubmit or @isInputButton or @isSelect or @isButton
        @spriteStates =
          left: {}
          middle: {}
          right: {}

        @rawSpriteHeight =
          left: null
          middle: null
          right: null

        @rawSpriteWidth =
          left: null
          middle: null
          right: null

        @spriteOrderKeys = @spriteWidthKeys = @spriteHeightKeys = []
        that = this
        $.each @options.spriteOrder, (key, value) ->
          that.spriteOrderKeys.push key
          return

        $.each @options.spriteWidth, (key, value) ->
          that.spriteWidthKeys.push key
          return

        $.each @options.spriteHeight, (key, value) ->
          that.spriteHeightKeys.push key
          return

        @spriteOrderKeysLength = @spriteOrderKeys.length
        @spriteWidthKeysLength = @spriteWidthKeys.length
        @spriteHeightKeysLength = @spriteHeightKeys.length
        @rawSpriteWidth.left = (if (typeof (@options.spriteWidth.left) is "number") then @options.spriteWidth.left else parseInt(@options.spriteWidth.left))  if @options.spriteWidth.left
        @rawSpriteHeight.left = (if (typeof (@options.spriteHeight.left) is "number") then @options.spriteHeight.left else parseInt(@options.spriteHeight.left))  if @options.spriteHeight.left
        @rawSpriteWidth.middle = (if (typeof (@options.spriteWidth.middle) is "number") then @options.spriteWidth.middle else parseInt(@options.spriteWidth.middle))  if @options.spriteWidth.middle
        @rawSpriteHeight.middle = (if (typeof (@options.spriteHeight.middle) is "number") then @options.spriteHeight.middle else parseInt(@options.spriteHeight.middle))  if @options.spriteHeight.middle
        @rawSpriteWidth.right = (if (typeof (@options.spriteWidth.right) is "number") then @options.spriteWidth.right else parseInt(@options.spriteWidth.right))  if @options.spriteWidth.right
        @rawSpriteHeight.right = (if (typeof (@options.spriteHeight.right) is "number") then @options.spriteHeight.right else parseInt(@options.spriteHeight.right))  if @options.spriteHeight.right
        i = 0

        while i < @spriteOrderLength
          spanOrder = @spriteOrderKeys[i]
          mouseOrder = @options.spriteOrder[@spriteOrderKeys[i]]
          j = 0

          while j < mouseOrder.length
            if @options.spriteDirection is "vertical"
              @spriteStates[spanOrder][mouseOrder[j]] = "0" + @options.spriteUnits + " " + ((@rawSpriteHeight[spanOrder] * j) * -1).toString() + @options.spriteUnits
            else @spriteStates[spanOrder][mouseOrder[j]] = ((@rawSpriteWidth[spanOrder] * j) * -1).toString() + @options.spriteUnits + " 0" + @options.spriteUnits  if @options.spriteDirection is "horizontal"
            j++
          i++
      return

    @customBeforeMouseDown = (event) ->
      @options.onBeforeMouseDown this, event  if @options.onBeforeMouseDown
      return

    @customAfterMouseDown = (event) ->
      @options.onAfterMouseDown this, event  if @options.onAfterMouseDown
      return

    @customBeforeMouseUp = (event) ->
      @options.onBeforeMouseUp this, event  if @options.onBeforeMouseUp
      return

    @customAfterMouseUp = (event) ->
      @options.onAfterMouseUp this, event  if @options.onAfterMouseUp
      return

    @customBeforeMouseEnter = (event) ->
      @options.onBeforeMouseOver this, event  if @options.onBeforeMouseOver
      return

    @customAfterMouseEnter = (event) ->
      @options.onAfterMouseOver this, event  if @options.onAfterMouseOver
      return

    @customBeforeMouseLeave = (event) ->
      @options.onBeforeMouseOut this, event  if @options.onBeforeMouseOut
      return

    @customAfterMouseLeave = (event) ->
      @options.onAfterMouseOut this, event  if @options.onAfterMouseOut
      return

    @mouseLeave = (event) ->
      @customBeforeMouseLeave event
      if @isCheckbox or @isRadio
        if @$element.attr("checked") is "checked" or @$element.attr("checked") is true
          @$anchor.css "background-position": @spriteStates.checkedMouseLeave
        else
          @$anchor.css "background-position": @spriteStates.uncheckedMouseLeave
      else if @isSelect or @isButton or @isInputButton or @isSubmit
        @$leftSpan.css "background-position": @spriteStates.left.mouseLeave
        @$midSpan.css "background-position": @spriteStates.middle.mouseLeave
        @$rightSpan.css "background-position": @spriteStates.right.mouseLeave
      @customAfterMouseLeave event
      return

    @mouseEnter = (event) ->
      @customBeforeMouseEnter event
      if @isCheckbox or @isRadio
        if @$element.attr("checked") is "checked" or @$element.attr("checked") is true
          @$anchor.css "background-position": @spriteStates.checkedMouseEnter
        else
          @$anchor.css "background-position": @spriteStates.uncheckedMouseEnter
      else if @isSelect or @isButton or @isInputButton or @isSubmit
        @$leftSpan.css "background-position": @spriteStates.left.mouseEnter
        @$midSpan.css "background-position": @spriteStates.middle.mouseEnter
        @$rightSpan.css "background-position": @spriteStates.right.mouseEnter
      @customAfterMouseEnter event
      return

    @mouseDown = (event) ->
      event.preventDefault()
      @customBeforeMouseDown event
      if @isCheckbox or @isRadio
        if @$element.attr("checked") is "checked" or @$element.attr("checked") is true
          @$anchor.css "background-position": @spriteStates.checkedMouseDown
        else
          @$anchor.css "background-position": @spriteStates.uncheckedMouseDown
      else if @isSelect or @isButton or @isInputButton or @isSubmit
        @$leftSpan.css "background-position": @spriteStates.left.mouseDown
        @$midSpan.css "background-position": @spriteStates.middle.mouseDown
        @$rightSpan.css "background-position": @spriteStates.right.mouseDown
      @customAfterMouseDown event
      return

    @mouseUp = (event) ->
      event.preventDefault()
      @customBeforeMouseUp event
      if @isCheckbox
        @$element.attr "checked", not @$element.attr("checked")
        if @$element.attr("checked") is "checked"
          @$anchor.css "background-position": @spriteStates.checkedMouseEnter
        else
          @$anchor.css "background-position": @spriteStates.uncheckedMouseEnter
      else if @isRadio
        @resetGroup()
        @$element.attr "checked", true
        if @$element.attr("checked") is "checked" or @$element.attr("checked") is true
          @$anchor.css "background-position": @spriteStates.checkedMouseEnter
        else
          @$anchor.css "background-position": @spriteStates.uncheckedMouseEnter
      else if @isSelect
        @toggleOptions()
        @$leftSpan.css "background-position": @spriteStates.left.mouseEnter
        @$midSpan.css "background-position": @spriteStates.middle.mouseEnter
        @$rightSpan.css "background-position": @spriteStates.right.mouseEnter
      else if @isButton or @isInputButton or @isSubmit
        @$leftSpan.css "background-position": @spriteStates.left.mouseEnter
        @$midSpan.css "background-position": @spriteStates.middle.mouseEnter
        @$rightSpan.css "background-position": @spriteStates.right.mouseEnter
      @customAfterMouseUp event
      return

    @bindEvents = ->
      self = this
      @$wrapper.bind "mousedown", (event) ->
        self.mouseDown event
        return

      @$wrapper.bind "mouseup", (event) ->
        self.mouseUp event
        return

      @$wrapper.bind "mouseenter", (event) ->
        self.mouseEnter event
        return

      @$wrapper.bind "mouseleave", (event) ->
        self.mouseLeave event
        return

      return

    @build = ->
      @hideElement()
      @computeSprite()
      @buildWrapper()
      @buildAnchor()
      @buildSpans()
      @buildOptions()
      @buildLabel()
      @bindEvents()
      return

    @build()
    return

  
  #
  #   * Plugin wrapper
  #   
  $.fn[pluginName] = (options) ->
    
    # For every matched selector found...
    @each ->
      
      # Set some jQuery data if it doesn't already exist
      $.data this, "plugin_" + pluginName, new LazyForms(this, options)  unless $.data(this, "plugin_" + pluginName)
      return


  return
) $, window, document
