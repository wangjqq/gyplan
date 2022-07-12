import request from "../utils/request";

export function getKnowledgeList() {
  return request({
    url: "/api/knowledge/getKnowledgeList",
    method: "get",
  });
}

export function getDataStructureList() {
  return request({
    url: "/api/knowledge/getDataStructureList",
    method: "get",
  });
}