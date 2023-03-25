const mongoose=require('mongoose')

const noteSchema=mongoose.Schema({ //kaunsa user ka ye note 
    title:String,
    sub:String,
    body:String,
    userID:String // jo bhi user note banayega uska _id wo jayega
},{
    versionKey:false
})

const NoteModel=mongoose.model("note",noteSchema)
module.exports=NoteModel