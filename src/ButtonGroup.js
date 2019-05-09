import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

function FilterButtons(props){
    return (
      <ButtonGroup>
        <Button onClick={props.handleTickets} >All</Button>
        <Button>High</Button>
        <Button>Medium</Button>
        <Button>Low</Button>
      </ButtonGroup>
    );
  }

  export default FilterButtons
