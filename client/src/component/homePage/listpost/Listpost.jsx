import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Postdetail from '../postdetail/Postdetail';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function Listpost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/baidang")
        .then((res) => {
            setPosts(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err + "Không lấy được bài đăng");
        })
    },[])

    const Loading = () => {
      return(
        <>
        {posts.map(() => {
          return(
            
            <div className="card mb-3">
            <Skeleton height={120}/>
            <Skeleton height={20}/>
            <Skeleton height={30}/>
            <Skeleton height={10} width={100}/>
          </div>
          
          )
        })}
       
        </>
      )
    }

  return (
    <div className='container' style={{marginTop: 80}}>
      {loading ? <Loading/> : 
      <Postdetail post={posts}/>
  }
    </div>
  )
}

export default Listpost