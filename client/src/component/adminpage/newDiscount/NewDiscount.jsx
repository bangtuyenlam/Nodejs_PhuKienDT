import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  FormControl,
  makeStyles,
  Paper,
  Chip,
} from "@material-ui/core";
import "./newdiscount.css";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

function newDiscount() {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [idSelected, setIdSelected] = useState([]);
  const [name, setName] = useState();
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [percent, setPercent] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  useEffect(() => {
    axios.get("/sanpham").then((res) => {
      setProductList(res.data);
    });
  });

  const isAllSelected =
    productList.length > 0 && selected.length === productList.length;

  const handleChange = (event) => {
    const value = event.target.value;
    const idlist = [];
    productList.map((val) => {
      value.map((product) => {
        if (product === val.SP_Ten) idlist.push(val.id);
      });
    });
    console.log(value, idlist);
    if (value[value.length - 1] === "all") {
      setSelected(
        selected.length === productList.length
          ? []
          : productList.map((a) => {
              return a.SP_Ten;
            })
      );
      setIdSelected(
        selected.length === productList.length
          ? []
          : productList.map((a) => {
              return a.id;
            })
      );
      return;
    }
    setIdSelected(idlist);
    setSelected(value);
  };

  const handleDateStartChange = (date) => {
    setDateStart(date);
    setDateEnd(date);
  };

  const handleDateEndChange = (date) => {
    setDateEnd(date);
    // if (dateStart <= dateEnd) {
    //   Swal.fire({
    //     title: "Lỗi!",
    //     text: "Thời gian kết thúc phải sau thời gian bắt đầu",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });
    // }
  };
  const handleCreate = () => {
    if (dateStart >= dateEnd) {
      Swal.fire({
        title: "Lỗi!",
        text: "Thời gian kết thúc phải sau thời gian bắt đầu",
        icon: "error",
        confirmButtonText: "OK",
      });
    }else{
      axios.post("/khuyenmai/them", {
        KM_Ten: name,
        Ngaybatdau: dateStart,
        Ngayketthuc: dateEnd,
        Phantram: percent,
        DsSP: idSelected,
      })
      .then((res) => {
        navigate("/admin/discountProducts");
      })
      .catch((error) => {
        if(error.response.status === 402){
          setError(error.response.data.message);
          console.log("Lỗi nhập chưa nhập đủ thông tin");
        }
        else
        console.log("Cập nhật không thành công");
      })
    }
  }
  return (
    <div className="newProduct">
      <h4 className="newProductTitle">Thêm sản phẩm</h4>
      <form className="newProductForm">
        <div className="newCustomerItem">
          <label> Tên khuyến mãi</label>
          <input
            type="text"
            value={name}
            onChange={(value) => setName(value.target.value)}
          ></input>
        </div>
        <div className="newCustomerItem">
          <label> Ngày bắt đầu </label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              id="date-picker-dialog"
              format="dd/MM/yyyy hh:mm a"
              value={dateStart}
              onChange={handleDateStartChange}
              disablePast={true}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="newProductItem">
          <label> Phần trăm khuyến mãi</label>
          <input
            type="number"
            value={percent}
            onChange={(value) => setPercent(value.target.value)}
          ></input>
        </div>
        <div className="newCustomerItem">
          <label> Ngày kết thúc </label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              id="date-picker-dialog"
              format="dd/MM/yyyy hh:mm a"
              value={dateEnd}
              onChange={handleDateEndChange}
              disablePast={true}
              minDate={dateStart}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="newCustomerItem">
          {productList && (
            <FormControl className={classes.formControl}>
              <InputLabel id="mutiple-select-label">Chọn sản phẩm</InputLabel>
              <Select
                labelId="mutiple-select-label"
                multiple
                value={selected}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                <MenuItem
                  value="all"
                  classes={{
                    root: isAllSelected ? classes.selectedAll : "",
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      classes={{ indeterminate: classes.indeterminateColor }}
                      checked={isAllSelected}
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < productList.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.selectAllText }}
                    primary="Tất cả"
                  />
                </MenuItem>
                {productList.map((option) => (
                  <MenuItem key={option.id} value={option.SP_Ten}>
                    <ListItemIcon>
                      <Checkbox
                        checked={selected.indexOf(option.SP_Ten) > -1}
                      />
                    </ListItemIcon>
                    <ListItemText primary={option.SP_Ten} />
                  </MenuItem>
                ))}
              </Select>
             
            </FormControl>
          )}
        </div>
        {/* <div className="newProductItem">
                <Paper className={classes.root}>
                  {selected.length === productList.length ? (
                    <Chip label="Chọn tất cả" className={classes.chip} />
                  ) : (
                    selected.map((value) => (
                      <li key={value}>
                        <Chip
                          label={value.substring(0, 50)}
                          className={classes.chip}
                        />
                      </li>
                    ))
                  )}
                </Paper>
              </div> */}
      </form>
      <button
          className="newCustomerButton"
          type="button"
          onClick={handleCreate}
        >
          Lưu
        </button>
    </div>
  );
}

export default newDiscount;
