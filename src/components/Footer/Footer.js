import React from "react";
import img from "../../images/evangadiLogo.png";
import "./Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faYoutube,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
        <div className="mainFooterWrapper">
            <div className="parent-div1">
                <img src={img} alt="evangadi logo" />
                {/* Social media icons */}
                <div>
                    <ul className="social-icons">
                        <li>
                            <a
                                href="https://www.facebook.com/evangaditech"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="facebook" // Added class for Facebook
                            >
                                <FontAwesomeIcon
                                    icon={faFacebookF}
                                    className="social-icon"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/evangaditech/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="instagram" // Added class for Instagram
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="social-icon"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/@EvangadiTech"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="youtube" // Added class for YouTube
                            >
                                <FontAwesomeIcon
                                    icon={faYoutube}
                                    className="social-icon"
                                />
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
