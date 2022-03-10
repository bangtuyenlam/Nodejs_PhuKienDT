import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import {getToken} from '../Utils/Common';

function Home() {
  const token = getToken();

   const [data, setData] = useState({});
   
   useEffect(() => {
    axios.get('/baidang')
      .then( (res) => {
          setData(res.data)
          console.log(res.data);
          console.log(token);
      })
      .catch((err) => {
        console.log(err);
      })
  }, {})

  return (
    <div className="container">
         <div>
         
           <br></br>
         </div>
          <Navbar/>
          <br></br>
          {/* <p>{data.map( (res) => {
             return (  <p> {res.TenTK} </p>)
          })}
          </p> */}
        </div>
  )
}

export default Home