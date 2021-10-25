import {BusEvent} from './event-bus.slice';
import {getApiAxios} from '../../utils/canzoni-api-axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const raiseEvent = createAsyncThunk('eventBus/raiseEvent', async (data: {event: BusEvent}) => {
  return await _raiseEvent(data.event);
})

const _raiseEvent = async (action: string) => {
  const res = await getApiAxios().post(
    'events/raise-event',
    {
      action
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
  );
  return res.data;
};
