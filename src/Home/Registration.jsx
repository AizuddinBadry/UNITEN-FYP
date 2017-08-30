import React,{Component} from 'react';
import axios from 'axios'


class Registration extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {name: '', phone: '', email: '', password:''};
	    this.onName = this.onName.bind(this);
	    this.onPhone = this.onPhone.bind(this);
	    this.onEmail = this.onEmail.bind(this);
	    this.onPassword = this.onPassword.bind(this);
	    this.onCreate = this.onCreate.bind(this);
	}
	onName(event){
		var self = this;
		self.setState({name:event.target.value})
	}
	onPhone(event){
		var self = this;
		self.setState({phone:event.target.value})
	}
	onEmail(event){
		var self = this;
		self.setState({email:event.target.value})
	}
	onPassword(event){
		var self = this;
		self.setState({password:event.target.value})
	}

	onCreate(){
		var self = this;
		var name = self.state.name;
	    var phone = self.state.phone;
	    var email = self.state.email;
	    var password = self.state.password;

		axios.post('http://localhost:3001/user/register', {
		    name: name,
		    phone: phone,
		    email: email,
		    password: password,
		  })
		  .then(function (response) {
		    console.log(response);
		    alert("Success! Please Login")
		    window.location = '/login'
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
	render(){
		return(
			<div>
			<div className="wrapper">
				<center>
					<div className="container">
						<h1>Registration</h1>
						
						<div className="main-search-input gray-style margin-top-50 margin-bottom-10">
							<div className="main-search-input-item">
								<input type="text" placeholder="Your name" value={this.state.name} onChange={this.onName}/>
							</div>
						</div>
						<div className="main-search-input gray-style margin-top-50 margin-bottom-10">
							<div className="main-search-input-item">
								<input type="text" placeholder="Phone" value={this.state.phone} onChange={this.onPhone}/>
							</div>
						</div>
						<div className="main-search-input gray-style margin-top-50 margin-bottom-10">
							<div className="main-search-input-item">
								<input type="text" placeholder="Email" value={this.state.email} onChange={this.onEmail}/>
							</div>
						</div>
						<div className="main-search-input gray-style margin-top-50 margin-bottom-10">
							<div className="main-search-input-item">
							<input type="password" placeholder="password" value={this.state.password} onChange={this.onPassword}/>
						</div>
						</div>
							<button type="submit" className="button" onClick={this.onCreate}>Register</button><br/>
					</div>
				</center>
			</div>
			</div>
			)
	}
}

export default Registration