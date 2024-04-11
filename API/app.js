let ipServer = "http://192.168.15.2:2523";
let ipSite = "http://192.168.15.2:5173";

const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = socketIo(server, { cors: { origin: ipSite } });
exports.io = io;

const PORT = 2523;

const axios = require("axios");

app.use(express.json());

app.use((req, res, next) => {
  // Qualquer endereço pode fazer requisição
  res.header("Access-Control-Allow-Origin", "*");
  // Tipos de método que a API aceita
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  // Permitir o envio de dados para API
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // Executar o cors
  app.use(cors());
  // Quando não houver erro deve continuar o processamento
  next();
});

const dataTypes = [
  "cargo",
  "empresa",
  "nota",
  "funcionario",
  "pedido",
  "kinay",
  "impostos",
  "ferias",
  "contrato",
  "conta",
];

io.on("connection", (socket) => {
  console.log(`Cliente conectado ${socket.id}`);

  socket.on(`fetch cargo`, async () => {
    const response = await axios.get(`${ipServer}/cargo`);
    const data = response.data.data;

    socket.emit(`cargo data`, data);
  });
  
  socket.on(`fetch empresa`, async () => {
    const response = await axios.get(`${ipServer}/empresa`);
    const data = response.data.data;

    socket.emit(`empresa data`, data);
  });

  socket.on(`fetch nota`, async () => {
    const response = await axios.get(`${ipServer}/nota`);
    const data = response.data.data;

    socket.emit(`nota data`, data);
  });

  socket.on(`fetch funcionario`, async () => {
    const response = await axios.get(`${ipServer}/funcionario`);
    const data = response.data.data;

    socket.emit(`funcionario data`, data);
  });

  socket.on(`fetch pedido`, async () => {
    const response = await axios.get(`${ipServer}/pedido`);
    const data = response.data.data;

    socket.emit(`pedido data`, data);
  });

  socket.on(`fetch kinay`, async () => {
    const response = await axios.get(`${ipServer}/kinay`);
    const data = response.data.data;

    socket.emit(`kinay data`, data);
  });

  socket.on(`fetch impostos`, async () => {
    const response = await axios.get(`${ipServer}/impostos`);
    const data = response.data.data;

    socket.emit(`impostos data`, data);
  });

  socket.on(`fetch ferias`, async () => {
    const response = await axios.get(`${ipServer}/ferias`);
    const data = response.data.data;

    socket.emit(`ferias data`, data);
  });

  socket.on(`fetch contrato`, async () => {
    const response = await axios.get(`${ipServer}/contrato`);
    const data = response.data.data;

    socket.emit(`contrato data`, data);
  });

  socket.on(`fetch conta`, async () => {
    const response = await axios.get(`${ipServer}/conta`);
    const data = response.data.data;

    socket.emit(`conta data`, data);
  });
});

dataTypes.forEach((type) => {
  const controller = require(`./controllers/${type}`);
  app.use(`/${type}`, controller);
});

server.listen(PORT, () => {
  console.log("Servidor iniciado...");
});
