import { createContext, useContext, useEffect, useState } from "react";
// import { UserContext } from "../../components/main/";

import { useNavigate } from "react-router-dom";
// import { StateContext } from "../main/context";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
// import { state } from "../main/stateValue";
import "./UserHome2.css";
import axios from "../../AxiosConfig/AxiosConfig";
import { state } from "../../components/stateValue";

// const state = createContext();

function UserHome() {
    const { username, setUserName } = useContext(state);
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [Filter, setFilter] = useState([]);
    const navigate = useNavigate();
    console.log(username);
    // console.log(Filter)
    // console.log(questions);
    // console.log(userData);
    const token = localStorage.getItem("token");

    const handleclick = () => {
        navigate("/ask");
    };

    useEffect(
        () => {
            laosQuestions();
        },
        []
        // "USER"
    );

    // const laosQuestions = async () => {
    //     try {
    //         const data = await axios
    //             .get("/questions/all-questions", {
    //                 headers: {
    //                     Authorization: "Bearer " + token,
    //                 },
    //             })
    //             .then((response) => {
    //                 console.log(
    //                     "all question response",
    //                     response.data.allQuestion
    //                 );
    //                 setQuestions(response?.data?.allQuestion);
    //             })

    //             // console.log(data);
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // };

    const laosQuestions = async () => {
        try {
            const response = await axios.get("/questions/all-questions", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            console.log("all question response", response.data.allQuestion);
            setQuestions(response?.data?.allQuestion);
        } catch (error) {
            console.log(error);
            // Optionally, handle the error further or set an error state
        }
    };

    // laosQuestions()

    useEffect(() => {
        setFilter(
            questions.filter((q) =>
                q.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, questions]);

    function click(q) {
        console.log("id", q.question_id);
        navigate("/answer/" + q.question_id);
    }

    return (
        <>
            <div className="thewholepart">
                <div className="upperpart">
                    <div className="tops col-12 col-md-8 md-4">
                        <button className="blue_button" onClick={handleclick}>
                            Ask Questions
                        </button>
                    </div>
                    <div className="search_bar">
                        <input
                            className="search"
                            type="text"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder="Search Questions "
                        />
                    </div>

                    <div className="n_user">
                        <h2 className="header_border">Welcome: {username}</h2>
                    </div>
                </div>
                <div className="marginedpart">
                    <h1 className="questionshead"> Asked Questions :</h1>

                    {Filter.length > 0 ? (
                        Filter.map((singleQuestion, index) => (
                            <div
                                className="questions"
                                onClick={() => click(singleQuestion)}
                                key={index}
                            >
                                <div className="imagepart">
                                    <hr />
                                    <CgProfile className="profile" />
                                    <p className="usernamef">
                                        {singleQuestion?.user_name}
                                    </p>
                                </div>
                                <div className="titleWidth">
                                    <h4 className="titlename">
                                        {singleQuestion?.title}
                                    </h4>
                                </div>
                                <div>
                                    {/* <hr /> */}
                                    <IoIosArrowForward
                                        className="arrowright"
                                        size="40px"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="noQuestion">
                            No matching questions found.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserHome;
