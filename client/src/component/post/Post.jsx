import React, {useEffect, useState} from 'react';
import "./post.css";
import dateFormat from 'dateformat';
import { useParams } from "react-router-dom";
import {
  Create,
  Description,
  Today,
} from "@material-ui/icons";

import axios from "axios";
export default function Post() {
    const postId = useParams();
    const [post, setPost] = useState([]);
  
    useEffect(() => {
      axios
        .post(`/baidang/${postId.id}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          if (err.response.status === 404)
            console.log("Bài đăng này không tồn tại");
          else console.log(err + " Lỗi không lấy được thông tin bài đăng");
        });
    }, []);
  
    return (
      <div className="post">
        <div className="postTitleContainer">
          <h1 className="postTitle">Thông tin bài đăng</h1>
        </div>
        {post && (
          <div className="postContainer">
            <div className="postShow">
              <div className="postShowTop">
                <img
                  src={`http://localhost:5000/image/${post.BD_Hinhanh}`}
                  alt="Anh dai dien"
                  className="postShowImg"
                />
  
                <div className="postShowTopTitle">
                  <span className="postShowName">{post.Tieude}</span>
                </div>
              </div>
              <div className="postShowBottom">
                <span className="postShowTitle">Chi tiết bài đăng</span>
                <div className="postShowInfo">
                  <Create className="postShowIcon"/>
                  <span className="postInfoTitle">
                    {post["Nhanvien.NV_Hoten"]}
                  </span>
                </div>
                <div className="postShowInfo">
                  <Today className="postShowIcon"/>
                  <span className="postInfoTitle">
                    {dateFormat(post.Ngaydang, "h:MM:ss TT dd-mm-yyyy")}
                  </span>
                </div>
                <div className="postShowInfo">
                  <Description className="postShowIcon" />
                  <span 
                  className="postInfoTitle" 
                  style={{whiteSpace: 'pre-line'}}>{post.Noidung}</span>
                </div>
              </div>
            </div>
          
          </div>
        )}
      </div>
    );
}
