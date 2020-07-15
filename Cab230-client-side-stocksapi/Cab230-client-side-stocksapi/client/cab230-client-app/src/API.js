import axios from "axios";
const baseURL = "http://131.181.190.87:3000"

//----------------------------------POST--------------------------------------------------------

// ValidateLogin uses Axios Post method to login user through the API (retrieving token)
export const ValidateLogin = async (email, password) => {

    const MessageResponse = await axios({
        method: 'POST',
        baseURL,
        url: '/user/login',
        data: {
            email,
            password
        }
    });

    return MessageResponse.data.token;
};

// RegisterUser uses Axios Post method to register user through the API
export const RegisterUser = async (email, password) => {

    const data = await axios({
        method: 'POST',
        baseURL,
        url: '/user/register',
        data: {
            email,
            password
        }
    });
    return data;
};

//----------------------------------------------GET-----------------------------------------------------------

// GetStocks uses a Get method which fetches all available stocks.
export const GetStocks = async () => {
    const url = baseURL + `/stocks/symbols`;

    // Using fetch to get stocks
    const data = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            return data
        });

    return data;
};

// GetStockSymbol uses a Get method which fetches the latest entry for a particular stock searched by symbol (1-5 upper
// case letters).
export const GetStockSymbol = async (symbol) => {
    const url = baseURL + `/stocks/${symbol}`;

    // Using fetch to get quote
    const data = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            return data
        });

    return data;
};

// GetStockDates uses a Get method which fetches all entries of stock searched by symbol, optionally filtered by date.
export const GetStockDates = async (symbol, from, to) => {
    // Relevant for the authorization header
    const nothing = "";
    const userToken = localStorage.getItem('token');
    const url = baseURL + `/stocks/authed/${symbol}` + (from ? `?from=${from}`: nothing) + (to ? `&to=${to}`: nothing);
    const headers = { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}`};

    // Using fetch to get stock dates
    const data = await fetch(url, { headers })
        .then((res) => res.json())
        .then((data) => {
            return data
        });

    return data;
};


