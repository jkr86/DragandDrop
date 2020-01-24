import {useState} from 'react';
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd-next';
import allData from "../components/initialData";

const index = () => {
  const [data, setData] = useState(allData);
    
  const onDragEnd = result => {
    const {destination, source, draggableId} = result
    const pickColumn = data.columns[source.droppableId]
    const dropColumn = data.columns[destination.droppableId]
    let placedItem = pickColumn.rows.find(item => item.id === draggableId)
    if(!destination){
      return
    }
    if(destination.droppableId == source.droppableId &&
      destination.index == source.index
    )
    {
      return
    }
    pickColumn.rows.splice(source.index, 1);
    dropColumn.rows.splice(destination.index, 0, placedItem)
    data.columns.splice(destination.droppableId, 1)
    data.columns.splice(destination.droppableId, 0, dropColumn)
    setData(data);
};
return(
  <div className="main"> 
    <div className="hero">
      <div className="row">
      <DragDropContext onDragEnd={onDragEnd}>
          {
            data && data.columns.map((column,index)=>{
              // const tasks = columns.taskIds.map(taskId=>data.tasks[taskId]);
              return(
                <div className="col-m-20" key={index}>
                  <h1 className="columnTitle">{column.title}</h1>
                  <Droppable droppableId={column.id}>
                    {provided=>(
                      <div className="dropArea" ref = {provided.innerRef} 
                      {...provided.droppableProps}>
                        {
                          column.rows.map((card,index)=>{
                            return(
                              <Draggable draggableId={card.id} index={index} key={card.id}>
                                {(provided)=>(
                                  <div {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  >
                                    <div className="card" style={card.cardStyle}>
                                    {card.category && <p className="category" style={card.categStyle}>{card.category}</p>}
                                    <h3>{card.title}</h3>
                                    {/* <p>{card.description}</p> */}
                                    <div className="roles">
                                      {card.issueId && <p>{card.issueId}</p>}
                                      {card.team && <p>{card.team}</p>}
                                      {card.dueDate && <p>{card.dueDate}</p>}
                                      {card.type && <p className="type"><span style={card.bulletStyle}>&#8226;</span>{card.type}</p>}
                                    </div>
                                    <div className="assigne">
                                      <img src={card.assigneUrl} alt=""></img>
                                    </div>
                                  </div>
                                </div>
                                )}
                              </Draggable>
                            )
                          })
                        }
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })
          }
        </DragDropContext>
      </div>
      <p className="attributes">Made with
        <span>
          <img src="https://img.icons8.com/material-outlined/24/000000/like.png"></img>
        </span>by&nbsp; 
        <a href="https://github.com/jdr86">jdr86</a>
      </p>
    </div>
    <style jsx>{`
        @import url('https://fonts.googleapis.com/css?family=Comfortaa:700|Roboto&display=swap');
        body{
          padding: 0;
          background: #eeeeee57;
          margin: 0;
        }
        .main{
        }
        .hero {
          width: 100%;
          color: #333;
        }
        .row {
          display: flex;
          justify-content: space-around;
          align-items: start;
        }
        .card {
          padding: 18px 18px 24px;
          width: 270px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          cursor:pointer;
          margin: 15px 0;
          background: #fff;
          border-radius: 5px;
          position: relative;
        }
        .card:hover {
          // border-color: #067df7;
          box-shadow: 0px 0px 7px #ccc;
        }
        .card h3 {
          margin: 0;
          color: #333;
          font-size: 15px;
          font-family: 'Comfortaa', cursive;
        }
        .card p {
          margin: 0;
          // padding: 12px 0 0;
          // font-size: 12px;
          margin-top: 10px;
          color: #333;
          font-family: 'Roboto', sans-serif;
        }
        .col-m-2{
          // max-width:19%;
          margin: 0 0.5%;
          background: #eee;
          padding: 15px 25px;
          border-radius: 5px;
          box-shadow: 0px 0px 5px #cbcbcb;
          border: 1px solid #d1d1d1;
        }
        .columnTitle{
          color: #333;
          font-size: 24px;
          margin: 15px 0 25px;
          font-family: 'Comfortaa', cursive;
        }
        .assigne{
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }
        .assigne img{
          border-radius: 50px;
          width: 40px;
          position: absolute;
          bottom: 15px;
          right: 15px;
        }
        .roles{
          margin-top: 10px;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          min-height: 65.4px;
        }
        .card .roles p{
          background: #eee;
          padding: 4px 10px;
          font-size: 12px;
          border-radius: 4px;
          margin-right: 10px;
        }
        .type{
          position: relative;
          padding-left: 24px !important;
          background: #fff !important;
        }
        .type span{
          width: 15px;
          font-size: 43px;
          position: absolute;
          left: 5px;
          bottom: -15px;
        }
        .card .category{
          font-size: 13px;
          color: #333;
          margin-bottom: 10px;
          width: fit-content;
          padding: 2px 5px;
          color: #eee;
          border-radius: 4px;
          padding-bottom: 2px;
          text-transform: uppercase;
        }
        .dropArea{
          padding-bottom: 200px;
        }
        .attributes{
          position: fixed;
          right: 3%;
          bottom: 1%;
          font-family: 'Comfortaa',cursive;
          color: #38afda;
          font-size: 13px;
        }
        .attributes a{
          color: #055dfc;
          text-decoration: none;
        }
        .attributes a:hover{
          color: #f90018;
        }
        .attributes img{
          margin: 0 3px -6px 3px;
        }
      `}</style>
  </div>
)};

export default index;
