import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import CardEditor from "./CardEditor";

const Card = (props) => {
  const [hover, setHover] = useState(false);

  const [editing, setEditing] = useState(false);

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);

  const startEditing = () => {
    setHover(false);
    setEditing(true);
  };

  const endEditing = () => setState({ hover: false, editing: false });

  const editCard = async (text) => {
    const { card, dispatch } = props;

    endEditing();

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text },
    });
  };

  const deleteCard = async () => {
    const { listId, card, dispatch } = props;

    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId },
    });
  };

  const { card, index } = props;

  if (!editing) {
    return (
      <Draggable draggableId={card.cardId} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="Card"
            onMouseEnter={startHover}
            onMouseLeave={endHover}
          >
            {/* {hover && (
              <div className="Card-Icons">
                <div className="Card-Icon" onClick={startEditing}>
                  <ion-icon name="create" />
                </div>
              </div>
            )} */}

            <div className="card-container">
              <div className="card-title">{card.cardTitle}</div>
              <div className="card-footer">
                {/* <div className="card-action">
                  {card.teacher  ? (
                    <div
                      className="bg-red text-white w-32  h-6 rounded-6 mx-4 mb-6"
                      title="High Priority"
                    />
                  ) : (
                    <img
                      src="assets/images/avatars/james.jpg"
                      class="MuiAvatar-img"
                    />
                  )}
                </div> */}
                <div className="card-action"> 
                  <button className="btn ">
                    <i className="zmdi zmdi-swap"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <CardEditor
        text={card.text}
        onSave={editCard}
        onDelete={deleteCard}
        onCancel={endEditing}
      />
    );
  }
};

export default Card;
