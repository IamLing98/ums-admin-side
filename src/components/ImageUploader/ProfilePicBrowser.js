import React from 'react';
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardImg from "reactstrap/es/CardImg";
import {SERVER_PATH} from "Actions/types";
import {Button} from "reactstrap";
import {profilePicDelete} from "Actions/AddUserActions";
import {connect} from "react-redux";
const mapDispatchToProps = {
    profilePicDelete
};
class ProfilePicBrowser extends React.Component{


    onDelete(e){
        const {ProfilePic} = this.props;
        return this.props.profilePicDelete(`/images/${ProfilePic.id}`)
    }

    render() {
        const {ProfilePic} = this.props;
        return(<div>
            {ProfilePic &&  <Card>
                <CardBody>
                    <CardImg src={`${SERVER_PATH}${ProfilePic.url}`} top width="100%" alt="Profile Pic"/>
                </CardBody>
                <Button onClick={this.onDelete.bind(this)} color="warning" outline>Remove</Button>
            </Card>}
        </div>)
    }
}

export default connect(null,mapDispatchToProps)(ProfilePicBrowser);