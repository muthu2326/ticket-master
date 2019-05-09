import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ticket-master.css';
import './checkbox.css'
import { Spinner } from 'reactstrap'
import axios from 'axios' // - react way of importing

class TicketRow extends React.Component{
    constructor(props){
      super(props)
      
      this.state = {
        ticket: props.ticket,
        display: false,
        status: props.ticket.status
      }
    }

    handleStatusUpdate = (e) => {
      const status = e.target.checked? "completed" : "open"
      e.target.disabled = true
      this.setState((prevState) => ({ display: !prevState.display}))

       axios.put(`http://dct-api-data.herokuapp.com/tickets/${e.target.value}?api_key=5d1e0438d00828fc`, {"status": status},{header:{'Content-Type': 'application/json'}})
        .then((response) => {
            console.log(response.data)
            this.setState((prevState) => ({ display: !prevState.display, status: response.data.status }))
      })
      e.target.disabled = false
      this.props.handleProgressBar()
  }


   render(){
    const  { ticket_code, name, department, message} = this.state.ticket
        return (
            <tr key={ticket_code} >
                <td>{ ticket_code } </td>
                <td>{ name } </td> 
                <td>{ department } </td>
                <td>{ message } </td>
                <td><label class="container">
                  <input type="checkbox" value={ticket_code} onChange={this.handleStatusUpdate} checked = {this.state.status === 'open'? false : true } />{this.state.status} {this.state.display && <Spinner color="primary" />}
                  <span class="checkmark"></span>
                </label></td>
            </tr>    
        )
      }
    }        
    
    export default TicketRow;
    
    
    