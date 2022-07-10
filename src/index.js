import './prototypes/EventTarget.js';
import Eventador from "./modules/Eventador.js";

const addListener = (event, dispach, options, target)=>{return Eventador.addListener(event, dispach, options, target)};

const removeListener = (id)=>{return Eventador.removeListener(id)};

const makeDispatch = (dispach, options)=>{return Eventador.makeDispach(dispach, options)};

export {
    Eventador,
    addListener,
    removeListener,
    makeDispatch,
};

export default Eventador;