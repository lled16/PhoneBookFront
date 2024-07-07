
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Input } from '@mui/material';
import axios from 'axios';
import "../buttonAdd/buttonAdd.css";

const URL = 'http://localhost:5033/api/PhoneBook/contacts';

const EditModal = ({ show, handleClose, contact, onSave }) => {
    const [nome, setNome] = useState(contact.name);
    const [telefone1, setTelefone1] = useState(contact.phones[0]?.phoneNumber || '');
    const [telefone2, setTelefone2] = useState(contact.phones[1]?.phoneNumber || '');
    const [telefone3, setTelefone3] = useState(contact.phones[2]?.phoneNumber || '');
    const [idade, setIdade] = useState(contact.age);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const telefones = [telefone1, telefone2, telefone3].filter(telefone => telefone !== '');
    
        const contatoAtualizado = {
            name: nome,
            phone: telefones, // Aqui você passa diretamente o array de números de telefone
            age: idade,
        };
    
        axios.put(`${URL}/${contact.contactId}`, contatoAtualizado)
            .then(() => {
                console.log('Contato atualizado com sucesso');
                onSave();
                handleClose();
                window.location.reload();
            })
            .catch((error) => {
                console.error('Erro ao atualizar contato', error);
                window.location.reload();
            });
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="modal">
                <Form onSubmit={handleSubmit} className="formTotalEdit">
                    <div className="titleModal">
                        <h2>Edit Contact</h2>
                    </div>
                    <Form.Group controlId="formNome" className="formNameInputs">
                        <Form.Label>Name</Form.Label>
                        <Input
                            type="text"
                            placeholder="Enter name"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTelefone1" className="formNameInputs">
                        <Form.Label>Phone Number 1</Form.Label>
                        <Input
                            type="text"
                            placeholder="Enter phone number"
                            value={telefone1}
                            onChange={(e) => setTelefone1(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTelefone2" className="formNameInputs">
                        <Form.Label>Phone Number 2</Form.Label>
                        <Input
                            type="text"
                            placeholder="Enter phone number"
                            value={telefone2}
                            onChange={(e) => setTelefone2(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTelefone3" className="formNameInputs">
                        <Form.Label>Phone Number 3</Form.Label>
                        <Input
                            type="text"
                            placeholder="Enter phone number"
                            value={telefone3}
                            onChange={(e) => setTelefone3(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formIdade" className="formNameInputsAge">
                        <Form.Label>Age</Form.Label>
                        <Input
                            type="number"
                            placeholder="Enter age"
                            value={idade}
                            onChange={(e) => setIdade(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="formNameButton">
                        <Button variant="primary" type="submit" className="buttonEdit">
                            Save
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditModal;