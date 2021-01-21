const express = require("express");
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize("sqlite:./main.db", {
    logging: false,
    dialect: "sqlite",
    define: {
      timestamps: false,
    },
});
class User extends Model {}
User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      avatar: DataTypes.STRING
    },
    { sequelize, modelName: "Users" }
  );


//id
//first_name
//last_name
//avatar


const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;


(async () => {
    await sequelize.sync({ alter: true });
    
    app.get('/users',async (req,res) => {
        const all = await User.findAll();
        res.send(JSON.stringify(all))
    });

    app.post('/users', async (req,res) => {
        if(true){
        const user = await User.create({ 
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            avatar: req.body.avatar
         });}
        res.status(201).send('{"code":201}');
    });

    app.get('/users/:id', async (req,res) => {
      if (req.params.id < 1) {
        return res.status(400).send({msg:"negative index"})
      }
      user = await User.findByPk(req.params.id);
      if(user === null){
        return res.status(404).send({msg:"not found"})
      }
      return res.status(200).send(user).header()
    });

    app.delete('/users/:id', async (req,res) => {
      if (req.params.id < 1) {
        return res.status(400).send({msg:"negative index"})
      }
      user = await User.findByPk(req.params.id);
      if(user === null){
        return res.status(404).send({msg:"not found"})
      }
      await user.destroy();
      return res.status(200).send({msg:"user was deleted"})
    })
    
})();

app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
})