import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterAndLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterAndLogin() {
    const navigate = useNavigate();

    //states to store register data
    let [registerResponse, setRegisterResponse] = useState("");
    let [email, setEmail] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function agreeAndJoinHandler(e) {
        e.preventDefault();
        let dataRegister = {
            email: email,
            firstname: firstName,
            lastname: lastName,
            username: userName,
            password: password,
        };
        fetch("http://localhost:5500/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataRegister),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRegisterResponse(data.msg);
                navigate("/home");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    //states to store login data
    let [loginResponse, setLoginResponse] = useState("");
    let [loginEmail, setLoginEmail] = useState("");
    let [loginPassword, setLoginPassword] = useState("");

    function loginHandler(e) {
        e.preventDefault();
        let loginData = {
            email: loginEmail,
            password: loginPassword,
        };
        fetch("http://localhost:5500/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setLoginResponse(data.msg);
                const token = data.token;
                localStorage.setItem("token", token);
                if (data.msg == "user login successful") {
                    console.log(data.msg);
                    navigate("/home");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    //to toggle the register and login form
    let [regDis, setRegDis] = useState("display");
    let [logDis, setLogDis] = useState("");
    function registerDisplay() {
        setRegDis("display");
        setLogDis("");
    }
    function loginDisplay() {
        setLogDis("display");
        setRegDis("");
    }

    // The handleTogglePassword function toggles the showPassword state when the icon is clicked.
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            {/* register */}
            <div className={regDis}>
                <div className="mainRegisterWrapper">
                    <div className="secondRegisterWrapper">
                        <div className="joinNetwork">
                            <h3 className="textCenter">Join the network</h3>
                            <p className="textCenter">
                                Already have an account?{" "}
                                <span
                                    className="orange"
                                    onClick={registerDisplay}
                                >
                                    <a href="#">Sign in</a>
                                </span>
                            </p>
                        </div>

                        <h3 className="red">{registerResponse}</h3>

                        <div className="inputs">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <div className="firstAndLastName">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <br />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>

                            <br />
                            <input
                                type="text"
                                placeholder="User Name"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <br />
                            <div className="password-input-container">
                                <input
                                    // type="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div
                                    className="toggle-password"
                                    onClick={handleTogglePassword}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <p className="textCenter policy">
                                I agree to the <Link>privacy policy</Link> and{" "}
                                <Link>terms of service.</Link>
                            </p>
                            <div className="textCenter">
                                <button
                                    className="button"
                                    onClick={agreeAndJoinHandler}
                                >
                                    <Link to="/home" className="white">
                                        Agree and Join
                                    </Link>
                                </button>
                            </div>

                            <p className="textCenter">
                                <br />
                                <span
                                    className="orange"
                                    onClick={registerDisplay}
                                >
                                    Already have an account?
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* login */}
            <div className={logDis}>
                <div className="mainRegisterWrapper">
                    <div className="secondRegisterWrapper">
                        <div className="joinNetwork">
                            <h3 className="textCenter">
                                Login to your account
                            </h3>
                            <p className="textCenter">
                                Don’t have an account?
                                <span className="orange" onClick={loginDisplay}>
                                    <Link to="#"> Create a new account</Link>
                                </span>
                            </p>
                        </div>

                        <div className="inputs">
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <br />
                            <div className="password-input-container">
                                <input
                                    // type="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    // value={password}
                                    onChange={(e) =>
                                        setLoginPassword(e.target.value)
                                    }
                                />
                                <div
                                    className="toggle-password"
                                    onClick={handleTogglePassword}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <p className="forgetPass orange">
                                Forgot password?
                            </p>
                            <div className="textCenter">
                                <Link to="/home" className="white">
                                    <button
                                        className="button"
                                        onClick={loginHandler}
                                    >
                                        Login
                                    </button>
                                </Link>
                            </div>
                            <h3 className="red">{loginResponse}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterAndLogin;
