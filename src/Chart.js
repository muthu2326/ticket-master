import * as React from "react";
import { Chart } from "react-google-charts";

function filterData(department,tickets){
    const dataArray = []
    const departments = tickets.filter(ticket => ticket.department === department)
    const open = departments.filter(ticket => ticket.status === 'open').length
    const completed = departments.filter(ticket => ticket.status === 'completed').length
    dataArray.push(department, open + completed, open, completed,)

    return dataArray
}

function Charts(props){
  
    const barChart = [['Department', 'Tickets', 'open', 'completed']]
   let  departments = props.tickets.map(ticket => {
        return ticket.department
   })

    departments = departments.filter(function(item, index, departments){ 
     return departments.indexOf(item) === index; });
    
    departments.forEach((department) => {
        const data = filterData(department,props.tickets)
        barChart.push(data)
    })
        
    return (
        <Chart
        width={'350px'}
        height={'250px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={barChart}
        options={{
          // Material design options
          chart: {
            title: 'Ticket Mater',
            subtitle: 'Departments, Total tickets, Status',
          },
        }}
        />
    )}

    export default Charts