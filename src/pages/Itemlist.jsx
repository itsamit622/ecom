import React from 'react'
import {Link} from "react-router-dom"
import { Container , Row } from 'react-bootstrap';
import productsData from '../data/products.json';
import {ecomContext} from './Context'

export default class Itemlist extends React.Component{
   static contextType = ecomContext;
  
    state={
       shopdata : this.context.products,
       
    };
    
     Getlinks(){
       let LinkTags = this.state.shopdata.map((values,i)=>{
      let UserTag=   
           <div className="col-md-3 mt-4">
           <Link key={i} to={this.props.match.path+"/"+ values.routeName}>
           <img className="image" src={values.imageUrl } alt="images" width="600" height="300" />
           <h3 className="text-center menu-item">{values.title}</h3>
             </Link>
           </div>
      
       return UserTag
          
    }
       )
       return LinkTags  
 }

    render(){

       console.log("filterv", this.filtered )
     
       
       return <>
        <div className="p-3 mb-2 bg-primary text-white text-center">
         <h5> COLLECTIONS</h5>
      </div>
        <Container>
        <Row>
         {/* <ul style={{display:"inline-flex" ,listStyle:"none"}} >{this.Getlinks()}</ul> */}
         {this.Getlinks()}
         </Row>
        </Container>

        </>
    }
}