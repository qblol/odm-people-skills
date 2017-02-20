const express = require('express');
const User = require('../models/user');

module.exports = {
  getUsers: function(req,res){
    User.find()
    .then(function(data){
      res.json(data)
    })
  },
  getUser: function(req,res){
    User.find({username:req.params.username})
    .then(function(data){
      res.json(data)
    })
  },
  createUser: function(req,res){
    User.findOne({username: req.body.username})
    .then(function(data){
      if(data) {
        res.send('username telah terpakai')
      } else {
        let newUser = new User({
          username: req.body.username,
          photo: req.body.photo,
          skills: []
        })
        newUser.save()
        .then(function(data){
          res.json(data)
        })
      }
    })
  },
  getSkills: function(req,res){
    User.find({username: req.params.username})
    .then(function(data){
      res.json(data[0].skills)
    })
  },
  addSkill: function(req,res){
    User.findOne({username: req.params.username})
    .then(function(data){
      let skillName = []
      data.skills.forEach(function(skill){
        skillName.push(skill.name)
      })
      if(skillName.indexOf(req.body.skillname) >= 0){
        res.send('skill sudah ada')
      } else if(req.body.score > 10) {
        res.send('score maksimal 10')
      } else if(req.body.score < 1) {
        res.send('score minimal 1')
      } else {
        User.findOneAndUpdate({username:req.params.username},{
          $push:{skills:{name:req.body.skillname,score: req.body.score}}
        },{new: true})
        .then(function(data){
          res.json(data)
        })
      }
    })
  },
  removeSkill: function(req,res){
    User.findOne({username: req.params.username})
    .then(function(data){
      let skillName = []
      data.skills.forEach(function(skill){
        skillName.push(skill.name)
      })
      let index = skillName.indexOf(req.body.skillname)
      if(index == -1){
        res.send('skill tidak ada')
      } else {
        User.findOneAndUpdate({username:req.params.username},{
          $pull:{skills:{name:req.body.skillname}}
        },{new: true})
        .then(function(data){
          res.json(data)
        })
      }
    })
  },
  deleteUser: function(req,res){
    User.findOneAndRemove({username: req.params.username})
    .then(function(data){
      res.send('User Deleted')
    })
  }
}
