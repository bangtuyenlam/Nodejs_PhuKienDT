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
  const [year, setYear] = useState(new Date());
  const [revenue, setRevenue] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [finishList, setFinishList] = useState([]);
  const [cancelList, setCancelList] = useState([]);
  useEffect(() => {
    getData();
    getReceipt();
    getFinhishList();
    getCancelList();
  }, []);

  const getData = () => {
    axios
      .post("/thongke/thang/doanhthu", {
        year: year.getFullYear(),
      })
      .then((res) => {
        setRevenue(res.data);
        console.log(res.data);
      });
  };

  const getReceipt = () => {
    axios
    .post("/thongke/thang/donhang", {
      year: year.getFullYear(),
    }).then((res) => {
      setReceipt(res.data);
      console.log(res.data);
    })
  }

  const getFinhishList = () => {
    axios
    .post("/thongke/thang/hoanthanh", {
      year: year.getFullYear()
    }).then((res) => {
      setFinishList(res.data);
      console.log(res.data);
    })
  }

  const getCancelList = () => {
    axios
    .post("/thongke/thang/dahuy", {
      year: year.getFullYear()
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
      <div
        style={{
          height: "200px",
          width: "600px",
          position: "relative",
          marginBottom: "30px"
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
