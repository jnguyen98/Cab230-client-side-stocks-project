import React, { useState } from "react";
import { UseStocks } from "../Hooks/Hooks";
import { AgGridReact } from "ag-grid-react";
import { Form } from "react-bootstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.min.css";
import "../CSS/GridAndGraph.css"
import "../CSS/Styles.css"
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Styles from "../Components/Styles";


// Component to display Stocks - includes a filter search form, search dropdown filter and a grid representing the data
function DisplayStocks(){
    const columns = [
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "Symbol", field: "symbol", sortable: true },
        { headerName: "Industry", field: "industry", sortable: true, filter: true}
    ];

    const { loading, rowData, error } = UseStocks();

    // This constant will reset the search state for the dropdown and search bar
    const resetSearch = "";

    // Search state via search bar and dropdown filter
    const [search, setSearch] = useState('')
    const [dropSearch, setDropSearch] = useState('')

    // Constant to ensure that the row data does not contain an object of error that equals true
    const NoError = rowData.error !== true;

    // filtered stocks based on search term - both for search bar and dropdown, respectively.
    let filteredStocks;
    let filteredDropdown;

    if (NoError)
    {
        filteredStocks = rowData.filter( Data => { return Data.industry.toLowerCase().includes(search.toLocaleLowerCase())})
        filteredDropdown = rowData.filter( Data => { return Data.industry.toLowerCase().includes(dropSearch.toLocaleLowerCase())})
    }

    // states for the dropdown button toggling and checking whether a dropdown item is pressed
    const [dropdownOpen, setOpen] = useState(false);
    const [dropDown, setDropdown] = useState(false);

    // For the input text box search bar
    const toggle = () => setOpen(!dropdownOpen);
    const handleSubmit = (e) => {
        setSearch(e.target.value)
        setDropdown(false);
        setDropSearch(resetSearch);

    }

    // Create No duplicate object array sorted by industry (for the dropdown button menu) via Sets.
    const seen = new Set();
    let noDuplicateStocks = "";
    let duplicate;
    if (NoError) {
            noDuplicateStocks = rowData.filter(el => {
            duplicate = seen.has(el.industry);
            seen.add(el.industry);
            return !duplicate;
        });
    }

    const ErrorMessage = "Something went wrong:\n"
    const nothing = "";

    return(
        <div className="wrapper2">
            { loading ? <h1 style={{textAlign: "center"}}>Loading...</h1> : nothing }
            { rowData.error ? <h1 style ={{whiteSpace: 'pre', textAlign: "center", fontFamily: "ui-serif"}}>
                {ErrorMessage + rowData.message}</h1> : nothing }
            { error ? <h1 style={{textAlign: "center"}}>ErrorMessage + error.message</h1> : nothing }
            <div className="ag-theme-balham-dark" style={{height: "459px"}}>
                { NoError ?
                    <Form style={{marginTop: "25px", marginBottom: "25px", width: "300px"}}>
                        <div className = "form-inline">
                            <Form.Group controlId="formBasicSearch">
                                <Form.Label className = "label" style = {{marginRight: "15px"}}>
                                    Industry Filter
                                </Form.Label>
                                <Form.Control className="input" style={{width: "233px"}}name="search" type="text"
                                              placeholder="Enter Industry sector" value={search} onChange={handleSubmit} />
                                <ButtonDropdown style={{marginLeft: "15px"}} isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle className="input" caret color="primary">
                                        {dropSearch.length > 0 ? dropSearch : "Filter Dropdown" }
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {noDuplicateStocks.map((Stocks) => (
                                            <DropdownItem onClick={() => {setDropSearch(Stocks.industry); setDropdown(true);
                                            setSearch(resetSearch)}} key={Stocks.name}>{Stocks.industry}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </Form.Group>
                        </div>
                    </Form> : ""}
                <AgGridReact columnDefs={columns} rowData={!dropDown ? filteredStocks : filteredDropdown }
                             pagination={true} paginationPageSize={14}/>
            </div>
        </div>

    )
};

// Stocks component which holds the stocks page.
function StocksPage() {
    return (
        <Styles>
            <div style ={{textAlign: "center"}}>
                <h1>Welcome to the Stocks Page</h1>
            </div>
            <DisplayStocks/>
        </Styles>
    );
};

export default StocksPage