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
        message: "Connected",
        connected: true,
      });
    case wsTypes.SOCKETS_DISCONNECTING:
      return Object.assign({}, state, {
        loaded: true,
        message: "Disconnecting...",
        connected: true,
      });
    case wsTypes.SOCKETS_DISCONNECTED:
      return Object.assign({}, state, {
        loaded: true,
        message: "Disconnected",
        connected: false,
      });
    case wsTypes.SOCKETS_MESSAGE_SENDING:
      return Object.assign({}, state, {
        loaded: true,
        message: action.messageSend,
        connected: true,
      });
    case wsTypes.SOCKETS_MESSAGE_RECEIVING:
      return Object.assign({}, state, {
        loaded: true,
        message: action.messageReceive,
        connected: true,
      });
    default:
      return state;
  }
};
