import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import "../CSS/Styles.css"

// SearchDateForms component contains search forms for the price history page
function SearchDatesForm(props) {
    const [innerSearch, setInnerSearch] = useState('')
    const [innerSearch1, setInnerSearch1] = useState('')
    const [innerSearch2, setInnerSearch2] = useState('')
    return (
        <Form style={{marginTop: "25px", marginBottom: "25px", width: "300px"}}>
            <div className = "form-inline">
                <Form.Group controlId="formBasicSearch">
                    <Form.Label className = "label" style ={{marginLeft: "70px"}}>
                        Search Symbol
                    </Form.Label>
                    <Form.Control className="input" style={{marginLeft: "15px"}} name="search" type="text" placeholder="Enter Stock Symbol"
                                  value={innerSearch} onChange={e => setInnerSearch(e.target.value)}/>
                </Form.Group>
            </div>
            <div className = "form-inline" style={{marginTop: "25px", }}>
                <Form.Group>
                    <Form.Label className = "label" style = {{marginRight: "15px"}}>
                        From
                    </Form.Label>
                    <Form.Control className="input" name="from" type="Date" value={innerSearch1} onChange={e => setInnerSearch1(e.target.value)}/>
                    <Form.Label className = "label" style = {{marginRight: "15px", marginLeft: "15px"}}>
                        To
                    </Form.Label>
                    <Form.Control className="input" name="to" type="Date"
                                  value={innerSearch2} onChange={e => setInnerSearch2(e.target.value)}/>
                    <Button className="button" onClick={() => props.onSubmit(innerSearch + "," + innerSearch1 + "," + innerSearch2)} style={{
                        marginLeft: "5px"}} variant="success"> Search </Button>
                </Form.Group>
            </div>
        </Form>
    );
};



export default SearchDatesForm;