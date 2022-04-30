import React, { Component } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useEffect } from "react";
import axios from "axios"
import moment from "moment";
import { useHistory } from "react-router-dom";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Draggable } from "react-beautiful-dnd";


function Main(){

  let history=useHistory()
    const [show, setShow] = useState(false);

    const [srno,setsrno]=useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data,setdata]=useState([])

  const[title,settitle]=useState("")
  const [file,setfile]=useState()


  useEffect(() => {
    getdata()
    tokenCheck()
  }, data)
  

  let tokenCheck=()=>{
    if(localStorage.getItem("token")){

    }else{
      history.push('/login')
    }
  }

  let getdata=()=>{
    axios.get("http://localhost:3002/upload").then(response=>{
      console.log(response?.data?.data)
      setdata(response?.data?.data)
      console.log(response?.data?.data)
    })
  }

  let viewfile=(url)=>{
      window.location.href=("http://localhost:3002/"+url)
  }
  
  let deletebyid=(id)=>{
    axios.delete("http://localhost:3002/upload/"+id).then(response=>{
      getdata()
      console.log(id)
    })
  }
  
  console.log(file)
  let upload=()=>{
    let form=new FormData()
    form.append("title",title)
    form.append("file",file)
    axios.post('http://localhost:3002/upload',form).then(response=>{
      if(response?.data?.success){
        
        getdata()
      }else{
        console.log("failed")
      }
    })
  }

  let logout=()=>{
    localStorage.clear()
    history.push("/login")
  }
  
  const handleDragable=(results)=>{
    let tempData=[...data]
    let [selectedRow]=tempData.splice(results.source.index,1);
tempData.splice(results.destination.index,0,selectedRow)
setdata(tempData);
  }
    return(
        <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <a className="navbar-brand"></a>
           <img src="/aknamedlogo-1.svg" alt="" />
            </nav>
              <div className="container my-4">
                  <div className="text-right">
                      <button onClick={handleShow} className="btn btn-success pl-3 mr-2"> Add File</button>
                      <button className="btn btn-danger" onClick={logout}>Logout</button>
                      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Investor Document</Modal.Title>
        </Modal.Header>
        
        
        
         
        <Modal.Body>
            <div className="form-group">
            <label for="filename">Title</label>
            <input type="text" onChange={(e) => settitle(e.target.value)} class="form-control" id="filename" name="filename" aria-describedby="emailHelp"/>
            </div>
            <div className="form-group">
            <label for="desc">File Name</label>
            <input type="file" onChange={(e) => setfile(e.target.files[0])} class="form-control" id="url" name="url" aria-describedby="emailHelp"></input>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={upload}  > 
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

                  </div>
              </div>
              <div className="container">
                <DragDropContext onDragEnd={(results)=>handleDragable(results)}>
                <table className="table">

<thead>
    <th>S.no</th>
    <th>Title</th>
    <th>File name</th>
    <th>Date</th>
    <th>Actions</th>
    
</thead>
<Droppable droppableId="characters">
    {(provider) => (
     <tbody className="ui-sortable"  {...provider.droppableProps} ref={provider.innerRef}>

     {
     data.map((element, index, array)=>{
     
     return(
     <Draggable  draggableId={element.title} index={index}>
       {(provider)=>(  
       <tr className="sort ui-sortable-handle" {...provider.draggableProps} ref={provider.innerRef} {...provider.dragHandleProps}>
     <td>{index+1}</td>
     <td>{element.title}</td>
     <td>{element.filename}</td>
     <td>{ moment(element.createdAt).format("llll") }</td>
     <button onClick={view=>viewfile(element.filename)} className="btn btn-sm btn-primary mr-2">View File</button>
     <button onClick={click=>deletebyid(element._id)} className="btn btn-sm btn-danger ">Delete</button>
     {setsrno=>setsrno+1}
     </tr>)}
   
     </Draggable>
     )  })
     }
       {provider.placeholder}
     </tbody>
    )}
  </Droppable>




          </table>

                </DragDropContext>
                 
                  
              </div>

              
              </div>
            
    )
}


export default Main