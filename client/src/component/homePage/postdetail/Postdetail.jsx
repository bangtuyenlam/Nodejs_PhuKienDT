import React from "react";
import {Link} from "react-router-dom";
function Postdetail({ post }) {
  return (
    <div>
      {post.map((p) => {
        return (
            <div class="card mb-3">
            <img src={`http://localhost:5000/image/${p.BD_Hinhanh}`} 
            class="card-img-top"
            style={{height: 200}}
             alt="anh"/>
            <div class="card-body">
              <h5 class="card-title">{p.Tieude}</h5>
              <p class="card-text">{p.Noidung.substring(0,200)}</p>
              <Link to={`/post/${p.id}`}> Chi tiết </Link>
            </div>
          </div>
        );
      }).reverse()}
    </div>
  );
}

export default Postdetail;
