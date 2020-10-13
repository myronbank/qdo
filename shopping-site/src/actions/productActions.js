import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR, PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  UPDATE_LIST_SUCCESS, DELETE_LIST
} from '../constants/productConstants';
import { addToStockList, updateStockList } from "../service/stockService";
import axios from "axios";
import Cookie from "js-cookie";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message });
  }

}

const addStock = (stockDetail) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await addToStockList(stockDetail);
    dispatch({ type: UPDATE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message });
  }
}

const updateStock = (stockDetail) => async (dispatch) => {
  try {
    const { data } = await updateStockList(stockDetail._id, stockDetail);
    console.log(data);
    dispatch({ type: UPDATE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message });
  }
}

const deleteStock = (id) => async (dispatch) => {
  try {
    const { data } = await deleteStock(id);
    dispatch({ type: DELETE_LIST, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message });
  }
}
// const deleteStock = (stockDetail) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_STOCK_ATTEMPT });
//     const { data } = deleteStock(stockDetail._id);
//     dispatch({ type: DELETE_STOCK_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: DELETE_STOCK_FAIL, payload: error.message });
//   }
// }

const detailsProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: id });
    const { data } = await axios.get("/api/products/" + id);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data[0] });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
}

export { listProducts, detailsProduct, addStock, updateStock, deleteStock };