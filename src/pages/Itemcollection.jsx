import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import {Link} from "react-router-dom"
import productData from '../data/products.json';




export default class Itemcollection extends React.Component{
    state={
        shopdata :productData
 
     };
     
    render(){
      
        console.log("id" , this.props.match)
let i = this.props.match.params.id
console.log("id" , i)
let filerted = this.state.shopdata.find(function(usersvalues) {
  
    if (usersvalues.routeName === i) {
      return true;
    }
    else {
      return false;
    }

    
  })
  console.log("filter",filerted)
//   let bItem = filerted.map((values)=>{
//       return values.items
//   })
//  console.log("bitem ", bItem) 
//  let bItem2=bItem.filter((values)=>{

//  })
//   let bTitle = filerted.map((values)=>{
//     return <div>{values.title}</div>
// })
  let collections = filerted.items.map((values)=>{
      return <Col md="4"> 
        
           <Link  to={ this.props.match.url +"/"+values.id }>
          <img src={values.imageUrl} alt="sf" width="250" height="300"/>
          <div className="ml-5">{values.name} {values.price}</div>
          </Link>
      </Col>
          })
  
 

        return <>
        <div>
       
          <h2 className="p-3 mb-2 bg-primary text-white text-center"><div>{filerted.title}</div></h2>
       
        
        <div >
            
          
           {/* <ul style={{display:"inline-flex" ,listStyle:"none"}}> */}
           <Container>
              <Row>
              {collections}

              </Row>
           </Container>
           {/* </ul> */}
           </div>
        </div>
        </>
    }
}