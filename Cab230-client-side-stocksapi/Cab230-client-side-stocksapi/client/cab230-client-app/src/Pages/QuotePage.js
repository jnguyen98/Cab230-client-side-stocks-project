import Styles from "../Components/Styles";
import React, { useState } from "react";
import { UseQuote } from "../Hooks/Hooks";
import { AgGridReact } from "ag-grid-react";
import SearchForm from "../Components/SearchForm"
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.min.css";
import "../CSS/GridAndGraph.css"

// Component to display Quote - includes a search form, and a grid representing the data
function DisplayQuote(){
    const columns = [
        { headerName: "Date", field: "timestamp"},
        { headerName: "Symbol", field: "symbol"},
        { headerName: "Name", field: "name"},
        { headerName: "Industry", field: "industry"},
        { headerName: "Open", field: "open"},
        { headerName: "High", field: "high"},
        { headerName: "Low", field: "low"},
        { headerName: "Close", field: "close"},
        { headerName: "Volumes", field: "volumes"}
    ];

    // Search state which collects the search term from user input, which
    // is used as a parameter on the "UseQuote" hook.
    const [search, setSearch] = useState("");
    const { loading, rowData1, error } = UseQuote(search);


    // Boolean constant to determine if the data set has a stock/ single object.
    const hasOneObject = rowData1.name !== undefined

    // Convert the timestamps of the rowdata to dates using slice.
    if (hasOneObject){
       rowData1.timestamp = rowData1.timestamp.slice(0,10);
    }

    const ErrorMessage = "Something went wrong:\n"
    const nothing = "";

    return(
        <div className="wrapper">
            <div
                className="ag-theme-balham-dark"
            >
                <SearchForm onSubmit={setSearch}/>
                { hasOneObject ?  <AgGridReact suppressNoRowsOverlay={true} columnDefs={columns}
                                           rowData={[rowData1]} pagination={true} paginationPageSize={1}/> : nothing }
                { loading ? <h1 style ={{marginTop: "30px", textAlign: "center"}} >Loading...</h1> : nothing }
                { rowData1.error ? <h1 style ={{whiteSpace: 'pre', textAlign: "center", fontFamily: "ui-serif"}}>
                                      {ErrorMessage + rowData1.message}</h1> : nothing }
                { error ? <h1 style={{textAlign: "center"}}>ErrorMessage + error.message</h1>: nothing }
            </div>
        </div>

    )
};

// Quote component which holds the quote page.
function QuotePage() {
    return (
        <Styles>
            <div style ={{textAlign: "center"}}>
                <h1>Welcome to the Quote Page</h1>
                <p style={{marginTop: "35px"}}>Please enter a stock symbol to get a quote of the latest price information</p>
            </div>
            <DisplayQuote/>
        </Styles>
    );
};

export default QuotePage