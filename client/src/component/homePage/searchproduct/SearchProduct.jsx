import React, { useState, useEffect } from "react";
import "./searchproduct.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
export default function SearchProduct({ placeholer }) {
  const [filter, setFilter] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("/sanpham")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err + " Không thể lấy được sản phẩm");
      });
  });

  const handleChange = (e) => {
    const search = e.target.value;
    const newFilter = product.filter((value) => {
      return value.SP_Ten.toLowerCase().includes(search.toLowerCase());
    });
    if (search === "") setFilter([]);
    else setFilter(newFilter);
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholer} onChange={handleChange} />
        <div className="searchIcon">
          <Search />
        </div>
      </div>
      {filter.length !== 0 && (
        <div className="dataResult">
          <div className="title">Có phải bạn muốn tìm: </div>
          {filter.slice(0, 4).map((value) => {
            return (
              <>
                <Link
                  className="dataItem"
                  to={`/product/${value.id}`}
                  reloadDocument={true}
                >
                  <img
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                    src={`http://localhost:5000/image/${value.Anhdaidien}`}
                  />
                  <p>{value.SP_Ten} </p>
                </Link>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
