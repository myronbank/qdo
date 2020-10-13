import { ADD_STOCK_FAIL, ADD_STOCK_SUCCESS, ADD_STOCK_ATTEMPT, DELETE_STOCK_ATTEMPT, DELETE_STOCK_SUCCESS, DELETE_STOCK_FAIL } from '../constants/productConstants';

function productStockReducer(state = { products: [] }, action) {
  switch (action.type) {
    case ADD_STOCK_ATTEMPT:
      return { loading: true };
    case ADD_STOCK_SUCCESS:
      return { loading: false, products: action.payload };
    case ADD_STOCK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}


// function deleteStockReducer(state = { products: [] }, action) {
//   switch (action.type) {
//     case DELETE_STOCK_ATTEMPT:
//       return { loading: true };
//     case DELETE_STOCK_SUCCESS:
//       return { loading: false, products: action.payload };
//     case DELETE_STOCK_FAIL:
//       return { loading: false, error: action.payload };

//     default:
//       return state;
//   }
// }
export { productStockReducer };