import * as React from "react";
import { Chart } from "react-google-charts";

function PieChart(props){
    const low = props.tickets.filter(ticket => ticket.priority === 'Low').length
    const medium = props.tickets.filter(ticket => ticket.priority === 'Medium').length
    const high = props.tickets.filter(ticket => ticket.priority === 'High').length
    return(
        <Chart
        width={'450px'}
        height={'320px'}
        chartType="PieChart"
        loader={<div>Loading Chart ..<br/></div>}
        data={[
            ['Priority', 'Total'],
            ['Low', low],   
            ['Medium', medium],
            ['High', high],
        ]}
        options={{
            title: 'Priority',
            is3D: true,
        }}
    />    
    )
}

export default PieChart