/**
 * Add message broker and messaging for all widgets in a page
 * This is done by providing a hidden div that is used to bind events to
 *
 * General stuff about plugins:
 *   - use the module pattern, function returns a module object
 *   - calls Swidget.plugin with a module constructor function and a version
 *   - provides the sqwidget and jQuery globals as a part of the constructor
 *
 * NOTE: This is not yet known to work, or even have correct syntax: think of it as a sample
 * plugin.
 */
/*jsLint */
/*global Sqwidget */    
 
Sqwidget.plugin('messaging', function (sqwidget, widget, jQuery, newConfig) {
    var self = {},
        _ = sqwidget._,
        brokerName = "sqwidget-message-broker",
        brokerHtml = '<div id="' + brokerName + '" style="display: none;"></div>',
        config = {};

        jQuery.extend(true,config,newConfig);
        
        // create element to hang messaging events onto, the 
        // so-called broker element
        // TODO body here to be abstracted by UI plugins? does it matter here?
    var broker = jQuery('#'+brokerName);
    if (broker.length==0) { 
        jQuery('body').append(brokerHtml);
        broker = jQuery('#'+brokerName);
    }

    /**
    * Listen for a message
    * @param {String} topic. The topic name for this message
    */

    /**
     * start listening to a specific topic
     */
    self.listen = function (topic, callback) {
        broker.bind('messaging-' + topic, callback);
    };

    /**
    * Send a message to a given topic
    * @param {String} topic The topic name to send to
    * @param {Object} content The message content (can we whatever is agreed for this topic)
    */
    self.send = function (topic, content) {
        broker.triggerHandler('messaging-' + topic, content);
    };



    return self;
}, '0.1.0',['jquery']);
