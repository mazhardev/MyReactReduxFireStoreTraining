import React from 'react'
import TestModal from './TestModal'
import {connect} from  "react-redux"
const modalLookup={
    TestModal
}
const mapState=(state)=>({
    currentModal:state.modals
})
const ModalManager=({currentModal})=> {
   let renderedModal;
if(currentModal) {
    const {modalType,modalProps}=currentModal;
    const ModalComponent=modalLookup[modalType];
    renderedModal=<ModalComponent {...modalProps} />
}  
    return <span>{renderedModal}</span>
}

export default connect(mapState)(ModalManager)
