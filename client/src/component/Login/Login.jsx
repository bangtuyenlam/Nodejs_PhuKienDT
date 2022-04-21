import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { setUserSession } from "../../Utils/Common";
import { useNavigate } from "react-router";
import "./login.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginSubmit = () => {
    axios
      .post("/account/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("login");
        console.log(res.data.token);
        setUserSession(res.data.token, res.data.tentk);
        if (res.data.user["Khachhang.Maquyen"]) {
          navigate("/");
        } else {
          // if(res.data.user["Nhanvien.Maquyen"] == 2)
          //     navigate('/');
          //  else
          navigate("/admin");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error.response.data.message);
          setError(error.response.data.message);
        } else if (error.response.status === 400) {
          setError(error.response.data.message);

          console.log("Mật khẩu chưa đúng");
        } else setError("Lỗi. Vui lòng thử lại lần nữa.");
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="wrapper">
      <form className="form-login">
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Tên tài khoản: </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(value) => setUsername(value.target.value)}
            ></input>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Mật khẩu: </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(value) => setPassword(value.target.value)}
            ></input>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={loginSubmit}
          >
            {" "}
            Đăng nhập
          </button>
        </div>
        <br />
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleCancel}
          >
            {" "}
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
