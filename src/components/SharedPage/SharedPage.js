import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function SharedPage() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default SharedPage;
