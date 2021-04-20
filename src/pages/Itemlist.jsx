import React from 'react'
import {Link} from "react-router-dom"
import { Container , Row } from 'react-bootstrap';
import productsData from '../data/products.json';

export default class Itemlist extends React.Component{

    state={
       shopdata : productsData

    };
 
     Getlinks(){
       let LinkTags = this.state.shopdata.map((values,i)=>{

      //  let UserTag=   <Link key={i} to={this.props.match.path+"/"+ values.routeName}><div className="main">
      //    <img className="image" src={values.imageUrl } width="300" height="400" />
      //      <h3 className="text-center menu-item">{values.title}</h3></div></Link>
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

        console.log("path",this.props.match.path)
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