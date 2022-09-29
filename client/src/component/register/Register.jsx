import React, { useState } from "react";
import axios from "axios";
import "./register.css";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPwd, setConfirmpwd] = useState("");
  const [error, setError] = useState("");

  const registerSubmit = () => {
    axios
      .post("/account/register", {
        username: username,
        password: password,
        confirmPwd: confirmPwd,
        email: email
      })
      .then((res) => {
        console.log("register success");
        window.location.href = "/login";
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.status === 404)
          setError(error.response.data.message);
        else if (error.response.status === 403)
          setError(error.response.data.message);
        else if (error.response.status === 402)
          setError(error.response.data.message);
        else if (error.response.status === 401)
          setError(error.response.data.message);
        else setError(error.response.data.message);
      });
  };
  const handleCancel = () => {
    window.location.href = "/";
  };
  return (
    <div className="signup">
      <div className="margin-form">
      <form className="form-sign-up">
      <div class="form-group text-center">
      <label className="form-label fw-bold text-black-50 fs-2">
            Đăng ký tài khoản
         </label>
         </div>
      <div className="mb-3 row">
      <label className="form-label fw-bold text-black-50">
              Email
            </label>
          <div className="col-sm">
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(value) => setEmail(value.target.value)}
            ></input>
          </div>
        </div>
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
        <label className="form-label fw-bold text-black-50">
              Mật khẩu
            </label>
          <div className="col-sm">
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(value) => setPassword(value.target.value)}
            ></input>
          </div>
        </div>
        <div className="mb-3 row">
        <label className="form-label fw-bold text-black-50">
              Xác nhận mật khẩu:
            </label>
          <div className="col-sm">
            <input
              className="form-control"
              type="password"
              value={confirmPwd}
              onChange={(value) => setConfirmpwd(value.target.value)}
            ></input>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={registerSubmit}
          >
            Đăng ký
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
    </div>
  );
}

export default Register;
