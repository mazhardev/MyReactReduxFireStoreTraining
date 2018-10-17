import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  COUNTER_ACTION_STARTED,
  COUNTER_ACTION_FINISHED
} from "./testContans";
import { createReducer } from "../../app/common/util/reducerUtil";
const initialState = {
  data: 42,
  loading: false
};
export const incrimentCounter = (state, payLoad) => {
  return { ...state, data: state.data + 1 };
};
export const decrimentCounter = (state, payLoad) => {
  return { ...state, data: state.data - 1 };
};
export const counterActionStarted = (state, payload) => {
  return { ...state, loading: true };
};
export const counterActionFinished = (state, payload) => {
  return { ...state, loading: false };
};
export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrimentCounter,
  [DECREMENT_COUNTER]: decrimentCounter,
  [COUNTER_ACTION_STARTED]:counterActionStarted,
  [COUNTER_ACTION_FINISHED]:counterActionFinished
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
