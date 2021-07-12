// 文章相关
import request from '@/utils/request'
// 获取文章列表
export const getArticles = function (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // params是一个参数
    params
  })
}
// 获取频道列表
export const getChannels = function () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 删除文章
export const deleteArticles = function (articleId) {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
