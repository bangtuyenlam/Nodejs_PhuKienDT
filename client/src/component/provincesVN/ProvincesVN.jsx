import React, {useEffect, useState} from 'react';
import axios from 'axios';
function ProvincesVN() {
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState();
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState();
    const URL = "https://provinces.open-api.vn/api";
    useEffect(() => {
        axios.get(`${URL}/?depth=1`)
        .then((res)=> {
            setProvinces(res.data);
        })
        if(province == "") {
            setWards([]);
        }
    }, [districts, wards, province]);
   

    const selectChange = (e) => {
      let index = e.nativeEvent.target.selectedIndex;
      let label = e.nativeEvent.target[index].text;
        setProvince({code: e.target.value, label: label});
        if(e.target.value === "") {
            setDistricts([]);
        }
        else
        axios.get(`${URL}/p/${e.target.value}/?depth=2`)
        .then((res)=> {
            setDistricts(res.data.districts);
        })
    }

    console.log(province);

    const selectChangeDistrict = (e) => {
        setDistrict(e.target.value);
        if(e.target.value === "") {
            setWards([]);
        }
        else
        axios.get(`${URL}/d/${e.target.value}/?depth=2`)
        .then((res)=> {
            setWards(res.data.wards);
        })
    }
    

    const selectChangeWard = (e) => {
        setWard(e.target.value);
    }
    
  return (
    <div className="row">
        <div className="col-4">
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
    <div className="col-4">
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
    <div className="col-4">
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
  </div>
  )
}

export default ProvincesVN