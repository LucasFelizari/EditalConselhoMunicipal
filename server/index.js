
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "conselhocultural"
})

app.use(cors());
app.use(express.json());

app.post("/registrar", (request, response) => {
    const { nome } = request.body;
    const { email } = request.body;
    const { endereco } = request.body;
    const { cidade } = request.body;
    const { telefone } = request.body;
    const { cpf } = request.body;
    const { senha } = request.body;

    let sql = "INSERT INTO usuario (nome, email, endereco, cidade, telefone, cpf, senha) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [nome, email, endereco, cidade, telefone, cpf, senha], (err, result) => {
        console.log(err);
        if (err == undefined) {
            response.send("success")
        }
        else {
            response.send("erro")
        }
    })
})

app.post("/login", (request, response) => {
    const { email } = request.body;
    const { senha } = request.body;

    let sql = "SELECT * FROM usuario WHERE email = ?"

    db.query(sql, [email], (err, result) => {

        if (!result) {
            console.log("naoEncontrado");
            response.send({
                msg: "naoEncontrado"
            })
        } else {
            if (result[0]?.senha == senha) {
                response.send({
                    msg: "success",
                    user: result[0]
                })
            }
            else {
                console.log("senhaErrada");
                response.send({
                    msg: 'senhaErrada'
                })
            }
        }
    })
})

app.post("/enviaredital", (request, response) => {
    const { idusuario } = request.body;
    const { titulo } = request.body;
    const { descricao } = request.body;
    const data_envio = new Date();
    let sql = "INSERT INTO arquivo (idusuario, titulo, descricao, data_envio) VALUES (?, ?, ?, ?)"

    db.query(sql, [idusuario, titulo, descricao, data_envio], (err, result) => {
        if (err == undefined) {
            response.send("success")
        }
    })
})

app.post("/buscareditaisusuario", (request, response) => {
    const { idusuario } = request.body;
    console.log(idusuario)


    let sql = "SELECT T2.NOME, T.TITULO, T.ARQUIVO, T.DESCRICAO FROM arquivo AS T INNER JOIN USUARIO AS T2 ON T2.IDUSUARIO = T.IDUSUARIO WHERE T.IDUSUARIO = '?';"

    db.query(sql, [idusuario], (err, result) => {
        response.send(result);
    })
})

app.post("/buscarenvios", (request, response) => {
    let sql = "SELECT * FROM ARQUIVO AS T INNER JOIN USUARIO AS T2 ON T.IDUSUARIO = T2.IDUSUARIO ORDER BY T.IDUSUARIO, T.IDARQUIVO";

    db.query(sql, (err, result) => {
        if (err == undefined) {
            response.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("rodando servidor");
})