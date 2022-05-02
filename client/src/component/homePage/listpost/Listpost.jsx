import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Postdetail from '../postdetail/Postdetail';
function Listpost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/baidang")
        .then((res) => {
            setPosts(res.data)
            console.log(res.data);
        }).catch((err) => {
            console.log(err + "Không lấy được bài đăng");
        })
    },[])
  return (
    <div className='container' style={{marginTop: 80}}>
      <Postdetail post={posts}/>
    </div>
  )
}

export default Listpost