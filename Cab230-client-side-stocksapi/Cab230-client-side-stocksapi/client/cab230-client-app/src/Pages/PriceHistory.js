import Styles from "../Components/Styles";
import React, { useState } from "react";
import { UseStockDates } from "../Hooks/Hooks";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.min.css";
import SearchDatesForm from "../Components/SearchDatesForm";
import Chart from "../Components/LineGraph";

// Component to display Price-history - includes a search form (input and date), a grid and a line graph.
function DisplayPriceHistory(){
    const columns2 = [
        { headerName: "Date", field: "timestamp", resizable: true},
        { headerName: "Symbol", field: "symbol", resizable: true},
        { headerName: "Name", field: "name", resizable: true},
        { headerName: "Industry", field: "industry", resizable: true},
        { headerName: "Open", field: "open", resizable: true},
        { headerName: "High", field: "high", resizable: true},
        { headerName: "Low", field: "low", resizable: true},
        { headerName: "Close", field: "close", resizable: true},
        { headerName: "Volumes", field: "volumes", resizable: true}
    ];
    // Search state to collect search terms from the search bar forms: "Stock name, dateTO, dateFrom"
    const [search, setSearch] = useState("");
    // Search set is an array that separates the search string using "," as the delimiter
    const searchSet = search.split(',');
    const { loading, rowData2, error } = UseStockDates(searchSet[0], searchSet[1], searchSet[2]);

    // Closing price array will store the closing price of stock(s) to be graphed
    const GraphPrice = []
    // Dates array will store the dates of the stock(s) to be graphed
    const GraphDate = []

    // Boolean constants to determine if the data set is an array of objects or or single object.
    const singleObject = rowData2.close !== undefined;
    const arrayOfObjects = rowData2[0] !== undefined;

    // Convert the timestamps of the rowdata to dates using slice.
    if (arrayOfObjects) {
        rowData2.forEach(function (a) {a.timestamp = a.timestamp.slice(0, 10)})
        rowData2.forEach((Stocks) => GraphPrice.push(Stocks.close))
        rowData2.forEach((Stocks) => GraphDate.push(Stocks.timestamp))
    }
    if (singleObject) {
        rowData2.timestamp = rowData2.timestamp.slice(0, 10);
        GraphPrice.push(rowData2.close);
        GraphDate.push(rowData2.timestamp)

    }
    // The date array needs to be reversed so it could be used in the graph from the earliest to the latest stock.
    GraphPrice.reverse()
    // The date array needs to be reversed so it could be used in the graph from the earliest to the latest date.
    GraphDate.reverse();

    const ErrorMessage = "Something went wrong:\n"
    const nothing = "";

    return(
        <div className="wrapper3" style={{marginLeft: "50px"}}>
            <div className="ag-theme-balham-dark" style={{height: "390px"}}>
                <SearchDatesForm onSubmit={setSearch}/>
                { singleObject || arrayOfObjects ? <AgGridReact suppressNoRowsOverlay={true} columnDefs={columns2}
                                            pagination={true} paginationPageSize={11}
                                            rowData={arrayOfObjects ? rowData2 : [rowData2]}/> : ""}
            </div>
            <div className="wrapper" style={{marginTop: "200px"}}>
                { loading ? <h1>Loading...</h1> : nothing }
                { rowData2.error ? <h1 style ={{whiteSpace: 'pre', fontFamily: "ui-serif"}}>
                    {ErrorMessage + rowData2.message}</h1> : nothing }
                { error ? <h1> ErrorMessage + error.message</h1> : nothing }
            </div>
            <div className = "charting">
                 <Chart price = {GraphPrice} length = {GraphPrice.length} date = {GraphDate}/>
            </div>
        </div>
    )
}

// Price history component which holds the price history page.
function PriceHistoryPage() {
    const text = "Please enter a stock symbol and a date to sample from the most recent one hundred days of" +
        " information for a particular stock.";
    return (
        <Styles>
            <div style={{textAlign: "center"}}>
                <h1>Welcomes to Price History Page</h1>
                <p style={{marginTop: "25px"}}>{text}</p>
            </div>
            <DisplayPriceHistory/>
        </Styles>
    );
}

export default PriceHistoryPage;