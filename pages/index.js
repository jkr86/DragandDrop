import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "react-beautiful-dnd-next";
import allData from "../components/initialData";
import styled from "styled-components";
// import "../styles/main.css";

const index = () => {
  const [data, setData] = useState(allData);
  const [homeIndex, setHomeIndex] = useState(0);
  const isDropDisabled = true;

  const onDragStart = start => {
    const pickedColumn = data.columns.find(
      item => item.id === start.source.droppableId
    );
    setHomeIndex(data.columns.indexOf(pickedColumn));
    // console.log("placedItem.index",homeIndex)
  };

  const onDragEnd = result => {
    setHomeIndex(null);
    const { destination, source, draggableId } = result;

    if (destination) {
      const srcId = source.droppableId;
      const desId = destination.droppableId;
      const srcIn = source.index;
      const desIn = destination.index;
      const srcColumn = data.columns.find(item => item.id === srcId);
      const desColumn = data.columns.find(item => item.id === desId);
      const srcColIn = data.columns.indexOf(srcColumn);
      const desColIn = data.columns.indexOf(desColumn);
      const pickColumn = data.columns[srcColIn];
      const dropColumn = data.columns[desColIn];
      const placedItem = pickColumn.rows.find(item => item.id === draggableId);

      if (!destination) {
        return;
      }

      if (desColIn == srcColIn && desIn == srcIn) {
        return;
      }

      if (srcColIn < desColIn) {
        placedItem.cardStyle = dropColumn.cardStyle;
        placedItem.categStyle = dropColumn.categStyle;
        placedItem.bulletStyle = dropColumn.bulletStyle;
      }
      pickColumn.rows.splice(srcIn, 1);
      dropColumn.rows.splice(desIn, 0, placedItem);
      data.columns.splice(desColIn, 1);
      data.columns.splice(desColIn, 0, dropColumn);

      setData(data);
    }
  };

  const Column = styled.div`
    padding: 0 15px 200px 15px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? "#f5f2f27d" : "#fff")};
  `;

  return (
    <div className="main">
      <div className="hero">
        <div className="row">
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            {data &&
              data.columns.map((column, index) => {
                return (
                  <div className="col-m-2" key={index}>
                    <h1 className="columnTitle">{column.title}</h1>
                    <Droppable
                      droppableId={column.id}
                      isDropDisabled={isDropDisabled}
                    >
                      {(provided, snapshot) => (
                        <Column
                          className="dropArea"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          isDraggingOver={snapshot.isDraggingOver}
                        >
                          {column.rows.map((card, index) => {
                            return (
                              <Draggable
                                draggableId={card.id}
                                index={index}
                                key={card.id}
                              >
                                {provided => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <div className="cardBg">
                                      <div className="cardBgFront">
                                        <div
                                          className="card"
                                          style={card.cardStyle}
                                        >
                                          <div className="typeCateg">
                                            {card.category && (
                                              <p
                                                className="category"
                                                style={card.categStyle}
                                              >
                                                {card.category}
                                              </p>
                                            )}
                                            {card.type && (
                                              <p className="type">
                                                {card.type}
                                                <span style={card.bulletStyle}>
                                                  &#8226;
                                                </span>
                                              </p>
                                            )}
                                          </div>
                                          <h3>{card.title}</h3>
                                          <p className="desc">
                                            {card.description}
                                          </p>
                                          <div className="roles">
                                            {card.issueId && (
                                              <p>{card.issueId}</p>
                                            )}
                                            {card.team && <p>{card.team}</p>}
                                            {card.dueDate && (
                                              <p>{card.dueDate}</p>
                                            )}
                                          </div>
                                          <div className="assigne">
                                            <img
                                              src={card.assigneUrl}
                                              alt=""
                                            ></img>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </Column>
                      )}
                    </Droppable>
                  </div>
                );
              })}
          </DragDropContext>
        </div>
        {/* <p className="attributes">Made with
          <span>
            <img src="https://img.icons8.com/material-outlined/24/000000/like.png"></img>
          </span>by&nbsp; 
          <a href="https://github.com/jdr86">jdr86</a>
        </p> */}
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Comfortaa:700|Roboto&display=swap");
        body {
          padding: 0;
          background: #eeeeee57;
          margin: 0;
        }
        .main {
        }
        .hero {
          width: 100%;
          color: #333;
        }
        .row {
          display: flex;
          justify-content: space-between;
          align-items: start;
          padding: 15px;
        }
        .card {
          padding: 15px 15px 15px;
          width: 240px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          cursor: pointer;
          background: #fff;
          border-radius: 4px;
          position: relative;
          user-select: none;
        }
        .card:hover {
          // border-color: #067df7;
          box-shadow: 0px 0px 7px #ccc;
        }
        .card h3 {
          margin: 0;
          color: #333;
          font-size: 12px;
          margin-top: 10px;
          line-height: 1.5;
          font-family: "Comfortaa", cursive;
        }
        .card p {
          margin: 0;
          // padding: 12px 0 0;
          // font-size: 12px;
          margin-top: 5px;
          color: #333;
          font-family: "Roboto", sans-serif;
        }
        .col-m-2 {
          // max-width:19%;
          // margin: 0 15px;
          margin: 0 0.5%;
          // padding: 15px 25px;
          // border-radius: 5px;
          // box-shadow: 0px 0px 5px #cbcbcb;
          // border: 1px solid #d1d1d1;
        }
        .columnTitle {
          color: #333;
          font-size: 24px;
          margin: 15px;
          font-family: "Comfortaa", cursive;
        }
        .assigne {
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }
        .assigne img {
          border-radius: 50px;
          width: 35px;
          position: absolute;
          top: 15px;
          left: 15px;
        }
        .roles {
          margin-top: 10px;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .card .roles p {
          background: #eee;
          padding: 3px 8px;
          font-size: 9px;
          border-radius: 4px;
          margin-right: 10px;
        }
        .type {
          position: relative;
          padding-right: 21px !important;
          background: #fff !important;
          padding: 3px 6px;
          font-size: 9px;
          border-radius: 4px;
          margin-right: 10px;
        }
        .type span {
          width: 15px;
          font-size: 27px;
          position: absolute;
          right: 1px;
          bottom: -9px;
        }
        .card .category {
          font-size: 9px;
          color: #333;
          width: fit-content;
          padding: 2px 5px;
          color: #eee;
          border-radius: 4px;
          padding-bottom: 2px;
          margin-top: 0;
          margin-bottom: 0;
          text-transform: uppercase;
        }
        .dropArea {
          padding-bottom: 400px;
        }
        .attributes {
          position: fixed;
          right: 3%;
          bottom: 1%;
          font-family: "Comfortaa", cursive;
          color: #38afda;
          font-size: 13px;
        }
        .attributes a {
          color: #055dfc;
          text-decoration: none;
        }
        .attributes a:hover {
          color: #f90018;
        }
        .attributes img {
          margin: 0 3px -6px 3px;
        }
        .typeCateg {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .card .desc {
          font-size: 12px;
        }
        .cardBg {
          padding: 12px 0;
        }
        .cardBg:focus {
          outline: none;
        }
        .cardBgFront {
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default index;
