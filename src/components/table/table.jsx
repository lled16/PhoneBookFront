import React, { useState } from 'react';
import axios from 'axios';
import EditModal from '../modalEdit/modalEdit';
import '../table/table.css';

const URL = 'http://localhost:5033/api/PhoneBook';

export default function Table({ listaItens }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editContact, setEditContact] = useState(null);

    const handleDelete = (id) => {
        axios.delete(`${URL}?idContact=${id}`)
            .then(() => {
                console.log('Cadastro deletado');
                window.location.reload();
            })
            .catch(() => {
                console.log('Cadastro deletado');
                window.location.reload();
            });
    };

    const handleEdit = (contact) => {
        setEditContact(contact);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditContact(null); 
    };

    const handleSaveEditModal = () => {
        window.location.reload(); 
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">PhoneNumbers</th>
                        <th scope="col">Modify</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {listaItens.map(item => (
                        <tr key={item.contactId}>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.phones ? item.phones.map(phone => phone.phoneNumber).join(' | ') : ''}</td>
                            <td>
                                <button className="buttonEdit" onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item.contactId)} className="buttonDelete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editContact && (
                <EditModal
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    contact={editContact}
                    onSave={handleSaveEditModal}
                />
            )}
        </div>
    );
}