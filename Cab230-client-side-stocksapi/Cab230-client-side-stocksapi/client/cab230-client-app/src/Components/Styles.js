import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import "../CSS/Styles.css"

// Navigation routes for the navigation bar
const Routes = [
    { name: 'Home', to: '/' },
    { name: 'Stocks', to: '/stocks' },
    { name: 'Quote', to: '/quote' },
    { name: 'Price History (Restricted)', to: '/price-history' }
];

// Main style layout for the pages and navigation bar.
function Styles({ children }) {
    return (
        <div className="Styles">
            <Navbar className="navbar-light nav-link navbar-nav nav-item" variant="dark">
                <Nav className="mr-auto">
                    {Routes.map((route) => (
                        <Nav.Item key={route.to}>
                            <Nav.Link as={NavLink} exact to={route.to} eventKey={route.to}>
                                {route.name}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </Navbar>
            <main className="p-3">{children}</main>
        </div>
    );
};

export default Styles;
