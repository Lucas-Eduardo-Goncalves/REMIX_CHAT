import { EventEmitter } from "events";

declare global {
  var emitter: EventEmitter;
}

if (!global.emitter) {
  global.emitter = new EventEmitter();
}

export const emitter = global.emitter;

export const EVENTS = {
  MESSAGE_CHANGED(chatId: string) {
    global.emitter.emit(`/secure/dashboard/${chatId}`);
  },
};
