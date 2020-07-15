import React from 'react';
import Styles from '../Components/Styles';
import DisplayLoginLogout from "../Components/LoginLogout";



// Home component which holds the home page.
function HomePage(){
    const text = "Welcome to the Stock Analyst portal. Click on Stocks to see the available companies, \n" +
                  " Quote to get the latest price information by stock symbol, or choose Price History to sample \n" +
                   " from the most recent one hundred days of information for a particular stock";
    return (
        <Styles>
            <div className="LoginLogoutWrapper">
                <h1 style={{marginLeft: "250px", fontSize: "50px", display: "inline-block"}}>Stock Prices</h1>
                <DisplayLoginLogout/>
            </div>
            <div style={{textAlign: "center"}}>
                <img src={require("../Images/logo.jpg")} alt="stocks" height="350" width="750" style={{border: "1px" +
                        " solid black"}}/>
                <p style={{whiteSpace: 'pre', marginTop: "35px"}}> {text}</p>
            </div>
        </Styles>
    );
};


export default HomePage
