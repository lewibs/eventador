import Keylogger from "lewibs-keylogger";

const DEFAULTOPTONS = ()=>{
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
};

const keylogger = new Keylogger();

class Eventador{
    static _listeners = {};

    static addListener(event, dispatch, options, target=window) {

        //in the case that we need to be backwards compatable
        options = (typeof options === 'boolean')
        ? Object.assign(DEFAULTOPTONS, {useCapture:options})
        : Object.assign(DEFAULTOPTONS, options);

        //allows dispatch to reference the listener that is made after it
        const listenerRef = {current:undefined};

        let eventadorDispatch = (e) => {
            //action prep
            let keysPressed;
            if (listenerRef.current.options.max) {
                keysPressed = 0;
                listenerRef.current.options.keys.forEach((k)=>{if (keylogger.pressed[k]) keysPressed++});
            } else {
                keysPressed = false;
            }

            //do action
            if (keysPressed === listenerRef.current.options.max) {
                dispatch(e);
                listenerRef.current.update(e);
            }
        }

        listenerRef.current = new listener({
            target,
            event,
            dispatch: eventadorDispatch,
            options,
        });

        this._listeners[listenerRef.current.id] = listenerRef.current.id;
        
        listener.target.eventador.clasicAddEventListener(event, dispatch, options);
        
        return listener.id;
    }

    static removeListener(id) {
        let listener = this._listeners[id];
    
        if (listener) {
            listener.target.eventador.classicRemoveEventListener(listener.event, listener.dispatch, listener.options);
            return true;
        }

        return false;
    }
};

export {
    DEFAULTOPTONS,
    Eventador,
}

export default Eventador;