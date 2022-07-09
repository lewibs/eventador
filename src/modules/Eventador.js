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

const keylogger = new Keylogger();

class Eventador{
    static _listeners = {};

    static addListener(event, dispatch, options, target=window) {

        //in the case that we need to be backwards compatable
        options = (typeof options === 'boolean')
        ? Object.assign(getDefaultOptions(), {useCapture:options})
        : Object.assign(getDefaultOptions(), options);
        
        const listener = new Listener({
            target,
            event,
            dispatch,
            options,
        });

        let eventadorDispatch = (e) => {
            //action prep
            let keysPressed;
            if (listener.options.max) {
                keysPressed = 0;
                listener.options.keys.forEach((k)=>{if (keylogger.pressed[k]) keysPressed++});
            } else {
                keysPressed = false;
            }

            //do action
            if (keysPressed === listener.options.max) {
                dispatch(e);
                listener.update(e);
            }
        }

        //must chain dispatch;
        listener.dispatch = eventadorDispatch;

        this._listeners[listener.id] = listener.id;
        
        listener.target.eventadorAddEventListener(event, dispatch, options);
        
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
}

export {
    getDefaultOptions,
    Eventador,
}

export default Eventador;