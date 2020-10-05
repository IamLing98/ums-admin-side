
import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./List"; 

class Board extends Component {
  state = {
    addingList: false,
  };

  toggleAddingList = () =>
    this.setState({ addingList: !this.state.addingList });

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    const { dispatch } = this.props;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
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
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        },
      });
    }
  };

  componentDidMount() {}

  render() { 
    const list = [];
    for (var i = 1; i <= this.props.detail.totalTerm; i++) {
      list.push({
        listId: i.toString(),
        listTitle: "Học kỳ " + i,
        cards: [],
      });
    }
    this.props.detail.subjectList.map((item, index)=>{
      list[item.term - 1].cards.push({
        cardId: index.toString(),
        cardTitle: item.subjectName
      });
    });
    console.log(list);
    const width = 100/parseInt(this.props.detail.totalTerm);
    return (
      <div className="App">
        <div className="Header">Kế hoạch đào tạo</div>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="COLUMN">
            {(provided, _snapshot) => (
              <div className="Board" ref={provided.innerRef}>
                {/* {board.lists.map((listId, index) => { */}
                {list.map((list, index) => {
                  return <List list={list} key={list.listId}  width={`calc(${width}% - 20px)`} index={index} />;
                })}

                {provided.placeholder}
 
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ board: state.board });

export default connect(mapStateToProps)(Board);
