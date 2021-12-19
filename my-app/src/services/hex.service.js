import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/hex/';

class HexService {

  getVerify(vcode) {
    return axios.get(API_URL + 'verify/' +`${vcode}`);
  }


}

export default new HexService();
