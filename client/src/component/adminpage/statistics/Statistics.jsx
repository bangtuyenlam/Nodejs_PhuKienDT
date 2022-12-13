import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function Statistics() {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [listyear, setListYear] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [sumFinishReceipt, setSumFinishReceipt] = useState();
  const [finishList, setFinishList] = useState([]);
  const [cancelList, setCancelList] = useState([]);
  const [revenuebymonth, setRevenueByMonth] = useState([]);
  const [tongdoanhthu, setTongDoanhThu] = useState(0);
  const [donchoduyet, setDonChoDuyet] = useState();
  useEffect(() => {
    getData();
    getReceipt();
    getFinhishList();
    getCancelList();
    getRevenuebyMonth();
    getYear();
    getOrderNeedApprove();
  }, [month, year]);

  const getOrderNeedApprove = () => {
    axios.get("/thongke/choduyetdon")
    .then((res) => {
      setDonChoDuyet(res.data);
    })
  }
 
  const getData = () => {
    axios
      .post("/thongke/nam/doanhthu", {
        year: year,
      })
      .then((res) => {
        setRevenue(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getYear = () => {
    axios
      .get("/thongke/laynam")
      .then((res) => {
        setListYear(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRevenuebyMonth = () => {
    let a = 0;
    axios
      .post("/thongke/thang/doanhthu", {
        month: month,
        year: year,
      })
      .then((res) => {
        setRevenueByMonth(res.data);
        res.data.map((item) => (a += item.tongtien));
        setTongDoanhThu(a);
        // console.log(res.data);
      });
  };

  function formatCash(str) {
    return str.toString().split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
 }

  const getReceipt = () => {
    axios
      .post("/thongke/nam/donhang", {
        month: month,
        year: year,
      })
      .then((res) => {
        setReceipt(res.data);
        // console.log(res.data);
      });
  };

  const getFinhishList = () => {
    axios
      .post("/thongke/nam/hoanthanh", {
        year: year,
        month: month,
      })
      .then((res) => {
        setFinishList(res.data);
        setSumFinishReceipt(res.data[month-1]);
      });
  };

  const getCancelList = () => {
    axios
      .post("/thongke/nam/dahuy", {
        year: year,
        month: month,
      })
      .then((res) => {
        setCancelList(res.data);
        // console.log(res.data);
      });
  };

 

  const labels = [
    "Tháng một",
    "Tháng hai",
    "Tháng ba",
    "Tháng tư",
    "Tháng năm",
    "Tháng sáu",
    "Tháng bảy",
    "Tháng tám",
    "Tháng chín",
    "Tháng mười",
    "Tháng mười một",
    "Tháng mười hai",
  ];

  const selectMonthChange = (value) => {
    setMonth(value.target.value);
    const val = value.target.value - 1;
    setSumFinishReceipt(finishList[val]);
  };
  
  const selectYearChange = (value) => {
    setYear(value.target.value);
  };

  return (
    <div className="customer bg-light bg-opacity-100">
      <div className="">
        <h5 className=" fw-bolder me-2">Chọn thống kê</h5>
        <div className="d-flex flex-row bd-highlight mb-2">
          <select
            className="p-2 border-1"
            id="order"
            onChange={selectMonthChange}
            placeholder="Sắp xếp: "
          >
            <option defaultValue value={date.getMonth() + 1}>
              Chọn tháng
            </option>

            <option value={1} key={1}>
              Tháng một
            </option>
            <option value={2} key={2}>
              Tháng hai
            </option>
            <option value={3} key={3}>
              Tháng ba
            </option>
            <option value={4} key={4}>
              Tháng tư
            </option>
            <option value={5} key={5}>
              Tháng năm
            </option>
            <option value={6} key={6}>
              Tháng sáu
            </option>
            <option value={7} key={7}>
              Tháng bảy
            </option>
            <option value={8} key={8}>
              Tháng tám
            </option>
            <option value={9} key={9}>
              Tháng chín
            </option>
            <option value={10} key={10}>
              Tháng mười
            </option>
            <option value={11} key={11}>
              Tháng mười một
            </option>
            <option value={12} key={12}>
              Tháng mười hai
            </option>
          </select>

          <select
            className="p-2 ps-2 border-1"
            id="order"
            onChange={selectYearChange}
            placeholder="Sắp xếp: "
          >
            <option defaultChecked value={date.getFullYear()}>
              Chọn năm
            </option>

            {listyear &&
              listyear.map((val) => {
                return (
                  <option value={val.year} key={1}>
                    {val.year}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-6 col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body px-3 py-4-5 bg-info">
              <div className="row">
                {/* <div className="col-md-4">
                  <div className="stats-icon purple">
                    <i className="iconly-boldShow"></i>
                  </div>
                </div> */}
                <div className="col-md-8">
                  <h6 className="text-muted font-semibold">
                    Tổng doanh thu
                  </h6>
                  <h6 className="font-extrabold mb-0 text-center">{formatCash(tongdoanhthu)} đ</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body px-3 py-4-5 bg-danger bg-opacity-100">
              <div className="row">
                {/* <div className="col-md-4">
                  <div className="stats-icon blue">
                    <i className="iconly-boldProfile"></i>
                  </div>
                </div> */}
                <div className="col-md-12">
                  <h6 className="text-muted font-semibold">Tổng đơn hàng</h6>
                  <h6 className="font-extrabold mb-0 text-center">{sumFinishReceipt}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body px-3 py-4-5 bg-success bg-opacity-50">
              <div className="row">
                {/* <div className="col-md-4">
                  <div className="stats-icon green">
                    <i className="iconly-boldAdd-User"></i>
                  </div>
                </div> */}
                <div className="col-md-12">
                  <h6 className="text-muted font-semibold">Đơn hàng cần duyệt</h6>
                  <h6 className="font-extrabold mb-0 text-center">{donchoduyet}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<div className="row">
      <div
        className=" bg-white mt-2 shadow-sm rounded-4 col-6"
        style={{
          height: "20%",
          width: "50%",
          position: "relative",
          marginBottom: "30px",
        }}
      >
        <Bar
          data={{
            labels: revenuebymonth.map((item) => item.day),
            datasets: [
              {
                label: "VNĐ",
                backgroundColor: "rgba(220, 189, 43, 0.6)",
                data: revenuebymonth.map((item) => item.tongtien),
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                position: "top",
                display: true,
                text: "Doanh thu theo tháng",
              },
            },
          }}
        />
      </div>
      <div
       className=" bg-white mt-2 shadow-sm rounded-4 col-6"
        style={{
          height: "20%",
          width: "50%",
          position: "relative",
          marginBottom: "30px",
        }}
      >
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                data: receipt,
                label: "Đơn đặt",
                borderColor: "#3e95cd",
              },
              {
                data: finishList,
                label: "Đã hoàn thành",
                borderColor: "#8e5ea2",
              },
              {
                data: cancelList,
                label: "Đã hủy đơn",
                borderColor: "#3cba9f",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                position: "bottom",
                display: true,
                text: "Thống kê đơn hàng theo năm",
              },
            },
          }}
        />
      </div>
      </div>
      <div
        className=" bg-white mt-2 shadow-sm rounded-4"
        style={{
          height: "20%",
          width: "60%",
          position: "relative",
          marginBottom: "30px",
        }}
      >
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "VNĐ",
                backgroundColor: "rgba(90, 30, 101, 0.6)",
                data: revenue,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                position: "top",
                display: true,
                text: "Doanh thu theo năm",
              },
            },
          }}
        />
      </div>

   
    </div>
  );
}

export default Statistics;
