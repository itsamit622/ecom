import React from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Item from "./pages/Item";
import productsData from "./data/products.json";
import { ecomContext } from "./pages/Context";
import Sign from "./Sign";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import MyCart from "./pages/MyCart";

export default class App extends React.Component {
  state = {
    products: productsData,
    carts: [],
    subtotal: 0,
    subCount: 0,
    filter: null,
    userName: "",
    password: "",
    isLogin: false,
    modal: false,
    user: "admin",
    pass: "adminhello",
  };

  cart = (e, oldId) => {
    console.log("hellocall", e, oldId);
    let tempCart2 = [...this.state.carts];
    let tempCart = [...this.state.products];
    let targetItem;

    tempCart.every(function (single) {
      targetItem = single.items.find((singleItem) => {
        if (singleItem.id === oldId) {
          return true;
        } else {
          return false;
        }
      });
      if (targetItem !== undefined) {
        return false;
      }
      return true;
    });

    targetItem.count = 1;
    let price = targetItem.price;
    targetItem.total = parseInt(price) * targetItem.count;

    let check = tempCart2.every((item) => {
      return item.id !== oldId;
    });

    if (check) {
      this.setState(
        {
          products: tempCart,
          carts: [...this.state.carts, { ...targetItem }],
        },
        () => {
          this.makeTotal();
        }
      );
    } else {
      let itemForCountIncrease = tempCart2.find((item) => item.id == oldId);
      itemForCountIncrease.count += 1;
      itemForCountIncrease.total = parseInt(price) * itemForCountIncrease.count;
      let oldItems = this.state.carts.filter((item) => item.id != oldId);
      this.setState(
        {
          carts: [...oldItems, { ...itemForCountIncrease }],
        },
        () => {
          this.makeTotal();
        }
      );
    }
  };
  inc = (index) => {
  
    let tempCart = [...this.state.carts];
    tempCart[index].count++;
    tempCart[index].total =
      parseInt(tempCart[index].price) * tempCart[index].count;
//confusion in index????
    // let selectedProducts=tempCart.find(item=>item.id===value);
    // // let index=tempCart.indexOf(selectedProducts);
    // // tempCart[index].count++;
    // selectedProducts.count++
    // selectedProducts.total =parseInt(selectedProducts.price) * selectedProducts.count

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.makeTotal();
      }
    );

    console.log("totalmake",tempCart[index] );
  };
  dec = (index) => {
    console.log("id", index);
    let tempCart = [...this.state.carts];
    // tempCart[index].count--
    // tempCart[index].total = parseInt(tempCart[index].price)*tempCart[index].count
    //   let selectedProducts=tempCart.find(item=>item.id===id);
    //   let index=tempCart.indexOf(selectedProducts);
    //   let product=tempCart[index];
    //    product.count =product.count - 1
    //  product.total=parseInt(product.price) * product.count
    if (tempCart[index].count > 1) {
      tempCart[index].count--;
      tempCart[index].total =
        parseInt(tempCart[index].price) * tempCart[index].count;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.makeTotal();
        }
      );
    }

    console.log("pro", tempCart);
  };
  remove = (index) => {
    console.log("id", index);
    this.state.carts[index].total = 0;
    this.state.carts.splice(index, 1);
    this.setState(
      {
        carts: [...this.state.carts],
      },
      () => {
        this.makeTotal();
      }
    );
  };
  makeTotal = () => {
    let subtotal1 = 0;
    let subCount1 = 0;
    this.state.carts.forEach((item) => (subtotal1 += item.total));
    this.state.carts.forEach((item) => (subCount1 += item.count));
    this.setState({
      subtotal: subtotal1,
      subCount: subCount1,
    });
  };

  search(event) {
    console.log("i am e", event.target.value);
    this.setState({
      filter: event.target.value,
    });

    console.log("i am e", event);
  }

  updateUser = (value) => {
    console.log("myval", value);
    this.setState({
      userName: value,
    });
  };
  updatePass = (value) => {
    this.setState({
      password: value,
    });
  };
  submit = () => {
    if (
      this.state.user === this.state.userName &&
      this.state.pass === this.state.password
    ) {
      this.setState({
        // userName:"",
        // password:"",
        isLogin: true,
      });
      console.log("this", this.state.userName);
    } else {
      alert(
        "The user ID/password you have entered is invalid, please try again."
      );
      this.setState({
        userName: "",
        password: "",
        isLogin: false,
      });
    }
  };
  logOut = () => {
    this.setState({
      isLogin: !this.state.isLogin,
      userName: "",
      password: "",
    });
  };
  hide = (e) => {
    this.setState({
      modal: !e,
      // userName:"",
      // password:"",
    });
  };
  payment = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    let select;
    if (this.state.isLogin === false) {
      select = (
        <button
          className="btn btn-primary"
          onClick={() => {
            this.hide();
          }}
        >
          Sign in
        </button>
      );
    } else {
      select = (
        <button className="btn btn-danger" onClick={this.logOut}>
          Sign Out{" "}
        </button>
      );
    }
    console.log("this is subtotal ", this.state.subtotal);
    return (
      <div>
        <div className="header">
          <span className="logo">SCRED.</span>
        </div>
        <ecomContext.Provider
          value={{
            ...this.state,
            handler: this.cart,
            handler2: this.inc,
            handler3: this.dec,
            removebtn: this.remove,
            handler4: this.submit,
            handler5: this.updateUser,
            handler6: this.updatePass,
            handler7: this.hide,
            handler8: this.payment,
          }}
        >
          <BrowserRouter>
            <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/">SCRED.</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/Catalog" className="nav-link">
                    Catalog
                  </Link>
                  <Link to="/Shop" className="nav-link">
                    Shop
                  </Link>
                  <Link to="/Contact" className="nav-link">
                    Contact
                  </Link>
                  <Link to="/shopdata" className="nav-link">
                    items
                  </Link>
                  <Link to="/cart" className="nav-link">
                    Cart ({this.state.subCount})
                  </Link>

                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <Link to="/Shop" className="dropdown-item">
                      Shop
                    </Link>
                    <Link to="/Contact" className="dropdown-item">
                      Contact
                    </Link>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={this.search.bind(this)}
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
                <Link to={"/" | "/Shop" | "/Contact"} className="nav-link">
                  {select}
                </Link>
              </Navbar.Collapse>
            </Navbar>

            {/* <div className="navbars">
          <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
  <a className="navbar-brand" href="#">SCRED.</a>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
     <Link to="/"  className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
      <Link to="/Catalog"  className="nav-link">Catalog</Link>
      </li>
      <li className="nav-item">
      <Link to="/Shop"  className="nav-link">Shop</Link>
      </li>
      <li className="nav-item">
      <Link to="/Contact"  className="nav-link">Contact</Link>
      </li>
      <li className="nav-item">
      <Link to="/shopdata"  className="nav-link">items</Link>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Shop
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link to="/Shop"  className="dropdown-item">Shop</Link>
        <Link to="/Contact"  className="dropdown-item">Contact</Link>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
     
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
</div> */}
            <Route exact path="/" component={Home} />
            <Route path="/Catalog" component={Catalog} />
            <Route path="/Shop" component={Shop} />
            <Route path="/Contact" component={Contact} />
            <Route path="/shopdata" component={Item} />
            <Route path="/cart" component={MyCart} />
            {/* <Route path="/" component={Sign} /> */}
            <Route path={"/" | "/Shop" | "/Contact"} component={Sign} />
          </BrowserRouter>
        </ecomContext.Provider>
      </div>
    );
  }
}
