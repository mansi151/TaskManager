const { sequelize } = require('./models')
const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/routes');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/taskRoute')
const app = express()
app.use(cors());
app.use(bodyParser.json());

app.use('/contact',contactRoute);
app.use('/tasks',taskRouter)
const port = 5000;

sequelize.sync().then(()=>{
    console.log('Database sync successfully')
}).catch((error)=>{
    console.log('error while connecting database',error)
})


app.listen(port,()=>{
    console.log('server running on port : ', port);
})
