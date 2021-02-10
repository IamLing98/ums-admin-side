/* @flow */
import { wsTypes } from "../actions/types"; 

const initState = {
  loaded: false,
  message: "Just created",
  connected: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case wsTypes.SOCKETS_CONNECTING:
      return Object.assign({}, state, {
        loaded: true,
        message: "Connecting...",
        connected: false,
      });
    case wsTypes.SOCKETS_CONNECTED:
      return Object.assign({}, state, {
        loaded: true,
        message: null,
        connected: true,
      });
    case wsTypes.SOCKETS_DISCONNECTING:
      return Object.assign({}, state, {
        loaded: true,
        message: null,
        connected: true,
      });
    case wsTypes.SOCKETS_DISCONNECTED:
      return Object.assign({}, state, {
        loaded: true,
        message: null,
        connected: false,
      });
    case wsTypes.SOCKETS_MESSAGE_SENDING:
      return Object.assign({}, state, {
        loaded: true,
        message: null,
        connected: true,
      });
    case wsTypes.SOCKETS_MESSAGE_RECEIVING:
      return Object.assign({}, state, {
        loaded: true,
        message:   action.messageReceive  ,
        connected: true,
      });
    default:
      return state;
  }
};
