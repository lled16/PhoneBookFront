import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import SearchBox from '../searchbox/searchbox';
import ButtonAdd from '../buttonAdd/butonAdd';
import Table from '../table/table';
import '../phonelist/phonelist.css';

const URL = 'http://localhost:5033/api/PhoneBook/contacts';

export default function PhoneList() { 
    const [listaItens, setListaItens] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchContacts = (term) => {
        setSearchTerm(term);
    };

    const loadContacts = () => {
        const searchParams = searchTerm ? `/${searchTerm}` : '';
        axios.get(`${URL}${searchParams}`)
            .then(response => {
                console.log('Resultado da busca:', response.data);
                setListaItens(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar contatos:', error);
            });
    };

    useEffect(() => {
        loadContacts();
    }, [searchTerm]); 

    return (
        <Container className="teste">
            <Row className="searchAddButton">
                <SearchBox onSearch={searchContacts} />
                <ButtonAdd />
            </Row>
            <Row className="rowTable">
                <Table listaItens={listaItens} />
            </Row>
        </Container>
    );
}