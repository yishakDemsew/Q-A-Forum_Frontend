import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AskQuestion from "../Pages/AskQuestion/AskQuestion";
import SingleQuestion from "../Pages/SingleQuestion/SingleQuestion";
import axios from "../home/axiosConfig";
// import Home from './../home/Home';
import UserHome from "../Pages/UserHome/UserHome";
import Home from "../components/Home/Home";
import NotFound from "./NotFound";
import SharedPage from "./SharedPage";
import { createContext } from "react";

// import { state } from "./stateValue";
// export const StateContext = createContext();

export const StateProvider = () => {
    const state = createContext();
    const [username, setUserName] = useState({ state }); // Set initial state here
    console.log(username);
    const [isLoading, setIsLoading] = useState(true);

    // async function checkUser() {
    //     try {
    //         const { data } = await axios.get("/users/check", {
    //             headers: {
    //                 Authorization: "Bearer " + token,
    //             },
    //         });

    //         console.log(data);
    //         setUserName(data);
    //         // console.log(username)
    //     } catch (error) {
    //         console.log(error.response);
    //         // navigate("/login");
    //     }
    // }

    // useEffect(() => {
    //     checkUser();
    //     // questions();
    // }, []);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (token) {
    //         fetch("/users/check", {
    //             headers: {
    //                 authorization: "Bearer " + token,
    //             },
    //         })
    //             .then((response) => response.json())

    //             .then((data) => {
    //                 if (
    //                     data.msg === "token not provide" ||
    //                     data.msg === "Authentication Invalid"
    //                 ) {
    //                     return;
    //                 } else {
    //                     setUserName(data.username);
    //                     // console.log(username);
    //                 }
    //             })
    //             .catch((error) => {})
    //             .finally(() => {
    //                 setIsLoading(false);
    //             });
    //     } else {
    //         setIsLoading(false);
    //     }
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (token) {
                    const { data } = await axios.get("/users/check", {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });

                    if (
                        data.msg === "token not provide" ||
                        data.msg === "Authentication Invalid"
                    ) {
                        return;
                        // Handle authentication failure
                    } else {
                        setUserName(data.username);
                    }
                }
            } catch (error) {
                // Handle other errors if needed
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <state.Provider value={{ username, setUserName }}>
            <Routes>
                <Route path="/" element={<SharedPage />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<UserHome />} />
                    <Route
                        path="/answer/:questionId"
                        element={<SingleQuestion />}
                    />
                    <Route path="/ask" element={<AskQuestion />} />
                    <Route path="*" element={<NotFound />} />

                    {/* <Route
							path="/singlequestion/:questionId"
							element={<SingleQuestion />}
						/> */}
                    {/* <Route path="/askQuestion" element={<AskQuestion />} /> */}
                </Route>
            </Routes>
        </state.Provider>
    );
};
