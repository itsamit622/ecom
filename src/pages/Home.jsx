import React from 'react'


export default class App extends React.Component {
    objects = [
        {
            id: 1,
            name:"Leather mid-heel Sandals",
            price:"$129.00",
            url: "images/product.jpg",
        },
        {
            id: 2,
            name:"Cotton floral print Dress",
            price:"$40.00",
            url: "images/product2.jpg",
        },
        {
            id: 3,
            name:"Leather Sneakers",
            price:"$85.00",
            url: "images/product3.jpg",
        },
        {
            id: 4,
            name:"Cropped cotton Top",
            price:"$29.00",
            url: "images/product4.jpg",
        },

    ]
     
    
    
    state={

        count:1
    }
    
    
        componentDidMount(){
            
            this.reference= setInterval(()=>{ 
                if(this.state.count>2){
                    this.setState({
                        count:1
                    })
                }
                else{
                this.setState({
                    count:this.state.count +1
                }) 
            }
        
        
            }, 3000);
        }
        componentWillUnmount(){
            clearInterval(this.reference)
        }
    render() {
       
     
        let images = this.objects.map(function (values) {

            return <div className="col-md-3 col-sm-6"  key={values.id}>
                <img className="img-fluid" src={values.url} alt="images" />
                <h6 >{values.name}</h6><p >{values.price}</p></div>

        }
        )
        console.log(images);
        return <div>

            <img src={"/images/poster" + this.state.count+ ".jpg" } alt="banner" height="550px" width="100%" />
            <br /> <br />
            <div className="header-1 mb-5">
                <h6 className="h6">TOP SELLING</h6>
                <h2>Top wekeend Sellers</h2>
            </div>
            <div className="container ">
              <div className="row">

{images}
              </div>
              
            </div>

         








        </div>
    }
}



