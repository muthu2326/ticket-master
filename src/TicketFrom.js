import React from 'react';
import axios from 'axios' // - react way of importing
import { Button } from 'reactstrap'
import './radioBtn.css'


class TicketForm extends React.Component {
    constructor(props){
      super(props)

      this.state = {
          name: '',
          department: '',
          priority: '',
          message: '',
          errorName: '',
          errorMsg: '',
          errorDepartment: '',
          errorPriority: ''
      }
    }

    handleName = (e) => {
      const name = e.target.value
      console.log(name)
      this.setState(() => ({ name }))
    }


    handleDepartment = (e) => {
      const department = e.target.value
      this.setState(() => ({ department }))
    }
    

    handlePriority = (e) => {
      const priority = e.target.value
      this.setState(() => ({ priority }))
    }


    handleMessage = (e) => {
      const message = e.target.value
      console.log(message)
      this.setState(() => ({ message }))
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const formData = {
          name: this.state.name,
          department: this.state.department,
          priority: this.state.priority,
          message: this.state.message
      }

      axios.post('http://dct-api-data.herokuapp.com/tickets?api_key=5d1e0438d00828fc',formData)
      .then((response) => { 
        console.log(response.data)
        if(response.data.hasOwnProperty('errors')){
          console.log(response.data.errors)
          this.setState(() => ({ errorName: response.data.errors.name[0], errorMsg: response.data.errors.message[0],errorDepartment: response.data.errors.department[0],errorPriority: response.data.errors.priority[0]}))
        }else{
          this.props.addition(response.data)
        }
      })
      .catch((err) => {
          console.log(err)
      })
      e.target.reset()
    }
      
    render(){
      return (
        <div>
          <form onSubmit={this.handleSubmit} className="was-validated" id='myform'>

          <fieldset class="scheduler-border">
              <legend class="scheduler-border"><h4>Add Ticket</h4></legend>  
              <div id='form-elements'>
              <div>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Enter name" name="name" onChange={this.handleName}/>
                  <label id='errors' >{this.state.errorName}</label>
              </div><br/>

              <div>
                  <label htmlFor="name">Department</label>
                  <select onChange={this.handleDepartment}>
                      <option>Select</option>
                      <option value='Technical'>Technical</option>
                      <option value='Sales'>Sales</option>
                      <option value='Marketing'>Marketing</option>
                  </select>
                  <label id='errors' >{this.state.errorDepartment}</label>
              </div>
                <br/>

              <div>
              <label id='priority'>Priority
                <label id='radioBtn'>
                    <input type="radio" id="high" name="radio-group" value='High' onClick={this.handlePriority}/>
                    <label for="high" id='radioLabel'>High</label>
              
                    <input type="radio" id="medium" name="radio-group" value='Medium' onClick={this.handlePriority}/>
                    <label for="medium" id='radioLabel'>Medium</label>
              
                    <input type="radio" id="low" name="radio-group" value='Low' onClick={this.handlePriority}/>
                    <label for="low" id='radioLabel'>Low</label>
                    </label>
                  </label><br/>
                  <label id='errors'>{this.state.errorPriority}</label>
                </div>
                
              <div className="form-group">
              <label htmlFor="comment" id='message-label'>Message
                    <textarea rows="5" id="message" placeholder='Message' onChange={this.handleMessage}></textarea>
                    <label id='errors'>{this.state.errorMsg}</label>              
              </label>
              </div>

              <div id='button-div'>
                <Button outline color="primary" type='submit' id='button'>Submit</Button>
                <Button outline color="primary" type='reset' id='button'>Reset</Button>
              </div>
              </div> 
              </fieldset>
          </form>
        </div>
      )
    }
}

export default TicketForm;