import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

  return (
    <div className="buttons d-inline justify-content-center mb-1 pb-5">
      {categoryList &&
            categoryList.map((value) => {
              return (
                <Link
                  key={value.id}
                  className="btn ms-1 mb-2"
                  style={{ backgroundColor: "rgba(166, 181, 226, 1)" }}
                  to={`/filter-${value.id}`}
                >
                  {value.LSP_Ten}
                </Link>
              );
            })}
    </div>
  );
}

export default CategoryList;
