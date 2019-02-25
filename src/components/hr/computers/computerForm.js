import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class ComputerForm extends Component {

  render() {
    return(
      <Form>
        <FormGroup>
          <Label for="make">Make</Label>
          <Input type="text" name="make" id="make" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label for="model">Model</Label>
          <Input type="text" name="model" id="model" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label for="serial_no">Serial Number</Label>
          <Input type="text" name="serial_no" id="serial_no" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label for="purchase_date">Purchase Date</Label>
          <Input type="date" name="purchase_date" id="purchase_date" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label for="date">Retire Date</Label>
          <Input type="date" name="date" id="date" placeholder="" />
        </FormGroup>
        <Button>Save</Button>
      </Form>
    )
  }

}

export default ComputerForm