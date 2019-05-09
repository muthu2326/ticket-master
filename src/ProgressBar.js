import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Progress } from 'reactstrap'


function ProgressBar(props) {
    console.log(props.max, props.value)
    return (
        <div>
        {props.value}% completed
        <Progress color="success" value={props.value} max={props.max}></Progress>
        </div>
    )
}

export default ProgressBar
