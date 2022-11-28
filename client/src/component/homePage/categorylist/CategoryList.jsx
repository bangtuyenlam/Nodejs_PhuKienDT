import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../Utils/Common";
import ImageHoverZoom from "../imghoverzoom/ImgHoverZoom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = () => {
    axios
      .get("/loaisp")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getid = (id) => {
    console.log(id);
  }

  return (
    <div className="buttons d-inline justify-content-center mb-1 pb-5">
      {categoryList &&
            categoryList.map((value) => {
              return (
                <button
                  key={value.id}
                  className="btn ms-1 mb-2"
                  style={{ backgroundColor: "rgba(166, 181, 226, 1)" }}
                  onClick={() => getid(value.id)}
                >
                  {value.LSP_Ten}
                </button>
              );
            })}
    </div>
  );
}

export default CategoryList;
