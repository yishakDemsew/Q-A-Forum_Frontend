// import React from "react";
// import { Link } from "react-router-dom";
// import img from "../../images/evangadiHeader.png";
// import "./Header.css";

// function Header() {
//     return (
//         <div className="navbar">
//             <div className="mainHeaderWrapper">
//                 <div>
//                     <Link to="/">
//                         <img
//                             className="evangadiImage"
//                             src={img}
//                             alt="evangadi logo"
//                         />
//                     </Link>
//                 </div>
//                 <div>
//                     <ul className="lists">
//                         <li>
//                             <Link to="/">Home</Link>
//                         </li>
//                         <li>
//                             <Link to="/how-it-works">How it works</Link>
//                         </li>

//                         <li>
//                             <Link to="/sign-in" className="button">
//                                 SIGN IN
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;

// updated
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../images/evangadiHeader.png";
import "./Header.css";
import { state } from "../stateValue"; // Update the import path
// import { useNavigate } from "react-router-dom";

function Header() {
    const { username, setUserName } = useContext(state);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location

    console.log("Username in Header:", username);
    // const [forceUpdate, setForceUpdate] = useState(false);

    // useEffect(() => {
    //     if (username) {
    //         setForceUpdate(true); // Trigger re-render
    //     }
    // }, [username]);

    const handleSignOut = () => {
        // 1. Clear the user's session/token (Example: clearing local storage)
        localStorage.removeItem("token"); // Remove the token from local storage

        // 2. Clear the username from context
        setUserName("");

        // 3. Redirect the user to the homepage
        navigate("/");
    };

    const allowedPaths = ["/home", "/dashboard"];

    return (
        <div className="navbar" key={username}>
            <div className="mainHeaderWrapper">
                <div>
                    <Link to="/">
                        <img
                            className="evangadiImage"
                            src={img}
                            alt="evangadi logo"
                        />
                    </Link>
                </div>
                <div>
                    <ul className="lists">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/how-it-works">How it works</Link>
                        </li>
                        <li>
                            {/* {username && location.pathname === "/home" ? (
                                // If user is authenticated, show Sign Out button or username
                                <button
                                    onClick={() => handleSignOut()}
                                    className="button"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                // If user is not authenticated, show Sign In button
                                <Link to="/" className="button">
                                    SIGN IN
                                </Link>
                            )} */}
                            {/*  */}
                            {!username ? (
                                // If user is authenticated, show Sign Out button or username
                                <Link to="/" className="button">
                                    SIGN IN
                                </Link>
                            ) : (
                                // If user is not authenticated, show Sign In button
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                    }}
                                >
                                    <Link to="/home" className="qst">
                                        Quest.
                                    </Link>
                                    <button
                                        onClick={() => handleSignOut()}
                                        className="button"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
