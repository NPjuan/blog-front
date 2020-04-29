/*
* 网站管理接口
* */
import api from '../plugins/axios'
import base from './base'; // 导入接口域名列表
const websiteManageAPI = {

  // 登录
  login(params){
    return api.post(`${base.api}/user/login`,params);
  },
  // 通过 token 登录
  loginByToken(params) {
    return api.post(`${base.api}/user/loginByToken`,params);
  },
  // 更改用户权限
  updateLevel(params) {
    return api.post(`${base.api}/user/updateLevel`,params);
  },
  // 上传文章
  uploadArticle(params) {
    return api.post(`${base.api}/article/upload`,params);
  },
  // 删除文章
  deleteArticle(params) {
    return api.post(`${base.api}/article/delete`,params);
  },
  // 根据文章id查找
  getArticleById(params) {
    return api.get(`${base.api}/article/getById`,params);
  },
  // 查找所有文章
  getAllArticle(params) {
    return api.get(`${base.api}/article/getAll`,params);
  },
  // 更改文章
  updateArticle(params) {
    return api.post(`${base.api}/article/update`,params);
  },
  // 模糊查询
  vagueFind(params) {
    return api.get(`${base.api}/article/vagueFind`, params)
  },
  // 上传图片
  loadImage(params) {
    return api.post(`${base.api}/article/image/upload`,params)
  },
  // 删除图片
  deleteImage(params) {
    return api.post(`${base.api}/article/image/delete`,params)
  },
  // 点赞/取消点赞
  like(params) {
    return api.post(`${base.api}/article/like`,params)
  },
  // 查询是否点赞
  isLike(params) {
    return api.get(`${base.api}/article/isLike`,params)
  }
};

export default websiteManageAPI;
