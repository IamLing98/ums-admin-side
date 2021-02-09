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
import { socketsSubscribe,socketsConnect } from "../../store/actions/WebSocketsActions";
import { useDispatch, useSelector } from "react-redux";

// api
import { api } from "Api";
const Notifications = (props) => {
  const dispatch = useDispatch();
  const webSocketReducer = useSelector((state) => state.webSocketReducer);
  const [notifications, setNotifications] = useState([]);

  const [notReadNumber, setNotReadNumber] = useState(0);

  const [subscriptionActive, setSubscriptionActive] = useState(false);

  useEffect(() => {
    dispatch(socketsConnect());
  }, []);
  const socketLink = () => {
    console.log("wsreducer:", webSocketReducer);
    const { connected } = webSocketReducer;
    console.log("CONNECT", connected);
    if (connected && ! subscriptionActive) {
      dispatch(socketsSubscribe("/hello"));
      setSubscriptionActive(true);
    }

    if (connected && subscriptionActive) {
      return (
      
            <a href="#">{webSocketReducer.message}</a>
          
      );
    }

    return null;
  };

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);
  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err(
        "Did you forget something? Please activate your account"
      );
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  // get notifications
  const getNotifications = () => {
    api
      .get("/notifications")
      .then((res) => {
        setNotifications(res.notifications);
        setNotReadNumber(res.notRead);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const setToogle = () => {
    if (isShow === false) {
      setNotReadNumber(0);
      setReadNotifications();
    } else {
      getNotifications();
    }
    setIsShow((isShow) => (isShow = !isShow));
  };

  const setReadNotifications = () => {
    let ids = [];
    for (var i = 0; i < notifications.length; i++) {
      ids.push(notifications[i].seqId);
    }
    setNotReadNumber(0);
    api
      .put("/notifications", ids)
      .then((res) => console.log("update: ", res))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Dropdown
      nav
      className="list-inline-item notification-dropdown"
      isOpen={isShow}
      toggle={setToogle}
    >
      <DropdownToggle nav className="p-0">
        <Tooltip title="Thông báo" placement="bottom">
          <IconButton className="" aria-label="bell">
            <i className="zmdi zmdi-notifications-active"></i>
            <Badge
              color="danger"
              className="badge-xs badge-top-right rct-notify"
            >
              {notReadNumber}
            </Badge>
          </IconButton>
        </Tooltip>
      </DropdownToggle>
      <DropdownMenu right>
        {socketLink()}
        <div className="dropdown-content">
          <div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
            <span className="text-white font-weight-bold">
              <span>Thông báo</span>
            </span>
            <Badge color="warning">{notReadNumber} thông báo mới</Badge>
          </div>
          <Scrollbars
            className="rct-scroll"
            autoHeight
            autoHeightMin={100}
            autoHeightMax={280}
          >
            <ul className="list-unstyled dropdown-list">
              {notifications &&
                notifications.map((notification, key) => (
                  <li
                    key={"notification" + key}
                    style={
                      notification.status === 1 ? { background: "#ECEFF1" } : {}
                    }
                  >
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
                          <h5 className="mb-5 text-primary">
                            {notification.senderUsername === "system"
                              ? "Hệ thống"
                              : notification.senderUsername}
                          </h5>
                          <span className="text-muted fs-12">
                            {moment(notification.createdDate).format(
                              "mm:hh-MM/DD/YYYY"
                            )}
                          </span>
                        </div>
                        <span className="text-muted fs-12 d-block">
                          {notification.content}
                        </span>
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
          <Button
            variant="contained"
            color="primary"
            className="mr-10 btn-xs bg-primary"
          >
            <span>Xem tất cả</span>
          </Button>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Notifications;
