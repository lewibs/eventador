import root from 'window-or-global';

function historyInfo(eventInfo = {}) {
    let obj = {};

    obj.eventInfo = Object.assign({}, eventInfo);
    obj.keysPressed = Object.assign({}, root.eventador.keylogger.pressedKeys);

    return obj;
}

export default historyInfo;