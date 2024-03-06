# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refr

Para criar uma tabela pelo sequelize 
 npx sequelize-cli model:generate --name ##Nome tabela --attributes ##Atributos EX:numeroPDD:float,valorPDD:float,nomePDD:string,descricaoServPDD:string,empresaPDD:string,situacaoPDD:string,dataPDD:dateonly 


 Para baixar o banco do sequelize no seu mysql automaticamente 
  npx sequelize-cli db:migrate

  Para iniciar a API
  cd API

  nodemon app.js
  ou
  npx nodemon app.js

  npx sequelize-cli model:generate --name Contrato --attributes numeroCT:float,ValorCT:float,nomeCT:string,empresaCT:string,idempresaCT:INTEGER,dataCT:dateonly 