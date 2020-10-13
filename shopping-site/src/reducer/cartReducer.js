import { ADD_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constants/productConstants';

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let item = action.payload;
      // chances are shopper already put one in his basket and thus it needs updating the quantity;
      const product = state.cartItems.find(x => x._id === item._id)
      if (product) {
        return { cartItems: state.cartItems.map(x => x._id === product._id ? item : x) }
      } else
        return { cartItems: [...state.cartItems, item] }

    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter(item => item._id !== action.payload) }

    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload }

    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload }

    default:
      return state;
  }
}

export { cartReducer };