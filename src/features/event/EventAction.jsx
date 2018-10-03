import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './EventConstant'

export const createEvent=(event)=>{
    return{
        type: CREATE_EVENT,
        payload: {event}
    }
}

export const deleteEvent=(eventid)=>{
    return{
        type: DELETE_EVENT,
        payload: {eventid}
    }
}
export const updateEvent=(event)=>{
    return{
        type: UPDATE_EVENT,
        payload: {event}
    }
}