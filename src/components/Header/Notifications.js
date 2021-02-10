/**
 * Notification Component
 */
import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Badge } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { NotificationManager } from "react-notifications";
import { getListNotifications, setReadNotifications } from "../../store/actions/NotificationActions";
import { socketsSubscribe } from "../../store/actions/WebSocketsActions";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
// api
import { api } from "Api";
const Notifications = (props) => {
  const dispatch = useDispatch();

  const notificationsReducer = useSelector((state) => state.notificationsReducer);

  const webSocketReducer = useSelector((state) => state.webSocketReducer);

  const [isShow, setIsShow] = useState(false);

  const setToogle = () => {
    if (isShow === false) {
      setReadNotification();
    } else {
      dispatch(getListNotifications());
    }
    setIsShow((isShow) => (isShow = !isShow));
  };

  // socketLink = () => {
  //   const { connected } = this.props.webSocketReducer;
  //   if (connected && !this.state.subscriptionActive) {
  //     this.props.socketsSubscribe("/user/queue/greetings");
  //     this.setState({ ...this.state, subscriptionActive: true });
  //   }

  //   if (connected && this.state.subscriptionActive) {
  //     let messageModel = this.props.webSocketReducer.message;
  //     if(messageModel ){
  //         if(messageModel.username = 'SSOFF'){
  //             console.log("ccc")
  //             this.props.getListNotifications()
  //         }
  //     }
  //     return messageModel;
  //   }

  //   return null;
  // };
  const setReadNotification = () => {
    let ids = [];
    for (var i = 0; i < notificationsReducer.notifications.length; i++) {
      ids.push(notificationsReducer.notifications[i].seqId);
    }
    dispatch(setReadNotifications(ids));
  };

  useEffect(() => {
    dispatch(getListNotifications());
    if(webSocketReducer.connected ){
      dispatch(socketsSubscribe("/user/queue/greetings"));
    }
  }, [webSocketReducer.connected ]);

  return (
    <Dropdown nav className="list-inline-item notification-dropdown" isOpen={isShow} toggle={setToogle}>
      <DropdownToggle nav className="p-0">
        <Tooltip title="Thông báo" placement="bottom">
          <IconButton className="" aria-label="bell">
            <i className="zmdi zmdi-notifications-active"></i>
            <Badge color="danger" className="badge-xs badge-top-right rct-notify">
              {notificationsReducer ? notificationsReducer.notReadNumber : 0}
            </Badge>
          </IconButton>
        </Tooltip>
      </DropdownToggle>
      <DropdownMenu right>
        <div className="dropdown-content">
          <div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
            <span className="text-white font-weight-bold">
              <span>Thông báo</span>
            </span>
            <Badge color="warning">{notificationsReducer ? notificationsReducer.notReadNumber : 0} thông báo mới</Badge>
          </div>
          <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280}>
            <ul className="list-unstyled dropdown-list">
              {notificationsReducer &&
                notificationsReducer.notifications.map((notification, key) => (
                  <li key={"notification" + key} style={notification.status === 1 ? { background: "#ECEFF1" } : {}}>
                    <div className="media">
                      {/* <div className="mr-10">
                        <img
                          src={notification.content}
                          alt="user profile"
                          className="media-object rounded-circle"
                          width="50"
                          height="50"
                        />
                      </div> */}
                      <div className="media-body pt-5">
                        <div className="d-flex justify-content-between">
                          <h5 className="mb-5 text-primary">{notification.senderUsername === "system" ? "Hệ thống" : notification.senderUsername}</h5>
                          <span className="text-muted fs-12">{moment(notification.createdDate).format("hh:mm MM/DD/YYYY")}</span>
                        </div>
                        <span className="text-muted fs-12 d-block">{parse(notification.content)}</span>
                        {/* <Button className="btn-xs mr-10">
                          <i className="zmdi zmdi-mail-reply mr-2"></i>{" "}
                          <span>Trả lời</span>
                        </Button>
                        <Button className="btn-xs">
                          <i className="zmdi zmdi-thumb-up mr-2"></i>{" "}
                          <span>Thích</span>
                        </Button> */}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </Scrollbars>
        </div>
        <div className="dropdown-foot p-2 bg-white rounded-bottom">
          <Button variant="contained" color="primary" className="mr-10 btn-xs bg-primary">
            <span>Xem tất cả</span>
          </Button>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Notifications;
