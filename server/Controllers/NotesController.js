const express = require("express");
const dotenv = require("dotenv");
const {Group,Notes} = require("../Models/Notes");

const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary');
dotenv.config();

const storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const uploadNote = async (req, res) => {
    try {
        const fileName = req.body.title;
        const fileDescription = req.body.description;
        const tags = req.body.tags;
        const file = req.file.filename;
        const groupName= req.body.groupName;
        const uploadedBy = req.body.userId;
        console.log(uploadedBy);

        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        let presecure_url=result.secure_url;
        const newFile = new Notes({
            fileName: fileName,
            fileDescription: fileDescription,
            secure: result.secure_url,
            tags: tags,
            files: file,
            uploadedBy: uploadedBy
        });

        let group = await Group.findOne({ groupName });
    if (!group) {
      group = new Group({ groupName, files: [] });
    }

    // Add file information to the group
    group.files.push({
      secure:presecure_url
    });
          // Save the group
          await group.save();
      
        await newFile.save();
        res.send({ status: "Ok" });

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

const getNote = async (req, res) => {
    try {
        const { title, tag } = req.query;
        if(title==="")
        {
            res.send({data:""})
        
        }
        else{
            const query={}


        if (title) {
            query.fileName = {
                $regex: title,
                $options: "i"
            };
        };

        // if (tag) {
        //     query.tag = {
        //         $regex: tag,
        //         $options: "i"
        //     };
 
            const data = await Notes.find(query);
           
            res.send({ data: data });
        }
        


       

    } catch (error) {
        console.log(error);
    }
};

const getNoteByID = async (req, res) => {
    try {
        const userId = req.params.id;
       

        await Notes.find({
            uploadedBy: userId
        }).then(data => {
           
            res.send({ data: data });
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = { uploadNote, getNote, getNoteByID };
