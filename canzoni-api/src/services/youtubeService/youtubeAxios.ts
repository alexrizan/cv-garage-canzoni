import axios from 'axios';
import {config} from '../../../configs';

export default axios.create({
  baseURL: config.YOUTUBE_API_URL,
  params: {
    part: 'snippet',
    maxResults: 20,
    key: config.YOUTUBE_API_KEY
  }
});
