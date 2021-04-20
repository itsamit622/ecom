import React from 'react';



 export default class Contact extends React.Component{

    render(){

    return <div>
    <div className="container">
    <div className="row">
      <div className="col-4">

        <h3>Call to Us:</h3>
        <p>We are available from 10am to 10pm EST</p>
        <h6>Costumer Service:</h6>
        <p>9888650343</p> <br/> <br/>
        <h3>Write to Us:</h3>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <h6>Costumer Service:</h6>
        <p>customer@example.com</p>
        <br/> <br/>
        <h3>Find Us:</h3>
        Want to visit our Offline Stores?
      </div>
      <div className="col-8">
          <h1>Contact Us</h1>
      <div className="container">
        <form>
          <div className="form-group">
            <label for="Name">Name</label>
            <input type="text" className="form-control" id="Name" aria-describedby="emailHelp" placeholder="Enter your name" />
          </div>
          <div className="form-group">
          <label for="Email">Email </label>
            <input type="email" className="form-control" id="Email" placeholder="Enter your Email Address" />
          </div>
          <div className="form-group">
            <label for="text">Title </label>
            <input type="text" className="form-control" id="Email" placeholder="Title" />
          </div>
          <div className="form-group">
            <label for="Massage">Massage</label>
            <textarea className="form-control" rows="5" id="Massage"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>
      </div>
    </div>
    </div>
    </div>
    }
}