import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testContans";
import { createReducer } from "../../app/common/util/reducerUtil";
const initialState = {
  data: 42
};
export const incrimentCounter = (state, payLoad) => {
  return { ...state, data: state.data + 1 };
};
export const decrimentCounter = (state, payLoad) => {
  return { ...state, data: state.data - 1 };
};

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrimentCounter,
  [DECREMENT_COUNTER]: decrimentCounter
});
//const testReducer = (state = initialState, action) => {
//switch (action.type) {
// case INCREMENT_COUNTER:
// return { ...state, data: state.data + 1 };
// case DECREMENT_COUNTER:
//  return { ...state, data: state.data - 1 };
// default:
// return state;
//}
//};
