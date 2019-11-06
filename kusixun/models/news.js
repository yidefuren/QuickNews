import { HTTP } from '../utils/http.js'

class NewsModel extends HTTP{
  constructor() {
    super()
  }

  getNewsList(page, pageSize, success, error, fail) {
    var params = {
      url: 'kx?page=' + page + '&&pageSize=' + pageSize,
      success: success,
      error: error,
      fail: fail
    }
    this.request(params)
  } 
}

export { NewsModel }