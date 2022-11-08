import React, {useEffect, useState} from 'react';
import './productManager.css';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import {DeleteOutline} from '@material-ui/icons'
import { Link} from 'react-router-dom';


export default function ProductManager() {
  const [products, setProducts] = useState([]);
  
  useEffect( () => {
    getData();
  }, []);

  const handleDelete = (id, avatar) => {
    axios.delete(`/sanpham/xoa/${id}`, {
      data: {
        anhdaidien: avatar,
      },
    })
    console.log("xóa thành công");
    getData()
   }

 const getData = async () => {
  await axios.get("/sanpham")
   .then((res) => {
     setProducts(res.data);
    // console.log(res.data);
   })
   .catch((err) => {
     console.log(err + " Không thể lấy được sản phẩm");
 }
   )}

   const columns = [
  
    {
      field: 'SP_Ten',
      headerName: 'Tên sản phẩm',
      width: 530,
      renderCell: (params) => {
        return (
          <div className="productName">
            <img className='productImg' src={`http://localhost:5000/image/${params.row.Anhdaidien}`} alt="Anh dai dien"/>
            {params.row.SP_Ten}
          </div>
        )
      }
    },
    {
      field: 'SP_Gia',
      headerName: 'Giá bán',
      width: 135,
      renderCell: (params) => {
          return <div>{params.row.SP_Gia} VNĐ</div>
      }
    },
    {
      field: 'Soluong',
      headerName: 'Số lượng',
      width: 137,
    },
    {
      field: 'action',
      headerName: 'Điều khiển',
      width: 210,
      renderCell: (params) => {
        
        return(
          <>
           <Link to={`/admin/product/addimg/${params.row.id}`}>
          <button className="productManagerEdit">Thêm ảnh</button>
          </Link>
          <Link to={`/admin/product/${params.row.id}`}>
          <button className="productManagerEdit">Sửa</button>
          </Link>
          <DeleteOutline className="productManagerDelete"
              onClick = {() => handleDelete(params.row.id, params.row.Anhdaidien)}
          />
          </>
        )
      }
    }
  ];

  return (
    <div className="productManager">
      <div className="productManagerContainer">
        <h1 className="productManagerTitle">Danh sách sản phẩm</h1>
        <Link to={"/admin/newProduct"}>
          <button className="productAddButton">Thêm</button>
        </Link>
      </div>
      {products && (
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={7}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </div>
  );
}
