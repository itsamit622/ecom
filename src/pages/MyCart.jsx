import React from "react";
import { ecomContext } from "./Context";
import {
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import Sign from "../Sign";

export default class MyCart extends React.Component {
  static contextType = ecomContext;
  submitHandler = () => {
    this.context.handler8();
    console.log("");
  };
  // state ={
  //      carts:this.context.carts,
  //     // count:1,
  //     // subtotal:0
  // }

  // countDec() {
  //     if (this.state.count > 0) {
  //       this.state.count = this.state.count - 1
  //     }
  //     this.setState(this.state)
  //   }

  allCart() {
    let itemsV = this.context.carts.map((values, index) => {
      let price = null;

      console.log("values ", index);
      if (values.count === 1) {
        price = values.price;
      } else {
        price = parseInt(values.price) * values.count + "$";
      }
      return (
        <div className="text-center">
          <div className="row">
            <div className="col-2">
              <img src={values.imageUrl} alt="images" width="100" />
            </div>
            <div className="col-2">
              <span>{values.name}</span>
            </div>
            <div className="col-2">
              <span>
                {" "}
                <span onClick={() => this.context.handler3(index)}>❮ </span>
                <span> {values.count} </span>
                <span onClick={() => this.context.handler2(index)}> ❯</span>
              </span>
            </div>
            <div className="col-2">
              <span>{price}</span>
            </div>
            <div>
              <button onClick={() => this.context.removebtn(index)}>
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    });
    return itemsV;
  }

  render() {
    let Data = "";
    if (this.context.modal === true) Data = <Sign />;
    else {
      Data = "";
    }

    let button;
    if (
      this.context.user === this.context.userName &&
      this.context.pass === this.context.password &&
      this.context.modal === false
    ) {
      button = <button className="btn btn-success">Proceed</button>;
    } else {
      button = (
        <button className="btn btn-primary" onClick={this.submitHandler}>
          Place Order
        </button>
      );
    }
    console.log("mycart", this.context.carts);
    return (
      <div className="header-1">
        <div>
          <h1>Your Cart</h1>
          <div>
            <div className="text-center">
              <div className="row">
                <div className="col-2">Product</div>
                <div className="col-2">Description</div>
                <div className="col-2">Quantity</div>
                <div className="col-2">Price</div>
              </div>
            </div>
          </div>
          {this.allCart()}
        </div>
        <div>
          <h5>Total</h5> {this.context.subtotal}$
        </div>
        {button}
        {this.Data}
      </div>
    );
  }
}
