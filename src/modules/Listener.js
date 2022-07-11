import { v4 as uuidv4 } from 'uuid';
import {getDefaultOptions} from './Eventador.js';

//export const EVENTADORSTRING = 'eventador-';
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
        this.event = props.event                    || undefined;
        this.callback = props.callback              || undefined;
        this.options = props.options                || getDefaultOptions();
        this.id = props.id                          || uuidv4();
        this.calls = props.calls                    || 0;
        this.callLog = props.callLog                || [];
        this.toTerminate = props.toTerminate        || false;
    }

    sendIt(e) {
        if (this.toTerminate) {
            return true;
        }

        if (arePressed(this.options)) {
            this.callback(e);
            this.update(e);
        }

        return this.toTerminate;
    }

    update(e) {
        this.event = e.type;
        this.target = e.target;

        this.calls++;
        this.callLog.push(new CallInfo(e, this.calls));

        //helps prevent slugishness
        if (this.callLog.length >= MAXLOGSIZE) this.callLog.unshift();

        if (this.calls === this.options.max) {
            this.toTerminate = true;
        }
    }
}

class CallInfo {
    constructor(e, callNo) {
        this.isCallInfo = true;
        this.time = new Date().getTime();
        this.event = e;
        this.callNo = callNo;
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

export default Listener;