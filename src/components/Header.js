import React from "react";
import logo from "../images/logo.png";

const Header = (props) => {
    return (
        <>
            <div className="site-header">
                <div className="container">
                    <a href="#" className="branding">
                        <img src={logo} alt="" className="logo"/>
                        <div className="logo-type">
                            <h1 className="site-title">Adpeako</h1>
                            <small className="site-description">Weather app</small>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Header