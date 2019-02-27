import React, { Component } from "react"
import {Container, Button, Row, Col} from "reactstrap"
import APICalls from "../../../../modules/APICalls"
import ProductTypeForm from "../product_type_form/product_type_form"
import PropTypes from "prop-types"

class ProductTypeDetail extends Component {
  state = {
    isLoaded: false,
    edit: false
  }

  componentDidMount = () => {
    this.refreshData()
  }

  refreshData = () => {
    APICalls.getOneFromCategory("producttypes", this.props.match.params.productTypeId)
      .then(product_type_detail => this.setState({ product_type_detail, isLoaded: true }))
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit  })
  }

  productTypeDetail = (product_type) => {
    return(
      product_type
        ? <>
        <Row>
          <Col className="mb-5">
            <h1>{product_type.name}</h1>
          </Col>
        </Row>
        </>
        : null
    )
  }

  render() {
    return (
      <Container>
        {
          (this.state.edit === true)
            ? <ProductTypeForm
              productType={this.state.product_type_detail}
              toggle={this.toggleEdit}
              refresh={this.refreshData}
            />
            :null
        }
        {
          (this.state.edit === false )
            ?<Button color="primary" onClick={()=> this.toggleEdit()}>Edit Product Type</Button>
            :<Button color="danger" onClick={()=> this.toggleEdit()}>Cancel</Button>
        }
        {
          (this.state.isLoaded == true)
            ? this.productTypeDetail(this.state.product_type_detail)
            : null
        }
      </Container>
    )
  }
}

export default ProductTypeDetail

ProductTypeDetail.propTypes = {
  match: PropTypes.object
}


// class ComputerDetail extends Component {
//   state = {
//     isLoaded: false,
//     edit: false
//   }

//   getComputer = () => {
//     APICalls.getOneFromCategory("computers", parseInt(this.props.match.params.compId))
//       .then((computer) => {
//         this.setState({computer: computer, isLoaded: true})
//       })

//   }

//   toggleEdit = () => {
//     this.setState({edit: !this.state.edit})


//   }

//   componentDidMount(){
//     this.getComputer()
//   }

//   render() {
//     return(
//       <>
//         {
//           (this.state.edit === true)
//             ? <ComputerForm
//               computer={this.state.computer}
//               toggle={this.toggleEdit}
//               refresh={this.getComputer}
//             />
//             : null
//         }
//         {
//           (this.state.edit === false)
//             ? <Button color="primary" onClick={() => this.toggleEdit()}>Edit Computer</Button>
//             : <Button color="danger" onClick={() => this.toggleEdit()}>Cancel</Button>
//         }
//         {
//           (this.state.isLoaded == true)
//             ?
//             <Container>
//               <p>Make: {this.state.computer.make}</p>
//               <p>Model: {this.state.computer.model}</p>
//               <p>Serial No: {this.state.computer.serial_no}</p>
//               <p>Purchase Date: {this.state.computer.purchase_date}</p>
//               <p>Retire Date: {this.state.computer.retire_date}</p>
//             </Container>
//             : null
//         }

//       </>
//     )
//   }
// }