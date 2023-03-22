require("dotenv").config();
const Post = require("../models/post");

const controller = {};

controller.get = async (req, res) => {
    try {
        let posts = await Post.find();
        res.status(200).json({status : "Success", posts : posts});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.post = async (req, res) => {
    try {
        let newPost = await new Post({
            ...req.body,
            user : req.loginUser.userId
        })
        newPost = await newPost.save();
        res.status(201).json({status : "Post created", data : newPost});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.put = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({status : "Failed", message : "Invalid Id"});
        if(post.user == req.loginUser.userId) {
            let updated = await Post.findByIdAndUpdate(req.params.id, req.body, {new : true});
            res.status(200).json({status : "Success"});
        } else {
            res.status(401).json({status : "Failed", message : "Unauthorized"});
        }
        
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.delete = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({status : "Failed", message : "Invalid Id"});
        if(post.user == req.loginUser.userId) {
            let updated = await Post.findByIdAndDelete(req.params.id);
            res.status(200).json({status : "Successfully deleted"});
        } else {
            res.status(401).json({status : "Failed", message : "Unauthorized"});
        }
        
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}


module.exports = controller;