import React from 'react'
import moment from 'moment'
import { Form,Label } from  "semantic-ui-react"
import  DatePicker  from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

const DateInput = ({input:{value,onChange,...restInput},placeholder,width,meta:{touched,error},...rest}) => {
  return (
    <Form.Field error={error && !!touched} width={width}>
      <DatePicker
      {...rest}
      placeholder={placeholder}
      selected={value ? moment(value):null}
      onChange={onChange}
      {...restInput}
      />
       {touched && error && <Label basic color='red' >{error}</Label>}    
    </Form.Field>
  )
}

export default DateInput
