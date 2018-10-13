import { combineReducers } from "redux";
import testReducer from "../../features/testarea/TestReducer";
import eventReducer from "../../features/event/EventReducer";
import { reducer as FormReducer } from "redux-form";
import modalsReducer from "../../features/modals/modalsReducer";
const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
  form: FormReducer,
  modals: modalsReducer
});

export default rootReducer;
