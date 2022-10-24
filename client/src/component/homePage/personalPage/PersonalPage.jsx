import React from 'react';
import SidePersonal from '../sidePersonal/SidePersonal';
import { Route, Routes } from "react-router-dom";
import "./personalPage.css";
import Customer from '../../customer/Customer';
import { getUser} from "../../../Utils/Common";
import ListOrder from '../listorder/ListOrder';
import DonDatCT from '../dondatct/DonDatCT';
import ListPurchased from '../listpurchased/ListPurchased';
import Review from '../review/Review';
import Reviewed from '../reviewed/Reviewed';
export default function PersonalPage() {
    const user = getUser();
  return (
    <div className="container" style={{ display: "flex", paddingTop: "50px"}}>
        <SidePersonal/>
     
        <Routes>
          <Route path="/:id" element={<Customer />} />
          <Route path='/listorder' element ={<ListOrder customer = {user}/>}/>
          <Route path='/orderdetail/:id' element={<DonDatCT/>}/>
          <Route path='/review-product' element={<ListPurchased customer = {user}/>}/>
          <Route path='/review-product/rating/:id' element={<Review/>}/>
          <Route path='/reviewed-product/:id' element={<Reviewed/>}/>
        </Routes>
    </div>
  )
}
