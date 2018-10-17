import { createReducer } from '../../app/common/util/reducerUtil'
import { ASYNC_ACTION_START,ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR  } from './asyncConstants'

const initialState={
    loading:false
}

export const asyncactionstart=(state,payload)=>{
    return{
        ...state,loading:true
    }
}
export const asyncactionfinish=(state,payload)=>{
    return{
        ...state,loading:false
    }
}
export const asyncactionerror=(state,payload)=>{
return{
...state,loading:false
}
}
export default createReducer(initialState,{
    [ASYNC_ACTION_START]:asyncactionstart,
    [ASYNC_ACTION_FINISH]:asyncactionfinish,
    [ASYNC_ACTION_ERROR]:asyncactionerror
})