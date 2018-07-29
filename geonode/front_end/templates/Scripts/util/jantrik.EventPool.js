var jantrik = jantrik || { };
jantrik.EventPool = (function () {
    var events = {};

    function getHandlerList(eventName) {
        eventName = (eventName || "").toLowerCase();
        if (!events[eventName]) {
            events[eventName] = [];
        }

        return events[eventName];
    }

    function register(eventName, handler) {
        var handlerList = getHandlerList(eventName);
        handlerList.push(handler);

        return window;
    }

    function registerAll(eventNames, handler) {
        for (var i in eventNames) {
            register(eventNames[i], handler);
        }

        return window;
    }

    function broadcast(eventName) {
        var handlerList = getHandlerList(eventName);
        var eventData = Array.prototype.slice.call(arguments, 1);

        for (var i in handlerList) {
            handlerList[i].apply(window, eventData);
        }

        return window;
    }

    window.register = register;
    window.registerAll = registerAll;
    window.broadcast = broadcast;

    return window;
})();

export default jantrik;
