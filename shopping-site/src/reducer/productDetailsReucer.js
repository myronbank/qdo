import { PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST } from '../constants/productConstants';

function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { logging: true, product: { id: action.payload } };
    case PRODUCT_DETAILS_SUCCESS:
      return { logging: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { logging: false, error: action.payload };

    default:
      return state;
  }
}

export { productDetailsReducer };