import React from 'react'
import Itemlist from './Itemlist'
import { Route} from "react-router-dom"
import  Itemcollection from './Itemcollection'
import Itemvalues from './Itemvalues'




export default class  Item extends React.Component{


    render(){
        console.log(this.props.match.params)

        return <div>

            <Route  path={this.props.match.path } exact component={Itemlist}/>
            <Route  path ={this.props.match.path +"/:id"}  exact component ={Itemcollection}/> 
            <Route     path ={this.props.match.path +"/:name/:id"} component ={Itemvalues}/>
              
           
            

        </div>
    }
}
