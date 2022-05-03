import React from 'react';
import SidePersonal from '../sidePersonal/SidePersonal';
import { Route, Routes } from "react-router-dom";
import "./personalPage.css";
import Customer from '../../customer/Customer';
import { getUser} from "../../../Utils/Common";
import ListOrder from '../listorder/ListOrder';
import DonDatCT from '../dondatct/DonDatCT';
export default function PersonalPage() {
    const user = getUser();
  return (
    <div className="container" style={{ display: "flex", marginTop: "100px"}}>
        <SidePersonal/>
        <Routes>
          <Route path="/:id" element={<Customer />} />
          <Route path='/listorder' element ={<ListOrder customer = {user}/>}/>
          <Route path='/orderdetail/:id' element={<DonDatCT/>}/>
        </Routes>
    </div>
  )
}
