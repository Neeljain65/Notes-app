const mongoose = require("mongoose");
const Notes = require("../Models/Notes");
const GroupSchema= mongoose.Schema({
  Groupname:{
    type:String
    
  },
  Files:[
    Notes
  ]
});

module.exports = mongoose.model("Group", GroupSchema);