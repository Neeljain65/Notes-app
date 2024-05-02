const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileDescription: {
        type: String,
        required: true,
    },
    secure: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    files: {
        type: String,
        required: true,
    },
    uploadedBy: {
        
    },

});
const GroupSchema = new mongoose.Schema({
    groupName: String,
    files: [
      {
        secure:String
      },
    ],
  });

  const Group = mongoose.model('Group', GroupSchema);
  const Notes = mongoose.model('Notes', NoteSchema);
module.exports = {
    Group,
    Notes
};