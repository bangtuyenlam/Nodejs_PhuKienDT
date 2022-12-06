import React, {useState, useEffect} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline} from "@material-ui/icons";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export default function DiscountProducts() {
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
      // { field: 'id', headerName: 'ID', width: 100 },
      // {
      //   field: 'MaTK',
      //   headerName: 'Tài khoản',
      //   width: 140,
      // },
      {
        field: "KM_Ten",
        headerName: "Ten khuyến mãi",
        width: 200,
      },
      {
        field: "NgayBatDau",
        headerName: "Ngày bắt đầu",
        width: 180,
        renderCell: (params) => {
          return dateFormat(params.row.NgayBatDau, "dd/mm/yyyy");
        },
      },
      {
        field: "NgayKetThuc",
        headerName: "Ngày kết thúc",
        width: 180,
        renderCell: (params) => {
          return dateFormat(params.row.NgayKetThuc, "dd/mm/yyyy");
        },
      },
      {
        field: "action",
        headerName: "Điều khiển",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/admin/customer/${params.row.id}`}>
                <button className="customerManagerEdit">Sửa</button>
              </Link>
              <DeleteOutline
                className="customerManagerDelete"
                onClick={() => handleDelete(params.row.id)}
              />
            </>
          );
        },
      },
    ];
  
    return (
      <div className="customerManager">
        <div className="customerManagerContainer">
          <h1 className="customerManagerTitle">Danh sách khuyến mãi</h1>
          <Link to={"/admin/newdiscount"}>
            <button className="customerAddButton">Thêm</button>
          </Link>
        </div>
        {discounts && (
          <DataGrid
            rows={discounts}
            columns={columns}
            pageSize={8}
            checkboxSelection
            disableSelectionOnClick
          />
        )}
      </div>
    );
}
