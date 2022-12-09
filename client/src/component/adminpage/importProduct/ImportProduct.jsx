import React, {useState, useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import {DeleteOutline, RemoveRedEyeOutlined} from '@material-ui/icons'
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});
function ImportProduct() {
    const [item, setItem] = useState([]);
    const classes = useStyles();
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
        field: 'Nhanvien.NV_Hoten',
        headerName: 'Tên người nhập',
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: 'PN_Nhacungcap',
        headerName: 'Nhà cung cấp',
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: 'Ngaynhap',
        headerName: 'Ngày nhập',
        width: 200,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
            return  dateFormat(params.row.Ngaydat, "h:MM:ss TT dd/mm/yyyy");
          }
      },
      {
        field: 'PN_Tongtien',
        headerName: 'Tổng tiền',
        width: 137,
        headerClassName: "super-app-theme--header",
      },
      {
        field: 'action',
        headerName: 'Điều khiển',
        width: 210,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
          
          return(
            <>
            <Link to={`/admin/product/${params.row.id}`} className="btn btn-success ms-1">
           <RemoveRedEyeOutlined/>
            </Link>
            <div className="btn btn-outline-danger ms-1">
            <DeleteOutline className="productManagerDelete"
                onClick = {() => handleDelete(params.row.id, params.row.Anhdaidien)}
            />
            </div>
            </>
          )
        }
      }
    ];
  
  return (
    <div className="productManager">
       <div
        className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25"
        style={{ height: "120%", width: "100%" }}
      >
      <div className="productManagerContainer">
        <h1 className="productManagerTitle">Danh sách phiếu nhập</h1>
        <Link to={"/admin/newImport"}>
          <button className="productAddButton">Thêm</button>
        </Link>
      </div>
      <div
          style={{ height: "90%", width: "100%", background: "white" }}
          className={classes.root}
        >
      {item && (
        <DataGrid
          rows={item}
          columns={columns}
          pageSize={7}
          disableSelectionOnClick
        />
      )}</div>
      </div>
    </div>
  )
}

export default ImportProduct