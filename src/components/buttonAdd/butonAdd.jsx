import React, { useState } from "react";
import { Button, Col, Modal, Form } from "react-bootstrap";
import "../buttonAdd/buttonAdd.css";
import axios from "axios";
import { Input } from "@mui/material";

const URL = 'http://localhost:5033/api/PhoneBook';

export default function ButtonAdd({ onAddContact }) {
    const [showModal, setShowModal] = useState(false);
    const [nome, setNome] = useState("");
    const [telefone1, setTelefone1] = useState("");
    const [telefone2, setTelefone2] = useState("");
    const [telefone3, setTelefone3] = useState("");
    const [idade, setIdade] = useState("");

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        const telefones = [telefone1, telefone2, telefone3].filter(telefone => telefone !== '');

        const novoContato = {
            name: nome,
            phone: telefones,
            age: parseInt(idade),
        };

        axios.post(`${URL}`, novoContato)
            .then(() => {
                console.log('Novo contato adicionado com sucesso');
                onAddContact();
                handleClose();
                setNome("");
                setTelefone1("");
                setTelefone2("");
                setTelefone3("");
                setIdade("");
                window.location.reload();
            })
            .catch((error) => {
                handleClose();
                window.location.reload();
                console.error('Erro ao adicionar novo contato', error);
            });
    };

    return (
        <>
            <Col>
                <Button className="buttonAdd" onClick={handleShow}>
                    NEW CONTACT
                </Button>
            </Col>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>

                <Modal.Body className="modal">
                    <Form onSubmit={handleSubmit} className="formTotal">

                        <div className="titleModal">
                            <h2>Create Contact</h2>
                        </div>
                        <Form.Group controlId="formNome" className="formNameInputs">
                            <Form.Label className="nameFormInput">Name</Form.Label>
                            <Input className="input"
                                type="text"
                                placeholder="Enter name"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTelefone1" className="formNameInputs">
                            <Form.Label className="nameFormInput">Phone Number 1</Form.Label>
                            <Input className="input"
                                type="text"
                                placeholder="Enter phone number"
                                value={telefone1}
                                required
                                onChange={(e) => setTelefone1(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTelefone2" className="formNameInputs">
                            <Form.Label className="nameFormInput">Phone Number 2</Form.Label>
                            <Input className="input"
                                type="text"
                                placeholder="Enter phone number"
                                value={telefone2}
                                onChange={(e) => setTelefone2(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTelefone3" className="formNameInputs">
                            <Form.Label className="nameFormInput">Phone Number 3</Form.Label>
                            <Input className="input"
                                type="text"
                                placeholder="Enter phone number"
                                value={telefone3}
                                onChange={(e) => setTelefone3(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formIdade" className="formNameInputsAge">
                            <Form.Label className="nameFormInput">Age</Form.Label>
                            <Input className="input"
                                type="number"
                                placeholder="Enter age"
                                value={idade}
                                onChange={(e) => setIdade(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="formNameButton">
                            <Button variant="primary" type="submit" className="buttonIpunt">
                                Add Contact
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}