import React from 'react';
import axios from 'axios';
import '../table/table.css';

const URL = 'http://localhost:5033/api/PhoneBook';

export default function Table({ listaItens }) {
    const handleDelete = (id) => {
        axios.delete(`${URL}?idContact=${id}`)
            .then(() => {
                console.log('Item deletado com sucesso');
                window.location.reload();
            })
            .catch(() => {
                console.log('Erro ao deletar o item');
                window.location.reload();
            });
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
                                <button className="buttonEdit">
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
        </div>
    );
}