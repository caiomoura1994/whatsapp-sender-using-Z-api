import PropTypes from 'prop-types';
import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef
} from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext(null);

const SocketProvider = ({
  uri = '',
  children = null,
  reducer = () => { },
  socketOpts = {},
  initialState = {}
}) => {
  const [socket, setSocket] = useState({ on: () => { }, });
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const newSocket = io(uri, socketOpts);
    const emit = newSocket.emit.bind(newSocket);
    newSocket.emit = function (...args) {
      const [eventType, event] = args;
      if (eventType === 'packet') {
        const { data = [] } = event;
        const [eventName, payload] = data;
        const action = { type: eventName, payload };
        dispatch(action);
      }

      return emit(...args);
    };

    setSocket(newSocket);

    return () => {
      setSocket(null);
      return newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  uri: PropTypes.string,
  children: PropTypes.element,
  reducer: PropTypes.func,
  socketOpts: PropTypes.object,
  initialState: PropTypes.object
};

export default SocketProvider;

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

export const useSocketState = () => {
  const { state } = useContext(SocketContext);
  return state;
};

export const useSocketSelector = (selector) => {
  const state = useSocketState();
  return selector(state);
};

export const useEmit = () => {
  const socket = useSocket();
  return socket.emit;
};

export const useEmitEvent = (eventName) => {
  const socket = useSocket();
  return (data) => {
    if (socket && socket.emit) {
      return socket.emit(eventName, data);
    }
    return null;
  };
};

export const useSocketDispatch = () => {
  const { dispatch } = useContext(SocketContext);
  return dispatch;
};

export const useSocketEventName = (
  eventKey,
  callback
) => {
  const socket = useSocket();
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const socketHandlerRef = useRef(function (...args) {
    if (callbackRef.current) {
      callbackRef.current.apply(this, args);
    }
  });

  const subscribe = () => {
    if (socket && eventKey) {
      socket.on(eventKey, socketHandlerRef.current);
    }
  };

  const unsubscribe = () => {
    if (socket.removeListener && eventKey) {
      socket.removeListener(eventKey, socketHandlerRef.current);
    }
  };

  useEffect(() => {
    subscribe();

    return unsubscribe;
  }, [eventKey]);

  return { socket, unsubscribe, subscribe };
};
