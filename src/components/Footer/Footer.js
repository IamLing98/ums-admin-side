/**
 * Footer
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// app config
import AppConfig from 'Constants/AppConfig';

const Footer = () => (
	<div 
	className="rct-footer d-flex justify-content-between align-items-center"
	style={{position: "absolute",
		bottom: "20px",
		width: "100%", 
	}}
	 >
		<h5   className="mb-0" style={{margin:"auto"}}>Phuong Dong ERP © 2020 All Rights Reserved.</h5>
	</div>
);

export default Footer;
