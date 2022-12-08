import React, {useEffect, useState} from 'react';
import axios from 'axios';
function ProvincesVN({getAddress}) {
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState();
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState();
    const [street, setStreet] = useState("");
    const URL = "https://provinces.open-api.vn/api";
    useEffect(() => {
        axios.get(`${URL}/?depth=1`)
        .then((res)=> {
            setProvinces(res.data);
        })
        if(province && province.code === "") {
            setWard({code: "", label: "Chọn Phường / Xã"});
            setDistrict({code: "", label: "Chọn Quận / Huyện"});
            setWards([]);
        }
    }, [district, ward, province]);
   

    const selectChange = (e) => {
      let index = e.nativeEvent.target.selectedIndex;
      let label = e.nativeEvent.target[index].text;
        setProvince({code: e.target.value, label: label});
        if(e.target.value === "") {
            setDistricts([]);
            setDistrict({code: "", label: "Chọn Quận / Huyện"})
        }
        else
        axios.get(`${URL}/p/${e.target.value}/?depth=2`)
        .then((res)=> {
            setDistricts(res.data.districts);
        })
    }

    const selectChangeDistrict = (e) => {
      let index = e.nativeEvent.target.selectedIndex;
      let label = e.nativeEvent.target[index].text;
        setDistrict({code: e.target.value, label: label});
        if(e.target.value === "") {
            setWards([]);
            setWard({code: "", label: "Chọn Phường / Xã"})
        }
        else
        axios.get(`${URL}/d/${e.target.value}/?depth=2`)
        .then((res)=> {
            setWards(res.data.wards);
        })
    }
    

    const selectChangeWard = (e) => {
      let index = e.nativeEvent.target.selectedIndex;
      let label = e.nativeEvent.target[index].text;
        setWard({code: e.target.value, label:label});
      
    }
    
  return (
    <div>
    <div className="row">
        <div className="col-6">
    <label>Tỉnh / Thành phố</label>
    <select
      className="form-control"
      id="province"
      onChange={selectChange}
    >
      <option default value="">
        Chọn tỉnh / thành phố
      </option>

      {provinces.map((province) => {
        return (
          <option value={province.code} key={province.code}>
            {province.name}
          </option>
        );
      })}
    </select>
    </div>
    <div className="col-6">
    <label>Quận / Huyện </label>
    <select
      className="form-control"
      id="province"
      onChange={selectChangeDistrict}
    >
      <option default value="">
        Chọn Quận / Huyện
      </option>

      {districts.map((district) => {
        return (
          <option value={district.code} key={district.code}>
            {district.name}
          </option>
        );
      })}
    </select>
    </div>
    <div className="w-100"></div>
    <div className="col-6 mt-2">
    <label>Phường / Xã </label>
    <select
      className="form-control"
      id="province"
      onChange={selectChangeWard}
    >
      <option default value="">
        Chọn Phường / Xã
      </option>

      {wards.map((ward) => {
        return (
          <option value={ward.code} key={ward.code}>
            {ward.name}
          </option>
        );
      })}
    </select>
    </div>
    <div className='col-6 mt-2'>
    <label>Tên đường / số nhà </label>
      <input 
      type="text"
      value={street}
      className="form-control"
      onChange={(value) => setStreet(value.target.value)}/>
    </div>
  </div>
  
  <div className="d-grid gap-2 d-md-flex justify-content-md-end">

  <button
            className="btn btn-primary mt-2"
            onClick={() =>
              getAddress(province, district, ward, street)
            }
          >
            Lưu
          </button>
          </div>
  </div>
  )
}

export default ProvincesVN