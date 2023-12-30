import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AskQuestion.css";
import axios from "../../AxiosConfig/AxiosConfig";

function AskQuestion() {
    //state to store question title from the user
    let [titleValue, setTitleValue] = useState("");
    //state to store discription from the user
    let [discriptionValue, setDiscriptionValue] = useState("");
    //state to store server response
    let [questionResponse, setQuestionResponse] = useState("");

    useEffect(() => {
        // Function to clear the message after 3 seconds (3000 milliseconds)
        const clearMessage = setTimeout(() => {
            setQuestionResponse("");
            // window.location.reload();
        }, 2000);

        // Clean up the timeout to prevent memory leaks
        return () => clearTimeout(clearMessage);
    }, [questionResponse]);

    function submit(e) {
        e.preventDefault();

        console.log("Before setting: ", questionResponse); // Debugging line

        setQuestionResponse("");

        console.log("After setting: ", questionResponse); // Debugging line

        if (!titleValue || !discriptionValue) {
            return setQuestionResponse(
                "Question title or Discrtiption can not be empty"
            );
        }
        const token = localStorage.getItem("token");
        try {
            console.log("token ", token);

            const payload = {
                title: titleValue,
                description: discriptionValue,
            };

            // console.log("Request Payload:", payload);

            axios
                .post("/questions/ask", payload, {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    console.log("Request Payload:", payload);
                    setQuestionResponse(response.data.msg);
                    console.log("question Response", questionResponse);
                    // Clear the state values for title and description
                    setTitleValue("");
                    setDiscriptionValue("");
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
        <div className="thewhole">
            <div className="askQuestion">
                <h1 className="stepsToGoodQuestion">
                    Steps to write a good question
                </h1>

                <ul className="">
                    <li className="no1">
                        Summerize your problem in a one-line title.
                    </li>
                    <li className="no2">
                        Describe your problem in more detail.
                    </li>
                    <li className="no3">
                        Describe what you tried and what you expected to happen.
                    </li>
                    <li className="no4">
                        Review your question and post it to the site.
                    </li>
                </ul>
            </div>

            <div className="askQuestion">
                <br />
                <br />
                {/* <br />we
                <br /> */}
                <h1>Ask a public question</h1>
                <Link to="/home" className="goto">
                    <p className="gotoPage">Go to Question page</p>
                </Link>

                <br />
                {/* <h1 className="red">{questionResponse}</h1> */}
            </div>

            <form onSubmit={submit}>
                <div className="askQuestion">
                    <input
                        className="textArea"
                        onChange={(e) => setTitleValue(e.target.value)}
                        type="text"
                        placeholder="Title"
                    />
                    <br />

                    <textarea
                        className="textArea"
                        onChange={(e) => setDiscriptionValue(e.target.value)}
                        name=""
                        id=""
                        cols=""
                        rows=""
                        placeholder="Question description..."
                    ></textarea>
                    <br />
                    {/* <h1 className="red">{questionResponse}</h1> */}

                    <h1
                        className={
                            questionResponse === "Question submitted"
                                ? "green"
                                : "red"
                        }
                    >
                        {questionResponse}
                    </h1>

                    <button className="allQuestion-button" type="submit">
                        Post Your Question
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AskQuestion;
