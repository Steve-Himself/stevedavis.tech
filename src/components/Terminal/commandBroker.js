import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import EventEmitter from 'events';

var brackets = ['{', '}'];
var separators = [['"'], ["'"], brackets];

function isOpener(c) {
    var suitableOpeners = separators.filter(function (item) { return item[0] === c; });
    if (suitableOpeners.length > 1)
        throw new Error("Opening tag in multiple pairs: " + c);
    else if (suitableOpeners.length === 0)
        return null;
    else {
        return suitableOpeners[0];
    }
};

function split(input) {
    var parts = [];
    var part = '';
    var currentOc = null;
    for (var i = 0; i < input.length; i++) {
        var c = input[i];

        if (c === ' ' && !currentOc) {
            if (part)
                parts.push(part);
            part = '';
            continue;
        }

        if (currentOc && currentOc[currentOc.length - 1] === c) {
            if (i !== input.length - 1 && input[i + 1] !== ' ')
                throw new Error("An closing tag can only appear at the end of a sentence or before a space.");

            if (currentOc.keep)
                part += c;

            parts.push(part);
            part = '';
            currentOc = null;
            continue;
        }

        var oc = currentOc ? null : isOpener(c);

        if (oc) {
            if (i !== 0 && input[i - 1] !== ' ')
                throw new Error("An opening tag can only appear at the beggining of a sentence or after a space.");

            currentOc = oc;
            if (currentOc.keep)
                part += c;
            continue;
        }

        part += c;

    }
    if (part)
        parts.push(part);
    return parts;
}

var _handlers = [];
var _redirectors = [];

class CommandBroker extends EventEmitter {
    constructor() {
        super();
        this._dispatchToken = AppDispatcher.register(this._registerCallback.bind(this));
    }

    _registerCallback(event) {
        switch (event.type) {

            case AppConstants.COMMAND.PROCESS_COMMAND:
                this.execute(event.payload.text);
                break;

            default:
            // do nothing
        }
    }

    selectByRedirectors(commandParts) {
        var result = [], r = [];
        for (var i = 0; i < commandParts.length; i++) {
            var cp = commandParts[i];
            var suitableRedirectors = _redirectors.filter(function (r) { return r.command === cp; });
            if (suitableRedirectors.length) {
                result.push(r);
                result.push(cp);
                r = [];
            }
            else
                r.push(cp);
        }
        if (r.length)
            result.push(r);

        return result;
    };

    appendCommandHandler(handler) {
        if (!handler || !handler.command || !handler.handle || !handler.description)
            throw new Error("Invalid command handler");

        var suitableHandlers = _handlers.filter(function (item) {
            return item.command === handler.command;
        });

        if (suitableHandlers.length !== 0)
            throw new Error("There is already a handler for that command.");

        _handlers.push(handler);
    };

    appendRedirectorHandler(handler) {
        if (!handler || !handler.command || !handler.handle)
            throw new Error("Invalid redirect handler");

        var suitableHandlers = _redirectors.filter(function (item) {
            return item.command === handler.command;
        });

        if (suitableHandlers.length !== 0)
            throw new Error("There is already a handler for that redirection.");

        _redirectors.push(handler);
    }

    describe() {
        return _handlers.map(function (item) { return item.command + ' - ' + item.description; });
    }

    execute(consoleInput) {
        var fullCommandParts = split(consoleInput);
        var stackedParts = this.selectByRedirectors(fullCommandParts);

        var redirector = null;

        for (var i = 0; i < stackedParts.length; i++) {
            var p = stackedParts[i];

            if (redirector) {
                redirector.handle.apply(p);
                redirector = null;
                continue;
            }

            var suitableRedirectors = _redirectors.filter(function (r) { return r.command === p; });
            if (suitableRedirectors.length) {

                redirector = suitableRedirectors[0];
            }
            else {
                var suitableHandlers = _handlers.filter(function (item) {
                    return p.length && item.command === p[0].toLowerCase();
                });

                if (suitableHandlers.length === 0) {
                    AppDispatcher.dispatch({ type: AppConstants.OUTPUT.APPEND, payload: { lines: ['Unknown command'] } });
                    return;
                }
                var h = suitableHandlers[0];
                h.handle.apply(p);
            }
        }
    }
}

export default new CommandBroker();
