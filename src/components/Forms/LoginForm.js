import React from 'react'
import {FormGroup, Input, Label} from "reactstrap";
import classNames from 'classnames'


export const renderForm = ({input,type,placeholder,spanIcon,meta:{error}})=>{
    return(<FormGroup className="has-wrapper">
        <Input {...input} type={type} placeholder={placeholder}  className="has-input input-lg" required/>
        <span className="has-icon"><i className={spanIcon}></i></span>
    </FormGroup>)
};
