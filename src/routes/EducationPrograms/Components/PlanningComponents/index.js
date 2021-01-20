import React, { useEffect, useState } from "react";
// import Board from '@lourenci/react-kanban'
// import '@lourenci/react-kanban/dist/styles.css'
import { NotificationManager } from "react-notifications";
import Board from "./Board";
import { api } from "Api";

// const board = {
//   columns: [
//     {
//       id: 1,
//       title: "Kỳ 1",
//       cards: [
//         {
//           id: 1,
//           title: "Kỳ 1",
//           description: "Add capability to add a card in a column",
//         },
//       ],
//     }, 
//   ],
// };

const Planning = (props) => {
  const [subjectList, setSubjectList] = useState([]);

  const showErrNoti = (err) => {
    NotificationManager.err(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err(
        "Did you forget something? Please activate your account"
      );
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const getSubjectList = () => {
    api
      .get(
        `/education-program-subject?educationProgramId=${props.educationProgram.educationProgramId}&in=true`,
        true
      )
      .then((res) => {
        setSubjectList(res);
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };

  const handleMoveCard = (payload) => {
    console.log(payload);
    let values = { ...payload, term: payload.newTerm };
    api
      .put(
        `/education-program-subject/${props.educationProgram.educationProgramId}/${payload.subjectId}`,
        values,
        true
      )
      .then((res) => {
        getSubjectList();
        NotificationManager.success("Thay đổi thành công!!!");
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };

  useEffect(() => {
    console.log(props.educationProgram);
    getSubjectList();
  }, []);

  return (
    <>
      {" "}
      <Board
        educationProgram={props.educationProgram}
        subjectList={subjectList}
        handleMoveCard={handleMoveCard}
      />
    </>
  );
};

export default Planning;
