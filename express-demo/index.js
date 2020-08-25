const express = require('express');
const app = express();
app.use(express.json());


const courses = require('./routes/courses');
app.use('/api/courses',courses);


const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}.......`));

