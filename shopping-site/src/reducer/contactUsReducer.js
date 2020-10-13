import { CONTACT_US_SUCCESS, CONTACT_US_SUBMITTED, CONTACT_US_FAIL } from '../constants/productConstants';

function contactFormReducer(state = { fields: "" }, action) {
  switch (action.type) {
    case CONTACT_US_SUBMITTED:
      return { loading: true }
    case CONTACT_US_SUCCESS:
      return { loading: false, fields: action.payload };
    case CONTACT_US_FAIL:
      return { loading: false, fields: action.payload };
    default:
      return state;
  }
}

export { contactFormReducer }