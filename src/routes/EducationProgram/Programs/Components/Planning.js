import React from "react";
// import Board from '@lourenci/react-kanban'
// import '@lourenci/react-kanban/dist/styles.css'

import Board from './PlanningComponents/Board';
const Planning = (props) => {
  const board = {
    columns: [
      {
        id: 1,
        title: 'Kỳ 1',
        cards: [
          {
            id: 1,
            title: 'Kỳ 1',
            description: 'Add capability to add a card in a column'
          },
        ]
      },
      {
        id: 2,
        title: 'Kỳ 2',
        cards: [
          {
            id: 2,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      },
      {
        id: 3,
        title: 'Kỳ 3',
        cards: [
          {
            id: 11,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      },
      {
        id: 4,
        title: 'Kỳ 4',
        cards: [
          {
            id: 4,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      },
      {
        id: 5,
        title: 'Kỳ 5',
        cards: [
          {
            id:5,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      },
      {
        id: 6,
        title: 'Kỳ 6',
        cards: [
          {
            id: 12,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      },
      {
        id: 7,
        title: 'Kỳ 7',
        cards: [
          {
            id: 12,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      },
      {
        id: 8,
        title: 'Kỳ 8',
        cards: [
          {
            id: 12,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      },
      {
        id: 9,
        title: 'Kỳ 9',
        cards: [
          {
            id: 12,
            title: 'Drag-n-drop support',
            description: 'Move a card between the columns'
          },
        ]
      }
    ]
  }

    return(
        <> <Board detail = {props.detail} initialBoard={board} /></>
    );
}

export default Planning;