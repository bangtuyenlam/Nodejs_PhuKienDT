import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import { deepOrange } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

function ListComment({ comment, handleComment, lstComment }) {
  const classes = useStyles();

  // const [lstComment, setLstComment] = useState([]);
  const [reply, setReply] = useState();
  const [onclick, setOnClick] = useState();
  const [id, setId] = useState();
  const [toUser, setToUser] = useState();
  const [check, setCheck] = useState(true);
  const kh =
    comment["Khachhang.Taikhoan.TenTK"] !== null
      ? comment["Khachhang.Taikhoan.TenTK"]
      : null;
  const nv =
    comment["Nhanvien.Taikhoan.TenTK"] !== null
      ? comment["Nhanvien.Taikhoan.TenTK"]
      : null;
  // useEffect(() => {
  //     axios
  //     .post(`/binhluan/${MaSP}`)
  //     .then((res) => {
  //         setLstComment(res.data);
  //     })
  //     .catch((err)=> {
  //         console.log(err + " Lỗi không lấy được danh sách bình luận");
  //     });
  // }, []);

  const handleResponse = (id, user) => {
    setOnClick(true);
    setId(id);
    setReply("@" + user + ": ");
    setCheck(false);
  };

  const handleClose = () => {
    setOnClick(false);
    setCheck(true)
  }
console.log(id);
  const handleSubmit = (e) => {
    console.log(comment);
  };

  const DisplayReply = () => (
    <div className="row mt-4">
          <textarea
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
              resize: "none",
            }}
            rows={3}
            value = {reply}
            onChange={(value) => setReply(value.target.value)}
            className="col-8 me-3 rounded-2 border border-secondary py-2"
            placeholder="Nhập bình luận của bạn..."
          ></textarea>
          <button
            className="col-1 h-50 mt-5 btn btn-primary justify-content-center"
            onClick={() => handleComment(reply, setReply, id, setOnClick, onclick)}
          >
            Gửi
          </button>
        </div>
  )

  return (
    <div key={comment.id} className="mb-3">
      <div className="row">
        <Avatar className={classes.small} variant="square">
          {kh !== null ? kh.slice(0, 1) : nv.slice(0, 1)}
        </Avatar>

        <h5 className="col-sm-2 fw-bold">{kh !== null ? kh : nv}</h5>
      </div>

      <div className="row" style={{ whiteSpace: "pre-line" }}>
        {comment.BL_Noidung}
      </div>
      <div className="row mt-2">
        {check &&check === true ? (
           <button
           className="text-primary border-0 col-1"
           onClick={() => handleResponse(comment.id, kh !== null ? kh : nv)}
           disabled={!check}
         >
           Trả lời
        </button>
        ) : (
          <button
          className="text-primary border-0 col-1"
          onClick={() => handleClose()}
        >
           Đóng
        </button>
        )}
       
        <div className="col-sm-2 fst-italic">
          {" "}
          - {dateFormat(comment.BL_Ngaybinhluan, "hh:mm:ss dd-mm-yyyy")}
        </div>
      </div>

      {lstComment.map((item, i) => {
        if (item.Binhluantruoc === comment.id)
          return (
            
              <div className="col-9 mt-3 mb-3 border border-success bg-light" key={i}>
                <div className="row row-cols-auto pt-1 ms-2">
                  <Avatar className={classes.small} variant="square">
                    {item["Khachhang.Taikhoan.TenTK"] !== null
                      ? item["Khachhang.Taikhoan.TenTK"].slice(0, 1)
                      : item["Nhanvien.Taikhoan.TenTK"].slice(0, 1)}
                  </Avatar>

                  <h5 className="col">
                    {item["Khachhang.Taikhoan.TenTK"] !== null
                      ? item["Khachhang.Taikhoan.TenTK"]
                      : item["Nhanvien.Taikhoan.TenTK"]}
                  </h5>
                </div>

                <div className="ms-2" style={{ whiteSpace: "pre-line" }}>
                  {item.BL_Noidung}
                </div>
                <div className="row ms-2 pb-1">
                  <button
                    className="text-primary border-0 col-1"
                    onClick={() => handleResponse(comment.id, 
                      item["Khachhang.Taikhoan.TenTK"] !== null
                      ? item["Khachhang.Taikhoan.TenTK"]
                      : item["Nhanvien.Taikhoan.TenTK"]
                      )}
                  >
                    Trả lời
                  </button>
                  <div className="col-sm-3 fst-italic">
                    {" "}
                    - {dateFormat(item.BL_Ngaybinhluan, "hh:mm:ss dd-mm-yyyy")}
                  </div>
                </div>
              </div>
       
          );
      })}

      {onclick && onclick === true ? (
        <DisplayReply />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ListComment;
