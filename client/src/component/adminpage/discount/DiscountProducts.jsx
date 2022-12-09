import React, {useState, useEffect} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline, EditOutlined} from "@material-ui/icons";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});
export default function DiscountProducts() {
  const classes = useStyles();
    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
      getData();
    }, [discounts]);
  
    //Xóa khách hàng và tài khoản của khách hàng đó
    const handleDelete = (id) => {
      axios.delete(`/khuyenmai/xoa/${id}`
    //   , {
    //     data: {
    //       MaKM: MaKM,
    //     },
    //   }
      );
      console.log("xóa");
      getData();
    };
  
    const getData = async () => {
      await axios
        .get("/khuyenmai")
        .then((res) => {
          setDiscounts(res.data);
        
        })
        .catch((err) => {
          console.log(err + " Không thể lấy được khách hàng");
        });
    };
  
    const columns = [
      {
        field: "KM_Ten",
        headerName: "Ten khuyến mãi",
        headerClassName: 'super-app-theme--header',
        width: 400,
      },
      {
        field: "NgayBatDau",
        headerName: "Ngày bắt đầu",
        headerClassName: 'super-app-theme--header',
        width: 180,
        renderCell: (params) => {
          return dateFormat(params.row.NgayBatDau, "dd/mm/yyyy");
        },
      },
      {
        field: "NgayKetThuc",
        headerName: "Ngày kết thúc",
        headerClassName: 'super-app-theme--header',
        width: 180,
        renderCell: (params) => {
          return dateFormat(params.row.NgayKetThuc, "dd/mm/yyyy");
        },
      },
      {
        field: "action",
        headerName: "Điều khiển",
        headerClassName: 'super-app-theme--header',
        width: 200,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/admin/customer/${params.row.id}`} className="btn btn-secondary">
                <EditOutlined/>
              </Link>
              <div className='btn btn-outline-danger ms-1'>
              <DeleteOutline
                
                onClick={() => handleDelete(params.row.id)}
              />
              </div>
            </>
          );
        },
      },
    ];
  
    return (
      <div className="customerManager">
         <div className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25" style={{ height: "120%", width: '100%' }}>
        <div className="customerManagerContainer">
          <h4 className="checkoutManagerTitle">Danh sách khuyến mãi</h4>
          <Link to={"/admin/newdiscount"}>
            <button className="customerAddButton">Thêm</button>
          </Link>
        </div>
        <div style={{ height: "90%", width: '100%', background: "white" }} className={classes.root}>
        {discounts && (
          <DataGrid
            rows={discounts}
            columns={columns}
            pageSize={8}
            disableSelectionOnClick
          />
        )}</div>
        </div>
      </div>
    );
}
