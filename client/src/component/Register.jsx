import React, { useState } from "react";
import axios from "axios";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmpwd] = useState("");
  const [error, setError] = useState("");

  const registerSubmit = () => {
    axios
      .post("/account/register", {
        username: username,
        password: password,
        confirmPwd: confirmPwd,
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
    <form>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Tên tài khoản: </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(value) => setUsername(value.target.value)}
          ></input>
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Mật khẩu: </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(value) => setPassword(value.target.value)}
          ></input>
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Mật khẩu: </label>
        <div className="col-sm-10">
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
  );
}

export default Register;
