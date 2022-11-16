import React, {useState, useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import {DeleteOutline} from '@material-ui/icons'
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';
function ImportProduct() {
    const [item, setItem] = useState([]);
  
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
    await axios.get("/nhaphang/")
     .then((res) => {
       setItem(res.data);
       console.log(res.data);
     })
     .catch((err) => {
       console.log(err + " Không thể lấy được sản phẩm");
   }
     )}
  
     const columns = [
    
      {
        field: 'Nhanvien.NV_Ten',
        headerName: 'Tên nhân viên',
        width: 200,
      },
      {
        field: 'Ngaynhap',
        headerName: 'Ngày nhập',
        width: 135,
        renderCell: (params) => {
            return  dateFormat(params.row.Ngaydat, "h:MM:ss TT dd/mm/yyyy");
          }
      },
      {
        field: 'PN_Tongtien',
        headerName: 'Tổng tiền',
        width: 137,
      },
      {
        field: 'PN_Dathanhtoan',
        headerName: 'Đã thanh toán',
        width: 137,
      },
      {
        field: 'action',
        headerName: 'Điều khiển',
        width: 210,
        renderCell: (params) => {
          
          return(
            <>
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
        <Link to={"/admin/newImport"}>
          <button className="productAddButton">Thêm</button>
        </Link>
      </div>
      {item && (
        <DataGrid
          rows={item}
          columns={columns}
          pageSize={7}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </div>
  )
}

export default ImportProduct