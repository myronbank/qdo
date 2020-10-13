
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_ERROR, PRODUCT_LIST_SUCCESS, UPDATE_LIST_SUCCESS, DELETE_LIST } from '../constants/productConstants';

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_ERROR:
      return { loading: false, error: action.payload };

    case UPDATE_LIST_SUCCESS:
      let item = action.payload;
      const products = state.products.find(x => x._id === item._id);

      if (products) {
        return { loading: false, products: state.products.map(x => x._id === item._id ? item : x) };
      } else
        return { loading: false, products: [...state.products, item] };

    case DELETE_LIST:
      return { products: state.products.filter(item => item._id !== action.payload) }

    default:
      return state;
  }
}

export { productListReducer }; 