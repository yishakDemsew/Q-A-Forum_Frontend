import React from "react";
import img from "../../images/evangadiLogo.png";
import "./Footer.css";

function Footer() {
    return (
        <div className="mainFooterWrapper">
            <div className="parent-div">
                <img src={img} alt="evangadi logo" />
                {/* social media icons */}
                <div>
                    <ul className="social-icons">
                        <li>
                            <a href="#">
                                <span className="material-icons">facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="material-icons">twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="material-icons">
                                    instagram
                                </span>
                            </a>
                        </li>
                        {/* Add more icons as needed */}
                    </ul>
                </div>
            </div>
            <div className="parent-div">
                <ul className="footer">
                    <li>
                        <h3>Useful Link</h3>
                    </li>
                    <div className="color">
                        <li>How it works</li>
                        <li>Terms of Service</li>
                        <li>Privacy policy</li>
                    </div>
                </ul>
            </div>

            <div className="parent-div">
                <ul className="footer">
                    <li>
                        <h3>Contact Info</h3>
                    </li>
                    <div className="color">
                        <li>Evangadi Networks</li>
                        <li>support@evangadi.com</li>
                        <li>+1-202-386-2702</li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
