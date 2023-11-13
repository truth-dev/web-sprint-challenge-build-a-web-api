// Write your "projects" router here!
const express = require('express')

const router = express.Router()
const Projects = require('./projects-model')



router.get('/api/projects', (req,res) => {
Projects.get()
.then((projects) => {
    res.status(200).json(projects);
})
.catch((err) => {
    res.status(500).json({message:'Error with undefined projects'})
})
})
router.get('/api/projects/:id', (req,res) => {
 const {id} = req.params 
 Projects.get(id)
 .then((proj) => {
  if(proj){
    res.status(200).json(proj)
  }else {
    res.status(404).json({message:'Can not be found'})
  }
 })   
})
router.post('/api/projects', (req,res) => {
    
})
router.put('/api/projects', (req,res) => {
    
})
router.delete('/api/projects', (req,res) => {
    
})
router.get('/api/projects/:id/actions', (req,res) => {
    
})