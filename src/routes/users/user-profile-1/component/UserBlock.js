/**
 * User Block
 */
import React, { Component } from 'react';
import {connect} from "react-redux";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {fetchUserDetails} from "Actions";
import {SERVER_PATH} from "Actions/types";

class UserBlock extends Component {

    componentDidMount(){
        const {user_id}=this.props;
        if(user_id){
            this.props.fetchUserDetails(user_id);
        }
    }
    render() {
        const {userData} = this.props;

        return (
            <div className="profile-top mb-20">
                {userData ?  <div>
                    <img src={require('Assets/img/profile-bg.jpg')} alt="profile banner" className="img-fluid" width="1920" height="345" />
                    <div className="profile-content">
                        <div className="media">
                            {(userData.profilePic !== null) ?  <img src={`${SERVER_PATH}${userData.profilePic.url}`} alt="user profile" className="rounded-circle mr-30 bordered" width="140" height="140" />:
                                <img src={require('Assets/img/profileLogo.png')} alt="user profile" className="rounded-circle mr-30 bordered bg-light" width="140" height="140" /> }
                            <div className="media-body pt-25">
                                <div className="mb-20">
                                    <h2>{userData.firstName+" "+userData.lastName}</h2>
                                    <p>{userData.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:
                    <div className="container">
                        <RctPageLoader/>
                    </div>
                }

            </div>        );
    }
}

const mapStateToProps = state =>({
    ...state.auth
});
export default connect(mapStateToProps,{
    fetchUserDetails
})(UserBlock);
