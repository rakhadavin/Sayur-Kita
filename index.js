const { send } = require('body-parser')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//port bisa disesuaikan, defaultnya 300 dan port 80 untuk default
const port = 3001
const db = require("./connection")
const cors = require('cors')
const jwt = require('jsonwebtoken')


require('dotenv').config();
const middleware = (req, res, next) => {
  console.log("Middleware Active...")
  next()
}

const response = require("./response")

app.use(bodyParser.json())//uintuk mengubah dari post methode result menjadi json format
//routes/endpoints utama untuk get
app.use(cors())


app.get("/user", (request, res) => {
  db.query("SELECT * FROM user", (error, result) => {
    console.log(result)
    console.log(error)
    // res.send("Succsessfully to get Users")
    // res.json(result)
    response(200, result, "Berhasil mendapatkan users", res)
  })
})
app.get('/', (req, res) => {
  res.send('You Successfully Get Data, But Not To Get Her')
})

app.post("/login", (req, res) => { // req itu akan mengakbil data dari url, atau pun body saat post 
  // console.log({"request dari luar ( pake kurawal )":  req.body})
  // console.log({requestFromOutseide:  req.body.username}) //untk dapetion body secara spesifik
  console.log({ "param name": req.body }) //untuk dapetin semua quer param nya
  console.log({ "post username": req.body.username })
  console.log("Succesfully Login : ", req.body.nick_name)
  res.send(`{Succesfully Login : ${req.body.nick_name}}`)


})

app.post("/user", (req, res) => {
  const nama_peserta = req.body.nama_lengkap;
  const kelas = req.body.kelas;
  const nama_sekolah = req.body.nama_sekolah;

  const data = {
    "nama_peserta": nama_peserta,
    "kelas": kelas,
    "nama_sekolah": nama_sekolah
  }

  const secret = process.env.JWT_SECRET
  const expiresIn = 60 * 60 * 1; // 60 detik * 60 menit * brp jam
  const token = jwt.sign(data, secret, { expiresIn: expiresIn })
  console.log(`{token:${token}}`)


  // const {nama_peserta,kelas,nama_sekolah} = req.body
  const sqlCmd = `INSERT INTO peserta (nama,kelas,nama_sekolah) VALUES ('${nama_peserta}','${kelas}','${nama_sekolah}')`
  db.query(sqlCmd, (error, fields) => {
    if (error) throw error
    if (fields.affectedRows) {
      res.send(`Berhasil menambahkan data atas nama ${nama_peserta}`)
    }
    // console.log(`fields : ${fields.affectedRows}`)
    console.log(nama_peserta)
  })


})

app.put("/user", (req, res) => {
  const requestID = req.body.id;
  const nama_peserta = req.body.nama_lengkap;
  const kelas = req.body.kelas;
  const nama_sekolah = req.body.nama_sekolah;

  const sqlCommand = `UPDATE peserta SET nama ='${nama_peserta}', kelas ='${kelas}', nama_Sekolah='${nama_sekolah}' WHERE id = '${requestID}`

  db.query(sqlCommand, (error, fields) => {
    console.log(`{fields : '${fields}'}`)
  })




  console.log(req.params)
  res.json(`Berhasil melakukan perubahan dengan id nomor ${requestID}`)
})

app.post("/register", (req, res) => {
  const nickName = req.body.nick_name
  const username = req.body.username
  const password = req.body.password
  const cart = {}
  const balance = 0
  const data = {
    "nick_name": nickName,
    "username": username,
    "password": password
  }
  const sceretKeyRegigster = process.env.JWT_SECRET
  const expiresIn = 60 * 60 * 1
  const jwtRegister = jwt.sign(data, sceretKeyRegigster, { expiresIn: expiresIn })
  const sqlRegisterCommand = `INSERT INTO user (nick_name,username,password,cart,balance) VALUES ('${nickName}','${username}','${password}','${cart}','${balance}')`
  db.query(sqlRegisterCommand, (error, result) => {
    if (error) {
      console.log(error)
    }
    if (result.affectedRows) {
      res.send(`Succesfully create new Account for  ${nickName}`)
    }
  })
})

app.listen(port, () => {
  //tulis sesuatu untuk menandakan response localhost runnung
  console.log(`Example app listening on port ${port}`)
})