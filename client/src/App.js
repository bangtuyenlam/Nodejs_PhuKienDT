import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setbackendData] = useState([{}]);

  useEffect(() => {
    fetch("/baidang")
      .then((res) => res.json())
      .then((data) => {
        setbackendData(data);
      });
  }, []);
  return (
    <div>
      {backendData.map((user) => {
        return (
          <div>
            <p>{user.id}</p>
            <p>{user.TenTK}</p>
            <p>{user.Matkhau}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
