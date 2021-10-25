import {ObjectId} from 'mongodb';

export interface IRoom {
  _id?: ObjectId;
  name: string;
  users: string[];
  password: string;
}
