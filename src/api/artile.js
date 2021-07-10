// 文章相关
import request from '@/utils/request'
export const getArticles = function (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
