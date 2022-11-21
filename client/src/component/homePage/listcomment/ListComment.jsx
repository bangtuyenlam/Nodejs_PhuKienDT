import React, {useEffect, useState} from 'react';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import dateFormat from "dateformat";

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }));
  
function ListComment({MaSP}) {
    const classes = useStyles();

    const [lstComment, setLstComment] = useState([]); 
    const [comment, setComment] = useState();
    const [onclick, setOnClick] = useState(false);
    useEffect(() => {
        axios
        .post(`/binhluan/${MaSP}`)
        .then((res) => {
            setLstComment(res.data);
        })
        .catch((err)=> {
            console.log(err + " Lỗi không lấy được danh sách bình luận");
        });
    }, []);

    const handleResponse = () => {
      setOnClick(true);
    }

    

    const handleSubmit = (e) => {
      console.log(comment);

    }
    return (
        <>
    { lstComment && lstComment.map((comment) => {
        return (
            <div key={comment.id}>
                <div className='row'>
                <Avatar
                className={classes.small}
                variant='square'
                >{comment["Khachhang.Taikhoan.TenTK"].slice(0,1)}
                </Avatar>
                
                <h5 className="col-sm-2 fw-bold">
                {comment["Khachhang.Taikhoan.TenTK"]}
                </h5>
                </div>
                
                <div className="row">
                  {comment.BL_Noidung}
                </div>
                <div className="row mt-2">
                <button className='text-primary border-0 col-1' onClick={handleResponse}>Trả lời</button>
                <div className='col-sm-2 fst-italic'> - {dateFormat(comment.BL_Ngaybinhluan, "hh:mm:ss dd-mm-yyyy")}</div>
                </div>
                {onclick && onclick === true ? (
                  <div className="row mt-4" >
                  <textarea
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      outline: "none",
                      resize: "none",
                    }}
                    rows={3}
                   
                    onChange={value => setComment(value.target.value)}
                    className="col-8 me-3 rounded-2 border border-secondary py-2"
                    placeholder="Nhập bình luận của bạn..."
                  ></textarea>
                  <button
                    className="col-1 h-50 mt-5 btn btn-primary justify-content-center"
                    onClick={handleSubmit}
                  >
                    Gửi
                  </button>
                </div>
                ) : (<></>)
                }
            </div>
        )
    })
    }
    </>
  )
}

export default ListComment