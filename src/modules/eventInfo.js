import { v4 as uuidv4 } from 'uuid';

//probably could have done this using a class instead of the old style but hey why not go
//retro when it makes life easy
function eventInfo(props={}) {

    let obj = {};
    
    obj.id = props.id               || uuidv4();
    obj.trigger = props.trigger     || undefined;
    obj.event = props.event         || undefined;
    obj.calls = props.calls         || 0;
    obj.success = props.success     || false;
    obj.removed = props.removed     || false;
    obj.callTime = props.callTime   || 0;
    
    return obj;
}

export default eventInfo;