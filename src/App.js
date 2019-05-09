import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios' // - react way of importing
import ReactDOM from 'react-dom';
import './ticket-master.css';
import './searchBar.css'


import TicketForm from './TicketFrom'
import TicketTable from './TicketTabel'
import ProgressBar from './ProgressBar'
import Charts from './Chart'
import PieChart from './PieChart'
import {ButtonGroup, Button} from 'reactstrap'


class App extends React.Component {   // -App , Component --> Pascal casing
    constructor(){
      super()
      this.state = {
        tickets: [],
        value: 0,
        max: 0,
        loader: false,
        display: false,
        status : '',
        priorityTickets: []
      }
    }

    componentDidMount(){
      console.log('compound')
      axios.get('http://dct-api-data.herokuapp.com/tickets?api_key=5d1e0438d00828fc')
        .then(response => {
          const value = response.data.filter(ticket => ticket.status === 'completed')
          console.log(response.data)
            ReactDOM.render(<App />, document.getElementById('root'));
            this.setState(() => (
              { tickets: response.data,
                max: response.data.length,
                value: value.length
               }))
               console.log(this.state)
        })
        .catch(err => {
        console.log(err)
        })
    }

        handleProgressBar = () => {
          axios.get('http://dct-api-data.herokuapp.com/tickets?api_key=5d1e0438d00828fc')
          .then(response => {  
            const value = response.data.filter(ticket => ticket.status === 'completed')
            this.setState(() => (
              { tickets: response.data,
                max: response.data.length,
                value: value.length + 1
               }))
              })
              .catch(err => {
              console.log(err)
              })
        }

        addition = (ticket) => {
            this.state.tickets.push(ticket)
            this.setState(()=> ({ }))
        }

        handleSearch = (e) => {
          const value = e.target.value
          const tickets = this.state.tickets.filter(ticket => Object.values(ticket).join('').includes(value))
          this.setState(() => ({ priorityTickets: tickets, loader: true }))
        }

        handleAllTickets= () => {
          this.setState(() => ({ loader:false , priorityTickets: []}))
        }
      
        handleHighTickets = () => {
          this.setState((prevState) => (
            { priorityTickets: prevState.tickets.filter(ticket => ticket.priority === 'High') ,loader:true}))
        }

        handleMediumTickets= () => {
          this.setState((prevState) => (
            { priorityTickets: prevState.tickets.filter(ticket => ticket.priority === 'Medium'),loader:true}))
        }

        handleLowTickets= () => {
          this.setState((prevState) => (
            { priorityTickets: prevState.tickets.filter(ticket => ticket.priority === 'Low'),loader:true}))
        }

      render() {
        return (
          <div>
              <div id='heading'><h1>Ticket Master</h1></div>
              <div className="row">
                <div className="col-sm-7" >
                  <div className="topnav">
                      <ButtonGroup>
                          <Button onClick={this.handleAllTickets} >All</Button>
                          <Button onClick={this.handleHighTickets}>High</Button>
                          <Button onClick={this.handleMediumTickets}>Medium</Button>
                          <Button onClick={this.handleLowTickets}>Low</Button>
                      </ButtonGroup>
                      <label id='ticket-count'> <h5>Listing Tickets - { this.state.loader? this.state.priorityTickets.length : this.state.tickets.length } </h5></label>

                      <input type='text' className='search' placeholder='Search' onChange={this.handleSearch}/>
                    </div>

                  <TicketTable tickets={this.state.tickets} status={this.state.status} handleProgressBar={this.handleProgressBar} loader={this.state.loader} priorityTickets={this.state.priorityTickets} handleTickets={this.handleTickets} />
                  <br/>
                  <div id='progressBar'>
                  <ProgressBar value={this.state.value} max={ this.state.max}/>
                  </div>
                  <br/>
                  <div id='charts'>
                        <div id='barChart'>
                          <Charts tickets={this.state.tickets} /> <br/>
                        </div>
                        <div id='pieChart'>
                          <PieChart tickets={this.state.tickets} />
                        </div>
                      </div>
                </div>

                  <div className="col-sm-3" id='div-right'>              
                      <TicketForm addition={this.addition}/>
                      <br/>
                   
                  </div>
            </div>
            
          </div>
        )
      }        
    }
export default App;




