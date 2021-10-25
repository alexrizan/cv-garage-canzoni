import {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {useAppDispatch} from '../../app/hooks';
import {receiveEvent} from './event-bus.slice';


const useSSE = () => {
  const [eventSource, setEventSource] = useState<EventSource>();
  const {activeRoom, token} = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeRoom && token) {
      const es = new EventSource(`${process.env.REACT_APP_API_URL}/events/subscribe/${token}`);
      setEventSource(es);
      console.log('open new connection');
      return () => {
        es.close();
      };
    }
  }, [activeRoom, token]);

  if (!activeRoom || !token) {
    eventSource?.close();
    console.log('close connection');
  }

  if (eventSource) {
    eventSource.onmessage = (e) => {
      console.log(e?.data);
      dispatch(receiveEvent(e?.data));
    };
  }

  return 'ok';
};

export default useSSE;
