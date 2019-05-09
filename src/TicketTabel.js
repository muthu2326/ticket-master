import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ticket-master.css';
import TicketRow from './TicketRow'

function TicketTable(props){
        return (

          <table className="table table-striped">
              <thead align="center">
              <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody align="center">
                { (props.loader? props.priorityTickets : props.tickets).map((ticket) => {                                                                                                                                                                                                                                                                                                                                                                                                           
                    return (
                        <TicketRow key={ticket.ticket_code} status={props.status} ticket={ticket} handleProgressBar={props.handleProgressBar} />
                    )
                })}
            </tbody>
            </table>
        )
      }        
    
    
    export default TicketTable;
    
    
    
    
    