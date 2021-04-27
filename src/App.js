import React from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Item from "./pages/Item";
import productsData from "./data/products.json";
import { ecomContext } from "./pages/Context";
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
    subtotal:0
    
  };
  cart = (e, oldId) => {
    console.log("hellocall", e, oldId);
    
    let targetItem ;
    this.state.products.every(function (single) {
      targetItem = single.items.find((singleItem) => {
        if (singleItem.id === oldId) {
          return true;
        } else {
          return false;
        }
      });
      if (targetItem !== undefined  ) {
        return false;
      }
      return true;
    });
    
    targetItem.count=1
    this.state.carts.push({...targetItem});
    this.setState(this.state);
    console.log("target item" ,targetItem)

    console.log("carts", this.state.carts);
  };
  inc=(id)=>{
    console.log("id" ,id)
    let tempCart=[...this.state.carts];
    let selectedProducts=tempCart.find(item=>item.id===id);
    let index=tempCart.indexOf(selectedProducts);
    let product=tempCart[index];
     product.count =product.count + 1
    // product.total =parseInt(product.price) * product.count
   
   this.setState({
     carts :[...tempCart]
   })
   console.log("pro" , product)


  }
  dec=(id)=>{
    console.log("id" ,id)
    let tempCart=[...this.state.carts];
    let selectedProducts=tempCart.find(item=>item.id===id);
    let index=tempCart.indexOf(selectedProducts);
    let product=tempCart[index];
     product.count =product.count - 1
   product.total=parseInt(product.price) * product.count
   this.setState({
     carts :[...tempCart],
   })
   
   console.log("pro" , product)


  }

  render() {
    return (
      <div>
        <div className="header">
          <span className="logo">SCRED.</span>
        </div>
        <ecomContext.Provider value={{ ...this.state, handler: this.cart ,handler2:this.inc , handler3:this.dec }}>
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
                    Cart ({this.state.carts.length})
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
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
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
          </BrowserRouter>
        </ecomContext.Provider>
      </div>
    );
  }
}
