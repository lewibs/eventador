import { v4 as uuidv4 } from 'uuid';
import Eventador, {getDefaultOptions} from './Eventador.js';

export const EVENTADORSTRING = 'eventador-';
export const MAXLOGSIZE = 5;

class Listener {
    constructor(props={}) {
        if (!props.event) {
            throw new Error('eventador: a valid js event must be included as a property');
        }

        if (!props.callback) {
            throw new Error('eventador: a callback must be included as a property');
        }
        
        this.isListener = true; 
        this.target = props.target                  || window;
        this.event = stringToEventador(props.event) || undefined;
        this.callback = props.callback              || undefined;
        this.options = props.options                || getDefaultOptions();
        this.id = props.id                          || uuidv4();
        this.calls = props.calls                    || 0;
        this.callLog = props.callLog                || [];
        this.isTerminated = props.isTerminated      || false;
    }

    sendIt(e) {
        this.isTerminated = this.callback(e);
        this.update(e);

        return this.isTerminated;
    }

    update(e) {
        this.event = stringToEventador(e.type);
        this.target = e.target;

        this.callLog.push(new CallInfo(e, this.calls++));

        //helps prevent slugishness
        if (this.callLog.length >= MAXLOGSIZE) this.callLog.unshift();

        if (this.calls === this.options.max) {
            return Eventador.removeListener(this.id);
        } else {
            return false;
        }
    }
}

function stringToEventador(s){
    if (!/eventador/.test(s)) {
        s = EVENTADORSTRING + s;
    }

    return s;
}

class CallInfo {
    constructor(e, callNo) {
        this.isCallInfo = true;
        this.time = new Date().getTime();
        this.event = e;
        this.callNo = callNo;
    }
}

export default Listener;