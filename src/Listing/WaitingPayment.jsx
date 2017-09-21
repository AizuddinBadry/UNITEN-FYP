import React from 'react'
import axios from 'axios'
import { Button, Form, Modal, Icon, Header } from 'semantic-ui-react'

class WaitingPayment extends React.Component{
	constructor(props) {
		super(props);
		this.state = {bill_id:'',paid:false,phone:'',listing_title:'',customer_number:'',open:false}
	}

	componentWillReceiveProps(props) {
		var self = this;
		self.setState({bill_id:props.bill_id, phone:props.phone, listing_title:props.listing_title, open:props.open, customer_number:props.customer_number})
	}

	componentDidMount() {
		var self = this;
		self.retrieveBill()
	}

	retrieveBill = () =>{
		var self = this;
		axios.post('http://localhost:3001/transaction/get_bill',{
     	id: self.state.bill_id
	     })
	        .then(function (response) {
	          if(response.data === null)
	          {
	          	self.retrieveBill()
	          }
	          else if(response.data === false)
	          {
	          	self.retrieveBill()
	          }
	          else if(response.data === true)
	          {
	          	self.setState({paid:response.data})
		          	axios.post('http://localhost:3001/listing/hire',{
				     	number_to_send_to:"+6"+self.state.phone,
				     	job_names:self.state.listing_title,
				     	customer_number:self.state.customer_number
					     })
					        .then(function (response) {
					          console.log(response.data);
					        })
					        .catch(function (error) {
					          console.log(error);
					        });
				}
					        })
			        .catch(function (error) {
			          console.log(error);
			     });
				}
	close = () => this.setState({ open: false })
	render(){
		var {dimmer, bill_id} = this.props;
		var {paid, open} = this.state;
		return(
			<Modal size='small' dimmer={dimmer} open={open}>
	          <Modal.Header>Payment Confirmation</Modal.Header>
	          <Modal.Content>
	            <Modal.Description>
			     <Form>
				   <center>
				   {paid ? 
				   	<div>Payment successful. Thank you!<br/><Button color='green' onClick={this.close}>Finish</Button></div> : 
				   	'Please wait.. Waiting for payment..'
				   }
				   </center>
	              </Form>
	            </Modal.Description>
	          </Modal.Content>
		    </Modal>
			)
	}
}

export default WaitingPayment;