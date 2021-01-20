import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./List";
import { NotificationManager } from "react-notifications"; 
import { api } from "Api";

const Board = (props) => {
  const [addingList, setAddingList] = useState(false);

  const toggleAddingList = () => setAddingList((values) => (values = !values));

  const [list, setList] = useState([]);

  const [width, setWidth] = useState(0);

  const handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        console.log({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
          },
        });
      }
      return;
    }

    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      let payload = {
        sourceListId: parseInt(source.droppableId),
        destListId: parseInt(destination.droppableId),
        oldCardIndex: source.index,
        newCardIndex: destination.index,
        oldTerm: list[parseInt(source.droppableId )- 1].term,
        newTerm: list[parseInt(destination.droppableId) - 1].term,
        ...list[parseInt(source.droppableId) - 1].cards[source.index] 
      };

      //move in state and call Api
      let item = list[parseInt(source.droppableId) - 1].cards[source.index] ; 
      let newList = list; 
      newList[parseInt(source.droppableId) - 1].cards = removeArrayItem(source.index,newList[parseInt(source.droppableId) - 1].cards);
      newList[parseInt(destination.droppableId) - 1].cards.splice(destination.index, 0, item ); 
      setList(newList);
      // console.log({
      //   type: "MOVE_CARD",
      //   payload: payload
      // });
      props.handleMoveCard(payload);
    }
  }; 

  const  removeArrayItem = (index, array) =>  {
    array.splice(index, 1);
    return array;
   }

  useEffect(() => {
    let list = [];
    for (var i = 1; i <= props.educationProgram.totalTerm; i++) {
      list.push({
        listId: i.toString(),
        listTitle: "Học kỳ " + i,
        cards: [],
        term:i
      });
    }

    props.subjectList.map((item, index) => {
      list[item.term - 1].cards.push({
        ...item,
        cardId: index.toString(),
        cardTitle: item.subjectName, 
      });
    });
    console.log(list)
    setList(list);

    let width = 100 / parseInt(props.educationProgram.totalTerm);
    setWidth(width);
  }, [props.subjectList]); 

  return (
    <div className="App">
      <header className="board-header">
        <div className="board-header-container">
          <a
            className="left-button"
            tabIndex={0}
            role="button"
            aria-disabled="false"
            href="/apps/scrumboard/boards/"
          >
            <span className="MuiButton-label">
              <span className="px-8">Kỳ hiện tại</span>
            </span>
            <span className="MuiTouchRipple-root" />
          </a>
          <div className="board-header-content">
            <div className="flex items-center min-w-0">
              <div className="flex items-center justify-center">
                <p className="MuiTypography-root text-16 font-600 cursor-pointer mx-8 MuiTypography-body1 MuiTypography-colorInherit">
                  Kế hoạch giảng dạy
                </p>
              </div>
            </div>
          </div>
          <button className="right-button" tabIndex={0} type="button">
            <span className="MuiIconButton-label">
              <span className="material-icons MuiIcon-root" aria-hidden="true">
                settings
              </span>
            </span>
            <span className="MuiTouchRipple-root" />
          </button>
        </div>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided, _snapshot) => (
            <div className="Board" ref={provided.innerRef}>
              {/* {board.lists.map((listId, index) => { */}
              {list.map((list, index) => {
                return (
                  <List
                    list={list}
                    key={list.listId}
                    width={`calc(${width}% - 20px)`}
                    index={index}
                  />
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
