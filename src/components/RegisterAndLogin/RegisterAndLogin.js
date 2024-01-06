import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterAndLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../../AxiosConfig/AxiosConfig";
import { state } from "../stateValue";

function RegisterAndLogin() {
    const navigate = useNavigate();
    const { fetchData } = useContext(state);
    //states to store register data
    let [registerResponse, setRegisterResponse] = useState("");
    let [email, setEmail] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [isLoadingSignup, setIsLoadingSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Clear the registration response message after 2 seconds
        const timer = setTimeout(() => {
            setRegisterResponse("");
        }, 2000);

        // Cleanup the timer to prevent memory leaks
        return () => clearTimeout(timer);
    }, [registerResponse]); // Re-run the effect when registerResponse changes

    // function agreeAndJoinHandler(e) {
    //     e.preventDefault();

    //     // Clear previous response
    //     setRegisterResponse("");
    //     // Check if any of the required fields are empty
    //     if (!email || !firstName || !lastName || !userName || !password) {
    //         setRegisterResponse("Please fill in all the required fields.");
    //         return; // Exit the function if any field is empty
    //     }
    //     let dataRegister = {
    //         email: email,
    //         firstname: firstName,
    //         lastname: lastName,
    //         username: userName,
    //         password: password,
    //     };
    //     axios("/users/register", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         data: JSON.stringify(dataRegister),
    //     })
    //         .then((data) => {
    //             console.log(data.data);
    //             setRegisterResponse(data.data.msg);
    //             navigate("/home");
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //             // Display error message to the user
    //             setRegisterResponse(
    //                 "An error occurred while registering. Please try again."
    //             );
    //         });
    // }

    //states to store login data

    const agreeAndJoinHandler = async (e) => {
        e.preventDefault();

        // Clear previous response
        setRegisterResponse("");

        // Check if any of the required fields are empty
        if (!email || !firstName || !lastName || !userName || !password) {
            setRegisterResponse("Please fill in all the required fields.");
            return; // Exit the function if any field is empty
        }

        const dataRegister = {
            email: email,
            firstname: firstName,
            lastname: lastName,
            username: userName,
            password: password,
        };

        try {
            setIsLoadingSignup(true);
            const response = await axios.post("/users/register", dataRegister, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data);
            setRegisterResponse(response.data.msg);
            const token = response.data.token;
            localStorage.setItem("token", token);
            setIsLoadingSignup(false);
            setTimeout(() => {
                fetchData();
            }, 1000);
            navigate("/home");
        } catch (error) {
            console.error("Error:", error);
            // Display error message to the user
            setRegisterResponse(
                "An error occurred while registering. Please try again."
            );
            setIsLoadingSignup(false);
        }
    };

    let [loginResponse, setLoginResponse] = useState("");
    let [loginEmail, setLoginEmail] = useState("");
    let [loginPassword, setLoginPassword] = useState("");

    // useEffect to clear loginResponse after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoginResponse("");
        }, 2000); // 2000 milliseconds = 2 seconds

        return () => {
            clearTimeout(timer); // Clear the timer if the component unmounts
        };
    }, [loginResponse]);

    function loginHandler(e) {
        e.preventDefault();
        // Clear previous response
        setLoginResponse("");

        // Check if email or password is empty
        if (!loginEmail || !loginPassword) {
            setLoginResponse("Please provide both email and password.");
            return; // Exit the function if either email or password is empty
        }
        let loginData = {
            email: loginEmail,
            password: loginPassword,
        };
        setIsLoadingLogin(true);
        axios("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(loginData),
        })
            .then((data) => {
                console.log(data.data);
                setLoginResponse(data.data.msg);
                const token = data.data.token;
                localStorage.setItem("token", token);
                setIsLoadingLogin(false);
                setTimeout(() => {
                    fetchData();
                }, 1000);
                navigate("/home");
            })
            // .catch((error) => {
            //     console.error("Error:", error);
            //     setIsLoadingLogin(false);
            // });
            .catch((error) => {
                console.error("Error:", error);
                setIsLoadingLogin(false);
                if (error.response) {
                    const errorMessage = error.response.data.msg;
                    setLoginResponse(errorMessage);
                } else {
                    setLoginResponse(
                        "An error occurred while logging in. Please try again later."
                    );
                }
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
                                <Link to="/home" className="white">
                                    <button
                                        className="button"
                                        onClick={agreeAndJoinHandler}
                                    >
                                        {isLoadingSignup
                                            ? "Registering ..."
                                            : "Agree and Join"}
                                    </button>
                                </Link>

                                {/* <button
                                    className="button"
                                    onClick={agreeAndJoinHandler}
                                >
                                    <Link to="/home" className="white">
                                        {isLoadingSignup
                                            ? "Registering ..."
                                            : "Agree and Join"}
                                    </Link>
                                </button> */}
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
                                        {isLoadingLogin
                                            ? "Signing ..."
                                            : "Sign in"}
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
