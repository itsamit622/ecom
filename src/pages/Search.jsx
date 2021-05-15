import React from 'react';



export default class Search extends React.Component{

    render(){
        console.log("search props" , this.props)
        let collections2=""
        if(this.props.result2 !==undefined){
        collections2=this.props.result2.map((values)=>{
            return <div className="col-md-3 mt-4">
            <img className="image" src={values.imageUrl } alt="images" width="600" height="300" />
            <h3 className="text-center menu-item">{values.name}</h3>
             
            </div>
          })
        }
        else{
            collections2=<h1>hello</h1>
        }
        return <div>

            {collections2}
           
        </div>
    }
}