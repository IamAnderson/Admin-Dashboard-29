import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Topbar() {

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span><Link to="/" reloadDocument className="logo">29 Admin</Link></span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">3</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="display_div"> 
            29 
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
