import { combineReducers } from 'redux';
import testReducer from '../../features/testarea/TestReducer';
import  eventReducer  from '../../features/event/EventReducer'
const rootReducer = combineReducers({
  test: testReducer,
  events:eventReducer
  
})

export default rootReducer