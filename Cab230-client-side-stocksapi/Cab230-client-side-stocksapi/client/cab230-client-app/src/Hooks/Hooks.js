import { useState, useEffect } from "react";
import { GetStocks, GetStockDates, GetStockSymbol } from "../API"


//--------------------------------------Hook for Stocks Page----------------------------------------
// Gets all available stocks. Includes error handling and loading.
export function UseStocks() {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        GetStocks()
            .then((stocks) => {
                setRowData(stocks);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
    }, []);
    return { loading,
        rowData,
        error, };
};
//--------------------------------------Hook for Quote Page----------------------------------------
// Gets the latest entry for a particular stock searched by symbol (1-5 upper case letters).
// Includes error handling and loading.
export function UseQuote(search){
    const [rowData1, setRowData1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (search !== ""){
            GetStockSymbol(search)
                .then((stocks) => {
                    setRowData1(stocks);
                    setLoading(false);
                })
                .catch((e) => {
                    setError(e);
                    setLoading(false);
                });
        }
        else{
            setLoading(false)
        }
    }, [search]);
    return { loading,
        rowData1,
        error, };
};
//-----------------------------------Hook for Price-History Page-------------------------------------
// Gets entries of stock searched by symbol, optionally filtered by date.
// Includes error handling and loading.
export function UseStockDates(search, search2, search3){
    const [rowData2, setRowData2] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (search !== ""){
            GetStockDates(search, search2, search3)
                .then((stocks) => {
                    setRowData2(stocks);
                    setLoading(false);
                })
                .catch((e) => {
                    setError(e);
                    setLoading(false);
                });
        }
        else{
            setLoading(false)
        }
    }, [search, search2, search3]);
    return { loading,
        rowData2,
        error, };
};