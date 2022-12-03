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
  LineElement
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
  const [date, setDate] = useState(new Date());
  const [revenue, setRevenue] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [finishList, setFinishList] = useState([]);
  const [cancelList, setCancelList] = useState([]);
  const [revenuebymonth, setRevenueByMonth] = useState([]);
  const [tongdoanhthu, setTongDoanhThu] = useState(0);
  useEffect(() => {
    getData();
    getReceipt();
    getFinhishList();
    getCancelList();
    getRevenuebyMonth();
  }, []);
console.log(revenuebymonth);
  const getData = () => {
    axios
      .post("/thongke/nam/doanhthu", {
        year: date.getFullYear(),
      })
      .then((res) => {
        setRevenue(res.data);
        console.log(res.data);
      });
  };

  const getRevenuebyMonth = () => {
    let a = 0;
    axios
      .post("/thongke/thang/doanhthu", {
        month: date.getMonth(),
      })
      .then((res) => {
        setRevenueByMonth(res.data);
        res.data.map(item => a += item.tongtien)
        setTongDoanhThu(a)
        console.log(res.data);
      });
  };

  const getReceipt = () => {
    axios
    .post("/thongke/nam/donhang", {
      year: date.getFullYear(),
    }).then((res) => {
      setReceipt(res.data);
      console.log(res.data);
    })
  }

  const getFinhishList = () => {
    axios
    .post("/thongke/nam/hoanthanh", {
      year: date.getFullYear()
    }).then((res) => {
      setFinishList(res.data);
      console.log(res.data);
    })
  }

  const getCancelList = () => {
    axios
    .post("/thongke/nam/dahuy", {
      year: date.getFullYear()
    }).then((res) => {
      setCancelList(res.data);
      console.log(res.data);
    })
  }

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

  

  return (
    <div className="customer">
      <div class="row">
                            <div class="col-6 col-lg-3 col-md-6">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon purple">
                                                    <i class="iconly-boldShow"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="text-muted font-semibold">Tổng doanh thu</h6>
                                                <h6 class="font-extrabold mb-0">{tongdoanhthu}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3 col-md-6">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon blue">
                                                    <i class="iconly-boldProfile"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="text-muted font-semibold">Tổng đơn hàng</h6>
                                                <h6 class="font-extrabold mb-0">183.000</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3 col-md-6">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon green">
                                                    <i class="iconly-boldAdd-User"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="text-muted font-semibold">Số khách hàng</h6>
                                                <h6 class="font-extrabold mb-0">80.000</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>


      <div
        className=" bg-light mt-2 shadow-sm rounded-4"
        style={{
          height: "30%",
          width: "70%",
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
                backgroundColor: "rgba(53, 162, 235, 0.5)",
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



<div
        className=" bg-light mt-2 shadow-sm rounded-4"
        style={{
          height: "30%",
          width: "70%",
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
                backgroundColor: "rgba(53, 162, 235, 0.5)",
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
<div  style={{
          height: "200px",
          width: "600px",
          position: "relative",
          paddingTop: "100px"
        }}>
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
      ]
    }}
    options={{
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          position: 'bottom',
          display: true,
          text: 'Thống kê đơn hàng theo năm',
        },
      },
    }}
  />
</div>
    </div>
  );
}

export default Statistics;
