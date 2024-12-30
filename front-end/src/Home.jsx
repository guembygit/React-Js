import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Home() {
  const [data, setData] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [id, setDeleteId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    setShowConfirmModal(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    axios.delete('http://localhost:8081/delete/' + id)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="container w-75 rounded p-3">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success mb-4">Ajouter +</Link>
        </div>
        <h4>Liste des étudiants</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <Link to={`/read/${student.id}`} className="btn btn-outline-primary me-4">Lire</Link>
                    <Link to={`/edit/${student.id}`} className="btn btn-outline-warning me-4">Edit</Link>
                    <button onClick={() => handleDelete(student.id)} className="btn btn-outline-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal show={showConfirmModal} onHide={handleCancelDelete} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation de suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Êtes-vous sûr de vouloir supprimer cet étudiant ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Annuler
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;




/* import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';



function Home() {
    const [data, setData]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[])
 const handleDelete = (id)=>{
    const confirmation = window.confirm("Voulez-vous vraiment supprimer cet étudiant ?");

  if (confirmation) {
    axios.delete('http://localhost:8081/delete/' + id)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  } else {
   
  }
    
 }
  return (
 <div class="d-flex vh-100 bg-light justify-content-center align-items-center">
<div class="container w-75 rounded p-3">
    <div className="d-flex justify-content-end">
    <Link to="/create" class="btn btn-success mb-4">Ajouter + </Link>
    </div>
    <h4>Liste des étudiants</h4>
<table class="table table-striped ">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
           {data.map((student, index)=>{
            return <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td> 
                <td>{student.email}</td>
                <td>
                <Link to={`/read/${student.id}`} class="btn btn-outline-primary me-4">Lire</Link>
                <Link to={`/edit/${student.id}`}  class="btn btn-outline-warning me-4">Edit</Link>
                <button onClick={()=>handleDelete(student.id)}  class="btn btn-outline-danger">Delete</button>
                </td>
            </tr>
           })}
        </tbody>
    </table>
</div>

 </div>



  );
}

export default Home;
 */