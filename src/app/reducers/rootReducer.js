import { combineReducers } from 'redux';
import testReducer from '../../features/testarea/TestReducer';

const rootReducer = combineReducers({
  test: testReducer
})

export default rootReducer