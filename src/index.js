import './prototypes/EventTarget.js';
import Eventador from "./modules/Eventador.js";

const addListener = (event, callback, options, target)=>{return Eventador.addListener(event, callback, options, target)};

const removeListener = (id)=>{return Eventador.removeListener(id)};

const makeCallback = (callback, options)=>{return Eventador.makeDispach(callback, options)};

export {
    Eventador,
    addListener,
    removeListener,
    makeCallback,
};

export default Eventador;