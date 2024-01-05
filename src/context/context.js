import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AskQuestion from "../Pages/AskQuestion/AskQuestion";
import SingleQuestion from "../Pages/SingleQuestion/SingleQuestion";
import axios from "../AxiosConfig/AxiosConfig";
// import Home from './../home/Home';
import UserHome from "../Pages/UserHome/UserHome";
import Home from "../components/Home/Home";
import NotFound from "../components/NotFound/NotFound";
import SharedPage from "../components/SharedPage/SharedPage";

import { state } from "../components/stateValue";
import HowItWorks from "../components/HowItWorks/HowItWorks";
// export const StateContext = createContext();

export const StateProvider = () => {
    // const [username, setUserName] = useState(null); // Set initial state here
    // // const [shouldSetUsername, setShouldSetUsername] = useState(false);
    // // const [fetchedData, setFetchedData] = useState(""); // Declare fetchedData state

    // const [isLoading, setIsLoading] = useState(true);

    // console.log("Username before rendering:", username); // Add this line

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const token = localStorage.getItem("token");

    //             if (token) {
    //                 const { data } = await axios.get("/users/check", {
    //                     headers: {
    //                         Authorization: "Bearer " + token,
    //                     },
    //                 });

    //                 if (
    //                     data.msg === "token not provide" ||
    //                     data.msg === "Authentication Invalid"
    //                 ) {
    //                     return;
    //                     // Handle authentication failure
    //                 } else {
    //                     setUserName(data.username);
    //                     console.log("Username set:", data.username);
    //                 }
    //             }
    //         } catch (error) {
    //             // Handle other errors if needed
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const [username, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
                    // Handle authentication failure, e.g., redirect to login
                    localStorage.removeItem("token"); // Clear token from local storage
                    setUserName(null); // Clear username from state
                } else {
                    setUserName(data.username);
                    console.log("Username set:", data.username);
                }
            } else {
                // Handle the case where there's no token (e.g., user not logged in)
                setUserName(null);
            }
        } catch (error) {
            // Handle other errors if needed
            console.error("Error fetching username:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // return (
    //     <state.Provider value={{ username, setUserName }}>
    //         <Routes>
    //             <Route path="/" element={<SharedPage />}>
    //                 <Route path="/" element={<Home />} />
    //                 <Route path="/home" element={<UserHome />} />
    //                 <Route path="/how-it-works" element={<HowItWorks />} />
    //                 <Route
    //                     path="/answer/:questionId"
    //                     element={<SingleQuestion />}
    //                 />
    //                 <Route path="/ask" element={<AskQuestion />} />
    //                 <Route path="*" element={<NotFound />} />

    //                 {/* <Route
    // 						path="/singlequestion/:questionId"
    // 						element={<SingleQuestion />}
    // 					/> */}
    //                 {/* <Route path="/askQuestion" element={<AskQuestion />} /> */}
    //             </Route>
    //         </Routes>
    //     </state.Provider>
    // );

    return (
        <state.Provider value={{ fetchData, username, setUserName }}>
            <Routes>
                <Route path="/" element={<SharedPage />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<UserHome />} />
                    <Route path="how-it-works" element={<HowItWorks />} />
                    <Route
                        path="answer/:questionId"
                        element={<SingleQuestion />}
                    />
                    <Route path="ask" element={<AskQuestion />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </state.Provider>
    );
};
