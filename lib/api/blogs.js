// import axios from 'axios';
import BaseApi from './BaseApi';

class BlogApi extends BaseApi {

  constructor(accessToken) {
    super(accessToken, '/blogs');
  }

  /*
  delete(id) {
    return axios.delete(`${this.apiUrl}/${id}`, this.config);
  }
*/
}

export default BlogApi;