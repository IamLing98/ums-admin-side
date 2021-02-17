/* @flow */
import { wsTypes } from "../actions/types";

const initState = {
  loaded: false,
  messages: [],
  connected: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case wsTypes.SOCKETS_CONNECTING:
      return Object.assign({}, state, {
        loaded: true,
        messages: [],
        connected: false,
      });
    case wsTypes.SOCKETS_CONNECTED:
      return Object.assign({}, state, {
        loaded: true,
        messages: [],
        connected: true,
      });
    case wsTypes.SOCKETS_DISCONNECTING:
      return Object.assign({}, state, {
        loaded: true,
        messages: [],
        connected: true,
      });
    case wsTypes.SOCKETS_DISCONNECTED:
      return Object.assign({}, state, {
        loaded: true,
        messages: [],
        connected: false,
      });
    case wsTypes.SOCKETS_MESSAGE_SENDING:
      return Object.assign({}, state, {
        loaded: true,
        messages: [],
        connected: true,
      });
    case wsTypes.SOCKETS_MESSAGE_RECEIVING:
      let newMessages = state.messages;
      console.log("new messages", newMessages);
      newMessages.unshift(action.messageReceive);
      return Object.assign({}, state, {
        loaded: true,
        messages: [...newMessages],
        connected: true,
      });
    default:
      return state;
  }
};
