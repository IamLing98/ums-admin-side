import * as socketActions from "./actions/WebSocketsActions";
import { wsTypes } from "./actions/types";

import * as SockJS from "sockjs-client";
import {Stomp} from '@stomp/stompjs'

export const JWT_TOKEN = "jwtToken";
export const ROLE_ADMIN = "PDT";

export const SOCKETS_CONNECTING = "SOCKETS_CONNECTING";
export const SOCKETS_CONNECT = "SOCKETS_CONNECT";
export const SOCKETS_CONNECTED = "SOCKETS_CONNECTED";
export const SOCKETS_DISCONNECTING = "SOCKETS_DISCONNECTING";
export const SOCKETS_DISCONNECT = "SOCKETS_DISCONNECT";
export const SOCKETS_DISCONNECTED = "SOCKETS_DISCONNECTED";
export const SOCKETS_MESSAGE_SENDING = "SOCKETS_MESSAGE_SENDING";
export const SOCKETS_MESSAGE_SEND = "SOCKETS_MESSAGE_SEND";
export const SOCKETS_MESSAGE_RECEIVING = "SOCKETS_MESSAGE_RECEIVING";
export const SOCKETS_MESSAGE_RECEIVE = "SOCKETS_MESSAGE_RECEIVE";
export const SOCKETS_MESSAGE_SUBSCRIBE = "SOCKETS_MESSAGE_SUBSCRIBE";

let socket = null;
let stompClient = null;
let subscription = null;

export const wsMiddleware = (store) => (next) => (action) => {
  const onSingleMessage = (message) => {
    // Parse the JSON message received on the websocket
    store.dispatch(socketActions.socketsMessageReceiving(message.body));
    //Can parse the incoming message and dispatch to the appropriate destination at this point
    store.dispatch({
      type: wsTypes.SOCKETS_MESSAGE_RECEIVE,
      payload: message.body,
    });

    subscription.unsubscribe();
    subscription = null;
  };

  const onSubscribeMessage = (message) => {
    // Parse the JSON message received on the websocket
    store.dispatch(socketActions.socketsMessageReceiving(message.body));
  };

  switch (action.type) {
    case wsTypes.SOCKETS_CONNECT:
      if (socket !== null) {
        store.dispatch(socketActions.socketsDisconnecting());
        socket.close();
        store.dispatch(socketActions.socketsDisconnected());
      }
      store.dispatch(socketActions.socketsConnecting);
      let headerToken = `access_token=${localStorage.getItem(JWT_TOKEN)}`;
      socket = new SockJS(`http://localhost:8080/socket?${headerToken}`);
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function(frame) {
        store.dispatch(socketActions.socketsConnected());
      });
      break;

    case wsTypes.SOCKETS_DISCONNECT:
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      stompClient = null;
      store.dispatch(socketActions.socketsDisconnected());
      break;

    case wsTypes.SOCKETS_MESSAGE_SEND:
      subscription = stompClient.subscribe(
        action.payload.subscribe,
        onSingleMessage
      );

      stompClient.send(action.payload.api, {}, action.payload.data);
      store.dispatch(socketActions.socketsMessageSending(action.payload.data));
      break;
    case wsTypes.SOCKETS_MESSAGE_SUBSCRIBE:
      console.log("SOCKETS_MESSAGE_SUBSCRIBE")
      if (stompClient) {
        subscription = stompClient.subscribe(
          action.payload.subscribe,
          onSubscribeMessage
        );
      }
      break;
    default:
      return next(action);
  }
};
