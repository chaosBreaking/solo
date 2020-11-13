import axios from 'axios';
import enhanceRequest from './enhanceRequest';

enhanceRequest(axios);
axios.defaults.baseURL = __DEV__ ? 'http://localhost:6057/api/' : 'http://api.hyperii.com/api/';

export default axios;
