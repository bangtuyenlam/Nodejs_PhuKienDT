import React, {useState} from 'react';
import axios from 'axios';

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
        })
        .catch((error)=> {
            if (error.response.status === 401)
            console.log(error.response.data.message);
          else if (error.response.status === 400)
            console.log(error.response.data.message);
          else console.log("Lỗi. Vui lòng thử lại lần nữa.");
        })
  }
    
  return (
    <form>
        <div>
            <label>Tên tài khoản: </label>
            <input 
                type="text"
                value={username}
                onChange={(value) => setUsername(value.target.value)}
            ></input>
        </div>
        <div>
            <label>Mật khẩu: </label>
            <input 
                type="password"
                value={password}
                onChange={(value) => setPassword(value.target.value)}
            ></input>
        </div>
        <div>
            <button type='button' onClick={loginSubmit}> Đăng nhập</button>
        </div>
    </form>
  )
}

export default Login