import { v4 as uuidv4 } from 'uuid';

class Listener {
    constructor(props={}) {
        if (props.event) {
            throw new Error('eventador: a valid js event must be included as a property');
        }

        if (props.dispatch) {
            throw new Error('eventador: a dispatch must be included as a property');
        }

        if (props.target) {
            console.log('eventador: target was not provided. This could cause issuses in removing/adding listeners');
        }

        if (props.options) {
            console.log('eventador: options should be passed in. May cause removal issues if they aren \'t');
        }

        this.id = props.id               || uuidv4();
        this.target = props.target       || window;
        this.event = props.event         || undefined;
        this.dispatch = props.dispatch   || undefined;
        this.options = props.options     || undefined;
        this.calls = props.calls         || 0;
        this.callTimes = props.callTimes || [];
    }

    remove() {
        this.target.removeEventListener(this.event, this.dispatch, this.options);
    }

    update(e) {

    }
}

export default Listener;