import { CREATE_EVENT,DELETE_EVENT,UPDATE_EVENT } from './eventConstants'

export const createEvent=(event)=>{
    return{
        type:CREATE_EVENT,
        payLoad:{
            event
        }
    }
}
export const updateEvent=(event)=>{
    return{
        type:UPDATE_EVENT,
        payLoad:{
            event
        }
    }
}
export const deleteEvent=(eventId)=>{
    return{
        type:DELETE_EVENT,
        payLoad:{
            eventId
        }
    }
}