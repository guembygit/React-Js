import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues]= useState({
        name:'',
        email:'',
        image:''
    })
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8081/student', values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err));
    }
    return (
        <div class="d-flex vh-100 bg-light justify-content-center align-items-center">
        <form class="row g-3 container w-50 rounded p-3 border" onSubmit={handleSubmit}>
        <h3>Ajouter Student</h3>
            <div class="col-6">
    <label class="form-label">Nom</label>
    <input type="text" class="form-control"  placeholder="Nom de l'étudiant"
    onChange={e => setValues({...values, name: e.target.value})}/>
  </div>
  <div class="col-md-6">
    <label  class="form-label">Email</label>
    <input type="email" class="form-control" placeholder="Email de l'étudiant"
     onChange={e => setValues({...values, email: e.target.value})}/>
  </div>
  <div class="col-md-6">
    <label  class="form-label">Image</label>
    <input type="file" class="form-control" placeholder="Image de l'étudiant"
     onChange={e => setValues({...values, image: e.target.value})}/>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Ajouter un étudiant </button>
  </div>
</form>
</div>
    )
}

export default Create
