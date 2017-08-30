import React, {Component} from 'react'
import Header from './DashboardHeader'
import Sidebar from './DashboardSidebar'
import axios from 'axios'
import { Button, Modal, Form, Input, TextArea, Select } from 'semantic-ui-react'

class Dashboard extends React.Component{
	constructor(props) {
		super(props);
		this.state = {account_numbers:'',banks:'',name:'',phone:'',email:'',twitter:'',facebook:'',google:'',password:'',newPassword:'',confirmPassword:'',image:''}
	}
	
	componentDidMount() {
		var self = this;
		 document.title = "Dashboard";
		 var token = localStorage.getItem('token');
		 
		 axios.post('http://localhost:3001/user/authenticate', {
	        token: token
	      })
	      .then(function (response) {
	        console.log(response.data);
	        self.setState({
	        	name:response.data['name'],
	        	phone:response.data['phone'],
	        	email:response.data['email'],
	        	password:response.data['password'],
	        	twitter:response.data['twitter'],
	        	facebook:response.data['facebook'],
	        	google:response.data['google'],
	        	image:response.data['picture'],
	        	banks:response.data['banks'],
	        	account_numbers:response.data['account_numbers']
	        })
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	}

	onUpdate = () =>{
		var token = localStorage.getItem('token');
		axios.post('http://localhost:3001/user/update', {
			token:token,
			name:this.state.name,
        	phone:this.state.phone,
        	email:this.state.email,
        	password:this.state.password,
        	twitter:this.state.twitter,
        	facebook:this.state.facebook,
        	google:this.state.google,
        	picture:this.state.image,
        	banks:this.state.banks,
        	account_numbers:this.state.account_numbers
	      })
	      .then(function (response) {
	        console.log(response.data);
	        window.location.reload()
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	}

	handlePassword = () =>{
		if(this.state.newPassword === this.state.confirmPassword)
		{
			axios.post('http://localhost:3001/user/update', {
	        	password:this.state.newPassword,
		      })
		      .then(function (response) {
		        console.log(response.data);
		        window.location.reload()
		      })
		      .catch(function (error) {
		        console.log(error);
		      });
		}
		else
		{
			alert("Password & Confirm Password not match!")
		}
		
	}

	handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleLogChange = (val,e) => {
        this.setState({[e.name]: e.value});
    }

    handleChangeImage = (evt) => {
	    console.log("Uploading");
	    var self = this;
	    var reader = new FileReader();
	    var file = evt.target.files[0];

	    reader.onload = function(upload) {
	        self.setState({
			    image: upload.target.result
			}, function() {
			    console.log(self.state.image);
			});
	    };
	    reader.readAsDataURL(file);
	}
	handleContextRef = contextRef => this.setState({ contextRef })

	render(){
		const { contextRef } = this.state
		const banks = [
		{key:'c', text:'CIMB BANK BERHAD', value:'cimb'},
		{key:'m', text:'MAYBANK', value:'maybank'},
		{key:'i', text:'BANK ISLAM MALAYSIA BERHAD', value:'bimb'},
		{key:'h', text:'HONG LEONG BANK', value:'hongleong'},
		{key:'r', text:'BANK RAKYAT', value:'bankrakyat'},
		]
		return(
			<div>
			<a href="dashboard.html#" className="dashboard-responsive-nav-trigger"><i className="fa fa-reorder"></i> Dashboard Navigation</a>
				<div>
					<div className="row">
						<div className="col-md-12">
							<h2>My Profile</h2>
							<nav id="breadcrumbs">
								<ul>
									<li><a href="dashboard-my-profile.html#">Home</a></li>
									<li><a href="dashboard-my-profile.html#">Dashboard</a></li>
									<li>My Profile</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>

				<div className="row">

					<div className="col-lg-6 col-md-12">
						<div className="dashboard-list-box margin-top-0">
							<h4 className="gray">Profile Details</h4>
							<div className="dashboard-list-box-static">
							<br/><br/>
								<div className="edit-profile-photo">
									<img src={this.state.image} alt="" width="80" height="300"/>
									<div className="change-photo-btn">
										<div className="photoUpload">
										    <span><i className="fa fa-upload"></i> Upload Photo</span>
										    <input type="file" className="upload" onChange={this.handleChangeImage}/>
										</div>
									</div>
								</div>

								<div className="my-profile">
									<Form size='small'>
										<label>Your Name</label>
										<input name="name" value={this.state.name} onChange={this.handleChange} type="text"/>

										<label>Phone </label>
										<input name="phone" value={this.state.phone} onChange={this.handleChange} type="text"/>

										<label>Email</label>
										<input name="email" value={this.state.email} onChange={this.handleChange} type="text"/>

										<label><i className="fa fa-twitter"></i> Twitter</label>
										<input name="twitter" type="text" value={this.state.twitter} onChange={this.handleChange}/>

										<label><i className="fa fa-facebook-square"></i> Facebook</label>
										<input name="facebook" type="text" value={this.state.facebook} onChange={this.handleChange}/>

										<label><i className="fa fa-google-plus"></i> Google+</label>
										<input name="google" type="text" value={this.state.google} onChange={this.handleChange}/>
								      </Form>
								</div>
								<center><button className="button margin-top-15" onClick={this.onUpdate}>Update Profile</button></center>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-md-12">
						<div className="dashboard-list-box margin-top-0">
							<h4 className="gray">Payment Option</h4>
							<div className="dashboard-list-box-static">

								<div className="my-profile">
								<Form size='small'>
									<label className="margin-top-0">Bank</label>
									<Form.Select placeholder='Select bank' name='banks' value={this.state.banks} options={banks} onChange={this.handleLogChange}/>

									<label>Account Number</label>
									<input value={this.state.account_numbers} name="account_numbers" type="text" onChange={this.handleChange}/>
								</Form>
									<center><button className="button margin-top-15" onClick={this.onUpdate}>Save</button></center>
								</div>

							</div>
						</div>
					</div>
					<p></p>
					<div className="col-lg-6 col-md-12">
						<div className="dashboard-list-box margin-top-0">
							<h4 className="gray">Change Password</h4>
							<div className="dashboard-list-box-static">

								<div className="my-profile">
								<Form size='small'>
									<label className="margin-top-0">Current Password</label>
									<input type="text" value={this.state.password} disabled/>

									<label>New Password</label>
									<input name="newPassword" type="password" onChange={this.handleChange}/>

									<label>Confirm New Password</label>
									<input name="confirmPassword" type="password" onChange={this.handleChange}/>
								</Form>
									<center><button className="button margin-top-15" onClick={this.handlePassword}>Change Password</button></center>
								</div>

							</div>
						</div>
					</div>

					<div className="col-md-12">
						<div className="copyrights"></div>
					</div>

				</div>
			</div>
			)
	}
}

export default Dashboard