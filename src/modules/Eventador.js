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
        max:false,
    }))
}

const KEYLOGGER = new Keylogger();

class Eventador{
    static _listeners = {};

    static _makeListener(event, dispatch, options, target=window) {
        options = formatOptions(options);
            
        const listener = new Listener({
            target,
            event,
            dispatch,
            options,
        });

        let eventadorDispatch = (e) => {
            if (arePressed(listener.options)) {
                dispatch(e);
                listener.update(e);
            }
        }

        //must chain dispatch;
        listener.dispatch = eventadorDispatch;
        
        //log that
        this._listeners[listener.id] = listener;
        return listener;
    }

    static addListener(event, dispatch, options, target=window) {
        let listener = this._makeListener(event, dispatch, options, target);

        listener.target.eventadorAddEventListener(listener.event, listener.dispatch, listener.options);
        
        return listener.id;
    }

    static removeListener(id) {
        let listener = this._listeners[id];
    
        if (listener) {
            listener.target.eventadorRemoveEventListener(listener.event, listener.dispatch, listener.options);
            return true;
        }

        return false;
    }

    static makeDispatch(dispatch, options) {
        options = formatOptions(options);
        const listener = this._makeListener('dummy', dispatch, options, 'dummy');

        return (e)=>{
            let l = this._listeners[listener.id];
            l.event = e.type;
            l.target = e.target;

            if (arePressed(listener.options) && !listener.isTerminated) {
                listener.sendIt(e);
            }
        }
    }
}

function arePressed(options) {
    let keysPressed;
    if (options.max) {
        keysPressed = 0;
        options.keys.forEach((k)=>{if (KEYLOGGER.pressed[k]) keysPressed++});

        if (keysPressed === options.max) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
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