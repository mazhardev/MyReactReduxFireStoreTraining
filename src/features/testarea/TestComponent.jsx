import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './actions'
import  Script  from "react-load-script"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const mapState = (state) => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}

class TestComponent extends Component {

  state={
    address:""  ,
    scriptLoaded:false
  }
  handleScriptLoad=()=>{this.setState({scriptLoaded:true})} 
  handleFormSubmit = (event) => {
    event.preventDefault()
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }
onChange=(address)=>{this.setState({address})}

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const {incrementCounter, decrementCounter, data} = this.props;
    return (
      <div>
        <Script
        url='https://maps.googleapis.com/maps/api/js?key=AIzaSyAqe2Hx0D8PX6MdqaIXKQvxr_ysHwj-I04&libraries=places'
        onLoad={this.handleScriptLoad}
       />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Increment' />
        <Button onClick={decrementCounter} color='red' content='Decrement' />
        <br/><br/>
        <form onSubmit={this.handleFormSubmit}>
        {this.state.scriptLoaded &&  <PlacesAutocomplete inputProps={inputProps} /> }
       
        <button type="submit">Submit</button>
      </form>
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent)