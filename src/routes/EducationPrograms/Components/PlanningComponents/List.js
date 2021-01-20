import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "./Card";

import shortid from "shortid";

const List = (props) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => setState({ addingCard: !state.addingCard });

  const addCard = async (cardText) => {
    const { listId, dispatch } = props;

    toggleAddingCard();

    const cardId = shortid.generate();

    console.log({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId },
    });
  };

  const toggleEditingTitle = () => setEditingTitle((value) => (value = !value));

  const handleChangeTitle = (e) => setState({ title: e.target.value });

  const editListTitle = async () => {
    const { listId, dispatch } = props;
    const { title } = state;

    toggleEditingTitle();

    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title },
    });
  };

  const deleteList = async () => {
    const { listId, list, dispatch } = props;

    dispatch({
      type: "DELETE_LIST",
      payload: { listId, cards: list.cards },
    });
  };

  const { list, index } = props;
  return (
    <Droppable droppableId={list.listId} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
          style={{ width: props.width }}
        >
          <div className="List-Title">{list.listTitle}</div>

          <Droppable droppableId={list.listId}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef}>
                {list.cards &&
                  list.cards.map((card, index) => (
                    <Card
                      key={card.cardId}
                      card={card}
                      index={index}
                      listId={list.listId}
                    />
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Droppable>
  );
};

export default List;
