import axios from 'axios';
import enhanceRequest from './enhanceRequest';

enhanceRequest(axios);
axios.defaults.baseURL = __DEV__ ? 'http://localhost:6057/api/v1' : 'http://api.hyperii.com/solo/api/v1';

export default axios;
