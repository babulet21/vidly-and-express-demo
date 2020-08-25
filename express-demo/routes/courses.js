const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Courses = [
    {id:1, name:'course 1'},
    {id:2, name:'course 2'},
    {id:3, name:'course 3'}
];

router.get('/',(req,res)=>{
    res.send(Courses);
});

router.get('/:id',(req,res)=>{
    const course = Courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('course with this id could not be found');
    res.send(course);
});

router.post('/',(req,res)=>{
   
    const {error} = validateCourses(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);    

    const course = {
        id: Courses.length + 1,
        name: req.body.name
    };

    Courses.push(course);
    res.send(course);
});

router.put('/:id',(req,res)=>{
    const course = Courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('course with this id could not be found');

    const {error} = validateCourses(req.body);
    
    if(error) return res.status(400).send(error.details[0].message); 

    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id',(req,res)=>{
    const course = Courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('course with this id could not be found');

    const index = Courses.indexOf(course);
    Courses.splice(index,1);

    res.send(course);
});

function validateCourses(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course,schema);
}

module.exports = router;