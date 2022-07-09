/*
Event.eventador = Event.eventador || {};

Event.eventador.format = function(event = {}) {

    if (event instanceof CustomEvent) {
        let key = event.detail.type;
        event = event.detail;
        event.key = key;
    } else {
        switch (event.which) {
            case 0:
                event.key = 'wheel';   
                break;
            case 1:
                event.key = 'leftmouse';
                break;
            case 2:
                event.key = 'middlemouse';
                break;
            case 3:
                event.key = 'rightmouse';
                break;
        }   
    }
    
    return event;
}
*/