import React from 'react'
import logo from 'Assets/images/logo.png'


class Footer extends React.Component{
	render(){
		return(
			<div id="footer" className="sticky-footer">
			  <div className="container">
			    <div className="row">
			      <div className="col-md-12 col-sm-12">
			        <center><img className="footer-logo" src={logo} alt=""/></center>
			      </div>
			    </div>
			    <div className="row">
			      <div className="col-md-12">
			        <div className="copyrights"></div>
			      </div>
			    </div>

			  </div>
			</div>
			)
	}
}
export default Footer;