import * as socketActions from "./actions/WebSocketsActions";
import { wsTypes } from "./actions/types";

import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs"

export const JWT_TOKEN = "jwtToken";
export const ROLE_ADMIN = "PDT";
 

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
      console.log("socketsMessageSend-data: ",action.payload.data)
      subscription = stompClient.subscribe(action.payload.subscribe, onSingleMessage);
      stompClient.send(action.payload.api, {}, action.payload.data);
      store.dispatch(socketActions.socketsMessageSending(action.payload.data));
      break;
    case wsTypes.SOCKETS_MESSAGE_SUBSCRIBE:
      if (stompClient) {
        subscription = stompClient.subscribe(action.payload.subscribe, onSubscribeMessage);
        console.log("subcrise", subscription);
      }
      break;
    default:
      return next(action);
  }
};
