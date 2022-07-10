import Keylogger from "lewibs-keylogger";
import Listener from "./Listener.js";

const getDefaultOptions = ()=>{
    return JSON.parse(JSON.stringify({ 
        //default options for backwards compatibility
        capture:false,
        once: false,
        passive:false,
        signal: undefined,

        //custom options
        keys:[],
        pressAll: false,
        max:false,
    }))
}

const KEYLOGGER = new Keylogger();

class Eventador{
    static _listeners = {};

    static _makeListener(event, callback, options, target=window) {
        options = formatOptions(options);
            
        const listener = new Listener({
            target,
            event,
            callback,
            options,
        });

        let eventadorCallback = (e) => {
            if (arePressed(listener.options)) {
                callback(e);
            }
        }

        //must chain callback;
        listener.callback = eventadorCallback;
        
        //log that
        this._listeners[listener.id] = listener;
        return listener;
    }

    static addListener(event, callback, options, target=window) {
        let listener = this._makeListener(event, callback, options, target);

        listener.target.eventadorClasicAddEventListener(listener.event, listener.callback, listener.options);
        
        return listener.id;
    }

    static removeListener(id) {
        let listener = this._listeners[id];
    
        if (listener) {
            listener.target.eventadorClasicRemoveEventListener(listener.event, listener.callback, listener.options);
            return true;
        }

        return false;
    }

    static makeCallback(callback, options) {
        options = formatOptions(options);
        const listener = this._makeListener('dummy', callback, options, 'dummy');

        function eventadorCallback(e) {
            if (e===undefined){
                throw new Error('Eventador: makeCallBack must be called within a event trigger on an HTMLElement');
            }

            if (arePressed(listener.options) && listener.isTerminated === false) {
                listener.sendIt(e);
            }
        }

        return eventadorCallback;
    }
}

function arePressed(options) {
    let keysPressed = 0;
    options.keys.forEach((k)=>{
        if (KEYLOGGER.pressed[k]) {
            keysPressed++
        }
    });

    let success = false;
    if (options.pressAll) {
        success = keysPressed === options.keys.length;
    } else if (options.keys.length === 0) {
        success = true;
    } else if (!options.pressAll) {
        success = keysPressed > 0;
    }

    if (success) {
        return true;
    } else {
        return false;
    }
};

//allows for backward compatability
function formatOptions(options) {
    return (typeof options === 'boolean')
    ? Object.assign(getDefaultOptions(), {useCapture:options})
    : Object.assign(getDefaultOptions(), options);
};

export {
    getDefaultOptions,
    Eventador,
}

export default Eventador;