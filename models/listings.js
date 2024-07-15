const mongoose=require("mongoose");

let listingSchema= new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  image:{
      type:String, 
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KIj2I3Nff2iCLTqzR-LiZcFeIeftVgHeYw&s",
      set: (v)=>
        v===""
      ?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KIj2I3Nff2iCLTqzR-LiZcFeIeftVgHeYw&s":
      v,
  },
  price:{
    type:Number,
    required:true,
  },
  location:{
    type:String,
    required:true,
  },
  country:{
    type:String,
    required:true,
  },
})

const listings= mongoose.model("listings",listingSchema)

module.exports=listings;
