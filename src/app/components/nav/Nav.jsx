import React, { Component } from "react";
import PropTypes from "prop-types"; //ES6

import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let navData = this.props.navData;
    return (
      <div className="component-nav menu cid-rnSYDkEoCv" id="menu1-n">
        <nav className="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div className="menu-logo">
                <div className="navbar-brand">
                    <span className="navbar-logo">
                        <a href="#">
                            <img src={navData.brandIco} alt={navData.navbarCaption} title=""/>
                        </a>
                    </span>
                    <span className="navbar-caption-wrap"><a className="navbar-caption text-white display-5" href="#">{navData.navbarCaption}</a></span>
                </div>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                    { navData.navItems.map(data => {
                            return (
                                <li className="nav-item" key={data.itemName}>
                                    <a className="nav-link link text-white display-4" href={data.link}>
                                    <span className={"mbr-iconfont mbr-iconfont-btn " + data.icon}></span>
                                        {data.itemName}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
      </div>
    );
  }
}

Nav.propTypes = {};

export default Nav;
