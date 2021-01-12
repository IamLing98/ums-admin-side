import React, { useState, useEffect } from "react";
import { api } from "Api";
import RoomList from "./RoomList";
import RoomCreate from "./RoomCreate";
import RoomUpdate from "./RoomUpdate";
import { Button, Popconfirm, Space } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { NotificationManager } from "react-notifications";

const RoomConfigHome = (props) => {
  const [roomList, setRoomList] = useState([]);

  const [pageStatus, setPageStatus] = useState(1);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const handleCreateNewRoom = (values) => {
    api
      .post(`/rooms`, values)
      .then((res) => {
        NotificationManager.success("Tạo mới thành công");
        getListRooms();
        setPageStatus(1);
      })
      .catch((error) => {
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  const handleUpdateRoom = (values) => {
    api
      .put(`/rooms/${values.roomId}`, values)
      .then((res) => {
        NotificationManager.success("Cập nhật thành công");
        getListRooms();
        setPageStatus(1);
      })
      .catch((error) => {
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  const handleDeleteRoom = (values) => {
    api
      .delete(`/rooms/${values.roomId}`)
      .then((res) => {
        NotificationManager.success("Xoá thành công");
        getListRooms();
        setPageStatus(1);
      })
      .catch((error) => {
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  const getListRooms = () => {
    api
      .get("/rooms", true)
      .then((res) => {
        setRoomList(res);
      })
      .catch((err) => {
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };
  useEffect(() => {
    getListRooms();
  }, []);

  const columns = [
    {
      title: "Mã giảng đường ",
      dataIndex: "roomId",
    },
    {
      title: "Sức chứa ",
      dataIndex: "numberOfSeats",
    },
    {
      title: "Loại giảng đường",
      dataIndex: "isLab",
      render: (text) => {
        if (text === 0) return <span>Thường</span>;
        else if (text === 1) return <span>Phòng máy</span>;
      },
    },
    {
      title: "Thao Tác",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              setRecordUpdate(record);
              setPageStatus(3);
            }}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => handleDeleteRoom(record)}
            okText="Ok"
            cancelText="Không"
          >
            <Button type="">
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <RoomList
        columns={columns}
        roomList={roomList}
        setPageStatus={setPageStatus}
      />
      <RoomCreate
        visible={pageStatus === 2 ? true : false}
        setPageStatus={setPageStatus}
        handleCreateNewRoom={handleCreateNewRoom}
      />
      {pageStatus === 3 && (
        <RoomUpdate
          visible={pageStatus === 3 }
          setPageStatus={setPageStatus}
          recordUpdate={recordUpdate}
          handleUpdateRoom={handleUpdateRoom}
          setRecordUpdate={setRecordUpdate}
        />
      )}
    </>
  );
};

export default RoomConfigHome;
