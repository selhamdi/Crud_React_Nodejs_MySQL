const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 
 
const app = express();
 
app.use(cors())
// create express app
 
// setup the server port
const port = process.env.PORT || 5000;
 
// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));
 
// parse request data content type application/json
app.use(bodyParser.json());
 
// define root route
app.get('/', (req, res)=>{
    res.send('Hello World');
});
// import employee routes
const employeeRoutes = require('./src/routes/employee.route');
const modulesRoutes = require('./src/routes/modules.route');
const etudiantsRoutes= require('./src/routes/etudiants.route');
const professeursRoutes= require('./src/routes/professeurs.route');


// create employee routes
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v2/modules', modulesRoutes);
app.use('/api/etudiants',etudiantsRoutes) ;
app.use('/api/professeurs',professeursRoutes) ;


// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
});