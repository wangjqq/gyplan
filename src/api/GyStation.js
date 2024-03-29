import request from "../utils/request";
// 获取所有元器件列表
export function getAllImsList() {
  return request({
    url: "/api/ims/getAllImsList",
    method: "get",
  });
}
// 根据分类获取元器件列表
export function getImsListByType(params) {
  return request({
    url: "/api/ims/getImsListByType",
    method: "get",
    params
  });
}
// 获取元器件分类列表
export function getTypeList() {
  return request({
    url: "/api/ims/getTypeList",
    method: "get",
  });
}

// 新增元器件分类
export function addItemType(params) {
  return request({
    url: "/api/ims/addItemType",
    method: "post",
    params
  });
}
// 新增元器件
export function addItem(params) {
  return request({
    url: "/api/ims/addItem",
    method: "post",
    params
  });
}