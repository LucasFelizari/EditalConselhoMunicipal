
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "editalconselho"
})

app.use(cors());
app.use(express.json());

// app.get('/', (resquest, response) =>{
//     let  sql = "INSERT INTO usuario (nome) VALUES ('aaaaa')";

//     db.query(sql, (err, result) => {
//         console.log(err);
//     })
// })

function validarSeExiste(emailCadastro) {
    console.log(emailCadastro);
    let existe;
    let todoUsuarios = "SELECT * FROM usuario"
    db.query(todoUsuarios,(erro, result) =>{
         existe = result.some(e => e.email == emailCadastro);
         console.log(existe);
         return existe;
    })
}

app.post("/registrar", (request, response) => {
    const {nome} = request.body;
    const {email} = request.body;
    const {endereco} = request.body;
    const {cidade} = request.body;
    const {telefone} = request.body;
    const {cpf} = request.body;
    const {senha} = request.body;

//    const existeCadastro = validarSeExiste(email); 
//    console.log(existeCadastro);

    let  sql = "INSERT INTO usuario (nome, email, endereco, cidade, telefone, cpf, senha) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
    db.query(sql, [nome, email, endereco, cidade, telefone, cpf, senha], (err, result) => {
                console.log(err);
            })
})

app.listen(3001, () => {
    console.log("rodando servidor");
})