import React, { Component } from "react";
import { useState } from "react";
import Axios from "axios";
import {useHistory} from "react-router-dom"
import { withAlert } from 'react-alert'


function Login(){

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")


  let history=useHistory()

  let click=()=>{
    // alert.show('Oh look, an alert!')
    let body={
      username:username,
      password:password
    }
    try{
      Axios.post("http://localhost:3002/login",body).then(response=>{
        
        if(response?.data?.success){
          localStorage.setItem("token", response?.data?.token);
          history.push('/')
        }else{
          window.open('/login')
        }

      }).catch(err=>console.log(err))
      
    //   api.login(body).then(response=>{
    //     console.log(response)
    //   })
    // }
    // catch(err){
    //   console.log(err)
    // }
  }
  catch(err){
    console.log(err)
  }
  }
  return(
    <div className="container my-4 w-25 h-50">
  <div class="card">
  <div class="card-body">
    <img src="aknamedlogo-1.svg" class="card-img-top mx-auto" alt="" />

  <form>
  <div class="form-outline mb-4">
  <label class="form-label mt-3" for="form2Example1">Username</label>
  <input type="text" onChange={(e) => setusername(e.target.value)} id="form2Example1" class="form-control" />
  <div class="form-outline mb-4">
  <label class="form-label mt-3" for="form2Example2">Password</label>
    <input type="password"  onChange={(e) => setpassword(e.target.value)} id="form2Example2" class="form-control" />
    
    <button type="button"   onClick={click} className="btn-warning fa fa-lock mt-3">Login</button>
  </div>
  </div>
  </form>

  </div>
</div>

    </div>
  )
}

export default Login