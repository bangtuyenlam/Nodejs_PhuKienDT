import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { setUserSession, removeUserSession } from "../../Utils/Common";
import { useNavigate } from "react-router";
import "./login.css";
import { Link } from "react-router-dom";
import Googleicon from "../image/google.png";
import ReCAPTCHA from "react-google-recaptcha";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [recaptcha_token, setRecaptcha_token] = useState("");
  const navigate = useNavigate();
  const reRef = useRef();
  const loginSubmit = () => {
    if (!recaptcha_token) {
      setError("Vui lòng xác thực reCAPTCHA");
      return;
  }
  
    reRef.current.reset();

    axios
      .post("/account/login", {
        username: username,
        password: password,
        recaptcha_token: recaptcha_token,
      })
      .then((res) => {
        console.log("login");
        console.log(res.data.user[0]["Khachhang.Maquyen"]);
        setUserSession(res.data.token, res.data.user[0]);
        if (res.data.user[0]["Khachhang.Maquyen"]) {
          navigate("/");
        } else {
          // if(res.data.user["Nhanvien.Maquyen"] == 2)
          //     navigate('/');
          //  else
          navigate("/admin");
        }
      })
      .catch((error) => {
        if(error.response.status === 402) {
          setError(error.response.data.message);
        }
        else if (error.response.status === 401) {
          console.log(error.response.data.message);
          setError(error.response.data.message);
        } else if (error.response.status === 400) {
          setError(error.response.data.message);

          console.log("Mật khẩu chưa đúng");
        } else setError("Lỗi. Vui lòng thử lại lần nữa.");
      }) 
      
  };

  const handleCancel = () => {
    navigate("/");
    removeUserSession();
  };

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  useEffect(() => {
    axios
      .get("/auth/login/success")
      .then((res) => {
        setUserSession(res.data.user[0].token, res.data.user[0]);
        })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <div className="login">
      <div className="margin-form">
        <form className="form-login">
          {/* <div class="form-group text-center">
            <label className="form-label fw-bold text-black-50 fs-4">
              Đăng nhập website
            </label>
          </div> */}
          <div className="mb-3 row">
            <label className="form-label fw-bold text-black-50">
              Tên tài khoản
            </label>
            <div className="col-sm">
              <input
                className="form-control"
                type="text"
                value={username}
                onChange={(value) => setUsername(value.target.value)}
              ></input>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="form-label fw-bold text-black-50">Mật khẩu</label>
            <div className="col-sm">
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(value) => setPassword(value.target.value)}
              ></input>
            </div>
          </div>

          <div className="col-sm">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA}
              ref={reRef}
              onChange={(recaptcha_token) => setRecaptcha_token(recaptcha_token)}
              onExpired={(e) => setRecaptcha_token("")}
            />
            <br />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={loginSubmit}
            >
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
              Hủy
            </button>
          </div>
          <br />

          <div className="d-grid gap-2">
            <div className="below">
              <div className="line" />
              <div className="or"> Hoặc</div>
            </div>
            <button className="btn btn-danger" type="button" onClick={google}>
              <img src={Googleicon} alt="" className="icon" />
              Đăng nhập bằng Google
            </button>
          </div>
          <br />
          <div className="register">
            <p>
              Bạn chưa có tài khoản?{" "}
              <Link to={"/register"}> Đăng kí tại đây</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
