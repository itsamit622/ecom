import { event } from 'jquery';
import React from 'react';
import { Button, Container, Form, Modal ,Row ,Col } from 'react-bootstrap';
import {ecomContext} from './pages/Context'

export default class Sign extends React.Component{
    static contextType = ecomContext;
 
     submitHandler=()=>{
       this.context.handler4()
       console.log("" )
     }
     changeUser=(event)=>{
       this.context.handler5(event.target.value)
     }
     changePass=(event)=>{
       this.context.handler6(event.target.value)
     }
    // handleModal = () => {

    //   this.setState({
    //     isValue: !this.state.isValue
    //   })
    // }
    hideme=()=>{
      this.context.handler7(this.context.modal)
    }
    render(){
   
      
        return <div>
         
              <Container>
                <Modal show={this.context.modal}  onHide={this.hideme}>
                  <Modal.Header closeButton> <h3 className="text-primary"> Welcome to SCRED. </h3> <br />
              
                  </Modal.Header>
                  <Modal.Body>
                    <Form >
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                          Username*
    </Form.Label>
                        <Col sm="10">
                          <Form.Control placeholder="Enter your name" value={this.context.userName} onChange={this.changeUser}/>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} >
                        <Form.Label column sm="2">
                          Password*
    </Form.Label>
                        <Col sm="10">
                          <Form.Control type="password" placeholder="Password" value={this.context.password} onChange={this.changePass} />
                        </Col>
                      </Form.Group>
                     <p>By continuing, you agree to SCRED.'s Terms of Use and Privacy Policy.</p>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>

                    <Button onClick={() => { this.hideme();this.submitHandler() }}>
                      Login
  </Button>
                  </Modal.Footer>
                </Modal>
              </Container>
          
        </div>
    }
}