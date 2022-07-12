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

class Eventador{
    static _listeners = {};

    static #makeListener(event, callback, options, target=window) {
        options = formatOptions(options);
        
        const listener = new Listener({
            target,
            event,
            callback,
            options,
        });
        
        //log that
        this._listeners[listener.id] = listener;
        return listener;
    }

    static addListener(target=window, event, callback, options) {

        let listener = this.#makeListener(event, callback, options, target);
        
        let eventadorCallback = function(e) {

            if (listener.isSendable()) {
                callback(e);
                listener.update(e);
            }

            if (listener.toTerminate) {
                return Eventador.removeListener(listener.id);
            }
        }

        listener.callback = eventadorCallback;

        listener.target.addEventListener(listener.event, listener.callback, listener.options);
        
        return listener.id;
    }

    static removeListener(id) {
        let listener = this._listeners[id];
    
        if (listener) {
            listener.target.removeEventListener(listener.event, listener.callback, listener.options);
            return true;
        }

        return false;
    }

    static makeCallback(callback, options) {
        options = formatOptions(options);
        const listener = this.#makeListener('dummy', callback, options, 'dummy');


        function eventadorCallback(e) {
            if (e===undefined){
                throw new Error('Eventador: makeCallBack must be called within a event trigger on an HTMLElement');
            }

            if (listener.isSendable()) {
                callback(e);
                listener.update(e);
            }

            if (listener.toTerminate) {
                return Eventador.removeListener(listener.id);
            }
        }

        return eventadorCallback;
    }
}

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