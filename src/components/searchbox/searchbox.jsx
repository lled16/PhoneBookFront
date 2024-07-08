import React, { useState } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import '../searchbox/searchbox.css';
import { Input } from "@mui/material";

const URL = 'http://localhost:5033/api/PhoneBook'; 

export default function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm); 
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Col className="search">
            <form onSubmit={handleFormSubmit}>
                <Input
             
                    type="text"
                    name="name"
                    className="searchInput"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </form>
        </Col>
    );
}