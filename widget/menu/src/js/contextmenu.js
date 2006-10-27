


/**
* Creates a list of options or commands which are made visible in response to 
* an element's "contextmenu" event ("mousedown" for Opera).
*
* @param {String} p_oElement The HTMLElement ID representing the source node 
* (either HTMLSelectElement or HTMLDivElement) of the ContextMenu.
* @param {Element} p_oElement The HTMLElement representing the ContextMenu to 
* be created.
* @param {Object} p_oConfig Optional. The configuration object literal 
* containing the configuration for a ContextMenu instance. See 
* configuration class documentation for more details.
* @class ContextMenu
* @constructor
* @extends YAHOO.widget.Menu
* @namespace YAHOO.widget
*/
YAHOO.widget.ContextMenu = function(p_oElement, p_oConfig) {

    YAHOO.widget.ContextMenu.superclass.constructor.call(
            this, 
            p_oElement,
            p_oConfig
        );

};


YAHOO.extend(YAHOO.widget.ContextMenu, YAHOO.widget.Menu, {



// Private properties


/**
* @property _oTrigger
* @description The id(s) or node reference(s) for the element whose  
* "contextmenu" event ("mousedown" for Opera) triggers the display of the menu.
* @private
* @type String|Array|HTMLElement
*/
_oTrigger: null,



// Public properties


/**
* @property contextEventTarget
* @description The HTMLElement node that was the target of the 
* "contextmenu" DOM event ("mousedown" for Opera) that triggered the display 
* of the menu.
* @type HTMLElement
*/
contextEventTarget: null,


/**
* @method init
* @description The ContextMenu class's initialization method. This method is   
* automatically called by the constructor, and sets up all DOM references for  
* pre-existing markup, and creates required markup if it is not already present.
* @param {String} p_oElement The HTMLElement ID representing the source node 
* (either HTMLSelectElement or HTMLDivElement) of the ContextMenu.
* @param {Element} p_oElement The HTMLElement representing the ContextMenu to 
* be created.
* @param {Object} p_oConfig Optional. The configuration object literal 
* containing the configuration for a ContextMenu instance. See 
* configuration class documentation for more details.
*/
init: function(p_oElement, p_oConfig) {

    if(!this.ITEM_TYPE) {

        this.ITEM_TYPE = YAHOO.widget.ContextMenuItem;

    }


    // Call the init of the superclass (YAHOO.widget.Menu)

    YAHOO.widget.ContextMenu.superclass.init.call(this, p_oElement);


    this.beforeInitEvent.fire(YAHOO.widget.ContextMenu);


    if(p_oConfig) {

        this.cfg.applyConfig(p_oConfig, true);

    }
    
    
    this.initEvent.fire(YAHOO.widget.ContextMenu);
    
},



// Private methods


/**
* @method _removeEventHandlers
* @description Removes all of the DOM event handlers from the menu's  
* trigger element(s).
* @private
*/
_removeEventHandlers: function() {

    var Event = YAHOO.util.Event;
    var oTrigger = this._oTrigger;
    var bOpera = (this.browser == "opera");


    // Remove the event handlers from the trigger(s)

    Event.removeListener(
        oTrigger, 
        (bOpera ? "mousedown" : "contextmenu"), 
        this._onTriggerContextMenu
    );    
    
    if(bOpera) {
    
        Event.removeListener(oTrigger, "click", this._onTriggerClick);

    }

},



// Private event handlers


/**
* @method _onTriggerClick
* @description "click" event handler for the HTMLElement node that triggered  
* the event.  Used to cancel default behaviors in Opera.
* @private
* @param {Event} p_oEvent Event object passed back by the 
* event utility (YAHOO.util.Event).
* @param {YAHOO.widget.ContextMenu} p_oMenu The ContextMenu instance 
* handling the event.
*/
_onTriggerClick: function(p_oEvent, p_oMenu) {

    if(p_oEvent.ctrlKey) {
    
        YAHOO.util.Event.stopEvent(p_oEvent);

    }
    
},


/**
* @method _onTriggerContextMenu
* @description "contextmenu" event handler ("mousedown" for Opera) for the  
* HTMLElement node(s) that trigger the display of the menu.
* @private
* @param {Event} p_oEvent Event object passed back by the 
* event utility (YAHOO.util.Event).
* @param {YAHOO.widget.ContextMenu} p_oMenu The ContextMenu instance 
* handling the event.
*/
_onTriggerContextMenu: function(p_oEvent, p_oMenu) {

    var Event = YAHOO.util.Event;
    var oConfig = this.cfg;

    if(p_oEvent.type == "mousedown" && !p_oEvent.ctrlKey) {

        return;

    }

    this.contextEventTarget = Event.getTarget(p_oEvent);


    // Position and display the context menu

    var nX = Event.getPageX(p_oEvent);
    var nY = Event.getPageY(p_oEvent);


    oConfig.applyConfig( { xy:[nX, nY], visible:true } );
    oConfig.fireQueue();


    /*
        Prevent the browser's default context menu from appearing and 
        stop the propagation of the "contextmenu" event so that 
        other ContextMenu instances are no displayed.
    */

    Event.stopEvent(p_oEvent);
    
},



// Public methods


/**
* @method toString
* @description Returns a string representing the specified object.
*/
toString: function() {

    return ("ContextMenu " + this.id);

},


/**
* @method initDefaultConfig
* @description Initializes the class's configurable properties which can be 
* changed using a ContextMenu instance's Config object (cfg).
*/
initDefaultConfig: function() {

    YAHOO.widget.ContextMenu.superclass.initDefaultConfig.call(this);


	// Add a configuration property

    this.cfg.addProperty("trigger", { handler: this.configTrigger });

},


/**
* @method destroy
* @description Removes a ContextMenu instance's from the DOM and removes the
* element's event handlers.
*/
destroy: function() {

    // Remove the DOM event handlers from the current trigger(s)

    this._removeEventHandlers();
    

    // Continue with the superclass implementation of this method

    YAHOO.widget.ContextMenu.superclass.destroy.call(this);

},



// Event handlers for configuration properties


/**
* @method configTrigger
* @description Event handler for when the value of the "trigger" configuration 
* property changes. 
* @param {String} p_sType The name of the event that was fired.
* @param {Array} p_aArgs Collection of arguments sent when the 
* event was fired.
* @param {YAHOO.widget.ContextMenu} p_oMenu The ContextMenu that instance fired
* the event.
*/
configTrigger: function(p_sType, p_aArgs, p_oMenu) {
    
    var Event = YAHOO.util.Event;
    var oTrigger = p_aArgs[0];

    if(oTrigger) {

        /*
            If there is a current "trigger" - remove the event handlers 
            from that element(s) before assigning new ones
        */

        if(this._oTrigger) {
        
            this._removeEventHandlers();

        }

        this._oTrigger = oTrigger;


        /*
            Listen for the "mousedown" event in Opera b/c it does not 
            support the "contextmenu" event
        */ 
  
        var bOpera = (this.browser == "opera");

        Event.addListener(
            oTrigger, 
            (bOpera ? "mousedown" : "contextmenu"), 
            this._onTriggerContextMenu,
            this,
            true
        );


        /*
            Assign a "click" event handler to the trigger element(s) for
            Opera to prevent default browser behaviors.
        */

        if(bOpera) {
        
            Event.addListener(
                oTrigger, 
                "click", 
                this._onTriggerClick,
                this,
                true
            );

        }

    }
    else {
    
        this._removeEventHandlers();
    
    }
    
}

}); // END YAHOO.extend