import React from 'react';
import { Button, Col, Collapse, Container, Form, Image, Modal, Row } from 'react-bootstrap'
import productsData  from '../data/products.json'
import {ecomContext} from './Context'

export default class Itemvalues extends React.Component {
  static contextType = ecomContext;
  state = {
    isValue: false,
    show: false,
    count: 1,
    shopdata: this.context.products

  };

  filerted = this.state.shopdata.filter((values) => {
    if (values.routeName == this.props.match.params.name) {
      return true;
    }
    else {
      return false;
    }
  })

  items = this.filerted.map((values) => {
    return values.items
  })
  filerted2 = this.items[0].filter((values) => {
    console.log(values)
    if (values.id == this.props.match.params.id) {
      return true;
    }
    else {
      return false;
    }
  })
  addCart() {
    console.log("add to cart")
    this.state.isValue = true;
    this.setState(this.state)
  }
  cancleCart() {
    console.log("add to cart")
    this.state.isValue = false;
    this.state.count = 1
    this.setState(this.state)
  }
  countInc() {
    let newCount = this.state.count + 1
    this.setState({
      count: newCount
    })
  }
  countDec() {
    if (this.state.count > 0) {
      this.state.count = this.state.count - 1
    }
    this.setState(this.state)
  }
  userLink() {
    let itemPic = this.filerted2.map((values) => {
      return <div className="container mt-4">
        <div className="row"> 
        <div className="col-4"> <Image src={values.imageUrl} alt="image"  height="500" />  </div> 


<div className="col-4 text-center">
        <div> <h3>{values.name}</h3>
          Price: {values.price}</div>
        <button className="btn btn-primary " onClick={this.addCart.bind(this)}>Add to cart</button>
       
      </div>
      </div>
      </div>
    })
    return itemPic
  }

  handleModal = () => {

    this.setState({
      show: !this.state.show
    })
  }

  userLink2() {
    let itemPic = this.filerted2.map((values) => {
      let price = null;
      if (this.state.count === 1) {
        price = values.price
      }
      else {
        price = parseInt(values.price) * this.state.count + "$"
      }
      return <div>
        <div className="p-3 mb-2 bg-primary text-white text-center">
          ORDER SUMMARY
      </div>
        <div className="container border-C">
          <div className="row">
            <ul>
              <li className="list">
                Product
          </li>
              <li className="list">
                Description
          </li>
              <li className="list">
                Quantity
          </li>
              <li className="list">
                Price
          </li>

            </ ul>
          </div>


          <div >
            <div className="row">
              <ul>
                <li className="list">
                  <img src={values.imageUrl} alt="images" width="100" />
                </li>
                <li className="list">
                  <span>{values.name}</span>
                </li>
                <li className="list">
                  <span  ><span onClick={this.countDec.bind(this)}> ❮    </span>{this.state.count}<span onClick={this.countInc.bind(this)}>   ❯</span></span>
                </li>
                <li className="list">
                  <span>{values.price}</span>
                </li>
                <li className="list">
                  <button className="btn btn-primary " onClick={this.cancleCart.bind(this)}>Cancel cart</button>
                </li>
              </ ul>
            </div>

          </div>
        </div>
        <div className="container total">
          <div className="row">
            <div>

              TOTAL PRICE : {price}  &nbsp; &nbsp; &nbsp;


       <Button type="button" class="btn btn-primary" onClick={() => { this.handleModal() }} >Pay Now</Button>
              <Container>
                <Modal show={this.state.show} onHide={() => { this.handleModal() }} >
                  <Modal.Header closeButton> <h3 className="text-primary"> SCRED. </h3> <br />
                    <h5 className="price2">
                      Your total price is {price}
                    </h5>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                          Name*
    </Form.Label>
                        <Col sm="10">
                          <Form.Control placeholder="Enter your name" />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} >
                        <Form.Label column sm="2">
                          Mobile Number*
    </Form.Label>
                        <Col sm="10">
                          <Form.Control type="text" placeholder="Mobile number" />
                        </Col>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Address*</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter your address" />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => { this.handleModal() }} >
                      Payment Info
  </Button>
                  </Modal.Footer>
                </Modal>
              </Container>
            </div>
          </div>
        </div>
      </div>

    })
    return itemPic
  }



  render() {
    console.log("hello", this.props.match.params)
    let data = null
    if (this.state.isValue == false) {
      data = this.userLink()
    }
    else {
      data = this.userLink2()
    }

    return <div>


{data}
          

      
    </div>
  }
}