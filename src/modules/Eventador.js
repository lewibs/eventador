import Keylogger from "lewibs-keylogger";

const DEFAULTOPTONS = ()=>{
    return JSON.parse(JSON.stringify({ 
        //default options for backwards compatibility
        capture:false,
        once: false,
        passive:false,
        signal: undefined,

        //custom options
        requiredKeys:[],
        maxCalls:false,
    }))
};

class Eventador{};

//decided to show events instead of having it inaccessable
//since it allows you to modify and alter events if you're
//feeling sexy
Eventador._listeners = {};

Eventador._addListener = function(trigger, dispatch, options) {

};

//removes event from target it is attached to
Eventador.removeListener = function(id) {

};

export {
    DEFAULTOPTONS,
    Eventador,
}

export default Eventador;