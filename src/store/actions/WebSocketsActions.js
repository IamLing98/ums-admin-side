import { wsTypes } from "./types";

export const socketsConnecting = () => {
  return { type: wsTypes.SOCKETS_CONNECTING };
};
export const socketsConnect = () => {
  return { type: wsTypes.SOCKETS_CONNECT };
};
export const socketsConnected = () => {
  return { type: wsTypes.SOCKETS_CONNECTED };
};
export const socketsDisconnecting = () => {
  return { type: wsTypes.SOCKETS_DISCONNECTING };
};
export const socketsDisconnect = () => {
  return { type: wsTypes.SOCKETS_DISCONNECT };
};
export const socketsDisconnected = () => {
  return { type: wsTypes.SOCKETS_DISCONNECTED };
};
export const socketsMessageSending = (sendMessage) => {
  return { type: wsTypes.SOCKETS_MESSAGE_SENDING, messageSend: sendMessage };
};

export const socketsMessageReceiving = (receiveMessage) => {
  return {
    type: wsTypes.SOCKETS_MESSAGE_RECEIVING,
    messageReceive: receiveMessage,
  };
};

export const socketsMessageSend = (data, api, subscribe) => {
  return {
    type: wsTypes.SOCKETS_MESSAGE_SEND,
    payload: {
      api,
      subscribe,
      data,
    },
  };
};

export const socketsSubscribe = (subscribe) => {
  return {
    type: wsTypes.SOCKETS_MESSAGE_SUBSCRIBE,
    payload: {
      subscribe,
    },
  };
};
