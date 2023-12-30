import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "../../images/userLogo.png";
import "./SingleQuestion.css";
import axios from "../../AxiosConfig/AxiosConfig";

function SingleQuestion() {
    let navigate = useNavigate();
    //state to store question from server
    const [question, setQuestion] = useState({});

    //state to store answer from server
    const [answer, setAnswer] = useState([]);

    //state to store user answer
    const [userAnswer, setUserAnswer] = useState("");

    //state to store answer response from server
    const [postResponse, setPostResponse] = useState("");

    //get the url param to fetch the specific question

    const { questionId } = useParams();
    console.log("questionId from singleQuestion", questionId);

    const token = localStorage.getItem("token");

    useEffect(() => {
        // Function to clear the message after 3 seconds (3000 milliseconds)
        const clearMessage = setTimeout(() => {
            setPostResponse("");
            // window.location.reload();
        }, 2000);

        // Clean up the timeout to prevent memory leaks
        return () => clearTimeout(clearMessage);
    }, [postResponse]);

    useEffect(() => {
        if (!token) {
            // Handle the case where the user is not authenticated.
            // You might want to redirect the user to the login page or show a message.
            return;
        }
        //fetch to get single question title and description
        try {
            axios
                .get("/questions/single-question/" + questionId, {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setQuestion(response?.data?.oneQuestion[0]);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } catch (error) {
            console.log(error);
        }

        try {
            axios
                .get("/answer/answers/" + questionId, {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    console.log("Answers:", response.data.allAnswer);
                    setAnswer(response?.data?.allAnswer);
                })
                .catch((error) => {
                    console.error("Error fetching answers:", error);
                    // navigate("/");
                });
        } catch (error) {
            console.log(error);
        }
    }, [questionId, token]);

    // debugger
    // console.log("Answers:", answer);

    function questionAnswer(e) {
        e.preventDefault();
        if (!userAnswer) {
            return setPostResponse("Answer can not be empty");
        }
        const token = localStorage.getItem("token");
        try {
            console.log("token ", token);
            let payload = {
                answer: userAnswer,
            };
            axios
                .post("/answer/postanswer/" + questionId, payload, {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setPostResponse(response.data.msg);
                    setUserAnswer("");
                    e.target.reset();
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mainQuestionWrapper ">
            <div className="margined">
                <div className="questionCenter">
                    <div>
                        <h1>Question</h1>
                    </div>
                    <div>
                        <h3>{question?.title}</h3>
                    </div>
                    <div className="singleQDescritpion">
                        <p>{question?.description}</p>
                    </div>

                    <Link to="/home" className="linkgoto">
                        <p className="gotoPage"> Go to Question page</p>
                    </Link>
                </div>
                {/* <hr /> */}
                <h1 className="community">Answer From The Community</h1>
                {/* <hr /> */}
                {answer?.map((singleAnswer, index) => {
                    let theAnswers = (
                        <div key={index} className="singleQAnswers">
                            <div className="width">
                                <img
                                    className="questionImage"
                                    src={img}
                                    alt=""
                                />
                                <p>{singleAnswer?.user_name}</p>
                            </div>
                            <div className="nameandans">
                                <h4>{singleAnswer?.answer}</h4>
                            </div>
                        </div>
                    );
                    console.log(singleAnswer.user_name);
                    console.log(singleAnswer.answer);
                    return theAnswers;
                })}
            </div>

            <div className="questionAnswer">
                <h1>Answer The Top Question</h1>

                {/* <h2 className="blue">{postResponse}</h2> */}

                <form onSubmit={questionAnswer}>
                    <textarea
                        className="textArea"
                        onChange={(e) => setUserAnswer(e.target.value)}
                        name=""
                        id=""
                        cols=""
                        rows=""
                        placeholder="Answer description..."
                    ></textarea>

                    {/* <h2 className="red">{postResponse}</h2> */}

                    <h3
                        className={
                            postResponse === "Answer can not be empty"
                                ? "red"
                                : "green"
                        }
                    >
                        {postResponse}
                    </h3>

                    <div className="answerButton">
                        <br />
                        <button
                            className="questionAnswer-button  allQuestion-button"
                            type="submit"
                        >
                            Post Your Answer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SingleQuestion;
