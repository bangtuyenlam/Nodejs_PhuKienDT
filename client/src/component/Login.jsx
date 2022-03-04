import React, {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import Home from './Home';


function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  const loginSubmit = () => {
      axios
        .post('/account/login', {
            username: username,
            password: password
        })
        .then((res) => {
            console.log('login');
            console.log(res.data);
            window.location.href = "/";
        })
        .catch((error)=> {
            if (error.response.status === 401)
            console.log(error.response.data.message);
          else if (error.response.status === 400)
            console.log(error.response.data.message);
          else console.log("Lỗi. Vui lòng thử lại lần nữa.");
        })
  }
  const handleCancel = () => {
      window.location.href = "/";
  };
    
  return (
    <form>
        <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Tên tài khoản: </label>
            <div className="col-sm-10">
            <input 
                className='form-control'
                type="text"
                value={username}
                onChange={(value) => setUsername(value.target.value)}
            ></input>
            </div>
        </div>
        <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Mật khẩu: </label>
            <div className="col-sm-10">
            <input 
                className='form-control'
                type="password"
                value={password}
                onChange={(value) => setPassword(value.target.value)}
            ></input>
            </div>
        </div>
        <div className="d-grid gap-2">
            <button className='btn btn-primary' type='button' onClick={loginSubmit}> Đăng nhập</button>
        </div>
        <br/>
        <div className="d-grid gap-2">
            <button className='btn btn-primary' type='button' onClick={handleCancel}> Hủy</button>
        </div>
    </form>
  )
}

export default Login