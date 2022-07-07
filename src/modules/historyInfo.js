import './Keylogger';

function historyInfo(props) {
    let obj = {};

    obj.eventInfo = Object.assign({}, props.eventInfo) || undefined;
    obj.keysPressed = Object.assign({}, root.eventador.keylogger.pressedKeys);

    return obj;
}

export default historyInfo;