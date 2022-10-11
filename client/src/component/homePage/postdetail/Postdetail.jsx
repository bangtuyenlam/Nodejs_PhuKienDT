import React from "react";
import {Link} from "react-router-dom";
function Postdetail({ post }) {
  return (
    <div>
      {post.map((p) => {
        return (
            <div className="card mb-3">
            <img src={`http://localhost:5000/image/${p.BD_Hinhanh}`} 
            className="card-img-top"
            style={{height: 200}}
            key="image"
             alt="anh"/>
            <div className="card-body">
              <h5 className="card-title" key="Tieude">{p.Tieude}</h5>
              <p className="card-text" key="Noidung">{p.Noidung.substring(0,200)}</p>
              <Link to={`/post/${p.id}`} key="Chitiet"> Chi tiết </Link>
            </div>
          </div>
        );
      }).reverse()} 
    </div>
     //Hàm reverse trả về giá trị đơn đã đảo ngược trong mảng
  );
}

export default Postdetail;
