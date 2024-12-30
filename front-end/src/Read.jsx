import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Read() {
  const { id } = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/read/` + id)
      .then(res => { 
        console.log(res);
        setStudent(res.data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div class="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div class="container w-75 rounded p-3">
        <div class="Card bg-white p-4">
          <h1>Student Details</h1>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Age: {student.email}</p>

          <Link to='/' class="btn btn-outline-primary me-4">Retour</Link>
                <Link to={`/edit/${student.id}`}  class="btn btn-outline-warning">Edit</Link>
        </div>
      </div> 
    </div>
  );
}

export default Read;
