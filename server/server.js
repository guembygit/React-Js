import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import multer from 'multer';
import path from 'path';

const app = express();
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../server/Images')
    },
    filename:(req, file,cb)=>{
        console.log(file)
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'react_node_crud'
})



app.get('/',(req,res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql,(err, result)=>{
        if(err) return res.json({Message: "Erreur au niveau du server"});
        return res.json(result);
    })
})


app.post('/student',upload.single('image'),(req,res)=>{
    const sql = "INSERT INTO student (name,email,image) VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.image
    ]
    db.query(sql, [values], (err, result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})



app.get('/read/:id',(req,res)=>{
    const sql = "SELECT * FROM student WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id],(err, result)=>{
        if(err) return res.json();
        return res.json(result);
    })
})



app.put('/update/:id',(req,res)=>{
    const sql = "UPDATE student SET name = ?, email= ? WHERE id= ?";
    const id = req.params.id;
    db.query(sql,[  req.body.name,req.body.email,id],(err, result)=>{
        if(err) return res.json();
        return res.json(result);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM student WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id],(err, result)=>{
        if(err) return res.json();
        return res.json(result);
    })
})


app.listen(8081,()=>{
    console.log("Listening");
})