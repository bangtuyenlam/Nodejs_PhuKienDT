import React from 'react';
import "./topbar.css";
import {NotificationsNone, Settings, AccountCircle} from '@material-ui/icons'
import { Link } from 'react-router-dom';
export default function Topbar() {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
        <div className="topLeft">
            <span className="logo">
            <Link className='topbarLink' to={'/admin/'}>
              Quản lý shop
              </Link>
                </span>
        </div>
        <div className="topRight">
            <div className="topbarIconContainer">
                <NotificationsNone/>
                <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <Settings/>
            </div>
            <div className="topbarIconContainer">
                <AccountCircle/>
            </div>
        </div>
        </div>
        
        
        </div>
  )
}
