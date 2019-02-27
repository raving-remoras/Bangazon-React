import React, { Component } from "react"
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Button
} from "reactstrap"
import APICalls from "../../../../modules/APICalls"
import PropTypes from "prop-types"

class ProductTypeForm extends Component {
  state = {
    name: "",
  }

  componentDidMount = () => {
    if (this.props.productType){
      this.setState({
        name: this.props.productType.name
      })
    }
  }

  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // function uses state to create a new product type object, and posts it to the database
  addProductType = () => {
    let obj = {
      name: this.state.name
    }

    return APICalls.post("producttypes", obj)
      .then(()=> this.props.refresh())
  }

  // function uses state to create an updated object for an existing product type and performs a PUT on the database
  updateProductType = () => {
    let obj = {
      name: this.state.name
    }

    return APICalls.update("producttypes", obj, this.props.productType.id)
      .then(()=> this.props.refresh())
  }

  render() {
    return (
      <Container>
        <Form
          onSubmit={(evt) => {
            evt.preventDefault()
            {
              (this.props.productType)
                ? this.updateProductType()
                  .then(()=> this.props.toggle())
                : this.addProductType()
                  .then(()=> this.props.toggle())
            }
          }}
          onChange={(evt) => this.handleFieldChange(evt)}
        >
          <FormGroup>
            <Label>Product Type Name</Label>
            <Input type="text" name="name" id="name" required defaultValue={this.state.name} />
          </FormGroup>
          <Button color="primary" type="submit">Save</Button>
        </Form>
      </Container>
    )
  }
}

export default ProductTypeForm

ProductTypeForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  productType: PropTypes.object.isRequired,
}
