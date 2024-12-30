import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8081/read/` + id)
          .then(res => { 
            console.log(res);
            setValues({...values, name: res.data[0].name,email: res.data[0].email});
          })
          .catch(err => console.log(err));
      }, []);

    const [values, setValues]= useState({
        name:'',
        email:''
    })
    const navigate = useNavigate();
    
    const handleUpdate = (event)=>{
        event.preventDefault();
        axios.put('http://localhost:8081/update/' + id, values)
        .then(res => { 
            console.log(res);
            navigate('/')
          })
          .catch(err => console.log(err));
    }

    return (
        <div class="d-flex vh-100 bg-light justify-content-center align-items-center">
            
        <form class="row g-3 container w-50 rounded p-3 border" onSubmit={handleUpdate}>
        <h3>Modifier Student</h3>
            <div class="col-6">
    <label class="form-label">Nom</label>
    <input type="text" class="form-control"  placeholder="Nom de l'étudiant" value={values.name}
    onChange={e => setValues({...values, name: e.target.value})}/>
  </div>
  <div class="col-md-6">
    <label  class="form-label">Email</label>
    <input type="email" class="form-control" placeholder="Email de l'étudiant" value={values.email}
     onChange={e => setValues({...values, email: e.target.value})}/>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Modifier un étudiant </button>
  </div>
</form>
</div>
    )
}

export default Edit
