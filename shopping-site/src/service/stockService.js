import http from "./httpService";

const url = "/api/products/";
const updateUrl = "/api/upload"

function getStockList() {
  return http.get(url + "getStock");
}

function addToStockList(obj) {
  return http.post(updateUrl, obj);
}

function updateStockList(id, obj) {
  return http.put(updateUrl + "/" + id, obj);
}

function deleteStock(id) {
  return http.delete(updateUrl + "/" + id);
}

export { getStockList, addToStockList, updateStockList, deleteStock }