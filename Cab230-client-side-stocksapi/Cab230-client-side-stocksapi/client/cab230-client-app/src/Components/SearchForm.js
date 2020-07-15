import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import "../CSS/Styles.css"

// Search Form component contains a search form for the quote page
function SearchForm(props) {
    const [innerSearch, setInnerSearch] = useState('')
    return (
        <div className="wrapper2" style={{marginRight: "270px"}}>
            <Form style={{marginTop: "25px", marginBottom: "25px", width: "300px"}}>
                <div className = "form-inline">
                    <Form.Group controlId="formBasicSearch">
                        <Form.Label className = "label" style = {{marginRight: "15px"}}>
                            Search Symbol
                        </Form.Label>
                        <Form.Control className="input" name="search" type="text" placeholder="Enter Stock Symbol"
                                      value={innerSearch} onChange={e => setInnerSearch(e.target.value)}/>
                        <Button className = "button" variant="success" onClick={() => props.onSubmit
                        (innerSearch)}
                        style={{marginLeft: "5px"}}> Search </Button>
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}


export default SearchForm;