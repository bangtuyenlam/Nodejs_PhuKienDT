import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostId() {
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
    <div className="container">
      {post && (
        <div className="card mb-5">
          <img
            src={`http://localhost:5000/image/${post.BD_Hinhanh}`}
            className="card-img-top"
            style={{
              width: "100%",
              marginTop: 20,
              height: 500,
              marginBottom: 20,
            }}
            alt="anh"
          />
          <div className="card-body">
            <h2 className="card-title" style={{ alignItems: "center" }}>
              {post.Tieude}
            </h2>
            <br />
            <p className="card-text" dangerouslySetInnerHTML={{__html: post.Noidung}}>
            
            </p>

            <i className="card-title">
              Ngày đăng: {dateFormat(post.Ngaydang, "h:MM:ss TT dd-mm-yyyy")}
            </i>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostId;
