import React from "react";
import { Container, Row, Col, CarouselItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import productData from "../data/products.json";
import { ecomContext } from "./Context";
import MyCart from "./MyCart";
import Search from "./Search";

export default class Itemcollection extends React.Component {
  static contextType = ecomContext;
  state = {
    shopdata: this.context.products,
  };
  ClickMe(value, second) {
    value.handler("hello", second);
  }
  render() {
    console.log("id", this.props.match);
    let i = this.props.match.params.id;
    console.log("id", i);
    let filerted = this.state.shopdata.find(function (usersvalues) {
      if (usersvalues.routeName === i) {
        return true;
      } else {
        return false;
      }
    });

    let filtervalue = this.context.filter;
    const regex = new RegExp(filtervalue, "gi");

    const result = filerted.items.filter((item) => item.name.match(regex));
    console.table("regex", result);
    //why not find???????????

    let collections2 = result.map((values) => {
      return (
        <div className="col-md-3 mt-4">
          <Link to={this.props.match.url + "/" + values.id}>
            <img src={values.imageUrl} alt="sf" width="250" height="300" />
            <div className="ml-5">
              {values.name} {values.price}
            </div>
          </Link>
          <button onClick={this.ClickMe.bind(this, this.context, values.id)}>
            ADD to cart
          </button>
        </div>
      );
    });

    let collections = filerted.items.map((values) => {
      return (
        <Col md="4">
          <Link to={this.props.match.url + "/" + values.id}>
            <img src={values.imageUrl} alt="sf" width="250" height="300" />
            <div className="ml-5">
              {values.name} {values.price}
            </div>
          </Link>
          <button onClick={this.ClickMe.bind(this, this.context, values.id)}>
            ADD to cart
          </button>
        </Col>
      );
    });

    // let inCart = null;
    // if (this.context.carts.id == undefined) {
    //     inCart = <h1>hello</h1>
    // }
    // else  {
    //   inCart = <h1>{this.context.carts.id}</h1>
    // }
    let Mycollections = "";
    if (collections2.length > 0 && filtervalue.length > 1) {
      Mycollections = collections2;
    } else {
      Mycollections = collections;
    }
    return (
      <>
        <div>
          <h2 className="p-3 mb-2 bg-primary text-white text-center">
            <div>{filerted.title}</div>
          </h2>

          {/* <ul style={{display:"inline-flex" ,listStyle:"none"}}> */}
          <Container>
            <Row>{Mycollections}</Row>
          </Container>
          {/* </ul> */}
        </div>
      </>
    );
  }
}
