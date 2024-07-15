//requiring the packages
const express=require("express");
const mongoose=require("mongoose");
const Listings=require("./models/listings.js");
const data=require("./init/data.js");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine","ejs");
app.set(path.join(__dirname,"views"))
app.engine("ejs",ejsMate);

//establishing the connection with db
let MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(
  console.log("connected to the database")
)
.catch((err)=>console.log(err));

async function main(){
  await mongoose.connect(MONGO_URL);
}


//root route
app.get("/",(req,res)=>{
  res.send("this is the root route");
})

//home route
app.get("/listings", async (req,res)=>{
  let allListings= await Listings.find({});
  res.render("listings/home.ejs",{allListings});
})

//show route
app.get("/listings/:id",async (req,res)=>{
  let id=req.params.id;
  let listings = await Listings.findById(`${id}`);
  res.render("listings/display.ejs",{listings});
})

//updation route
app.get("/listings/:id/edit",async (req,res)=>{
  let id=req.params.id;
  let listings = await Listings.findById(`${id}`);
  res.render("listings/edit.ejs",{listings});
})

app.post("/listings", async (req,res)=>{
  let id=req.body.id;
  let newTitle=req.body.title;
  let newPrice=req.body.price;
  let newImage=req.body.image;
  let newCountry=req.body.country;
  let newDescription=req.body.description;

  if(newTitle){
    await Listings.findByIdAndUpdate(id,{title:newTitle});
  }
  if(newImage){
    await Listings.findByIdAndUpdate(id,{image:newImage});
  }
  if(newCountry){
    await Listings.findByIdAndUpdate(id,{country:newCountry});
  }
  if(newDescription){
    await Listings.findByIdAndUpdate(id,{description:newDescription});
  }
  if(newPrice){
    await Listings.findByIdAndUpdate(id,{price:newPrice});
  }
  

  res.redirect("/listings");
})

//deletion route
app.get("/listings/:id/delete",(req,res)=>{
  let id=req.params.id;
  if(Listings.findByIdAndDelete(id).then((result)=>{console.log(`in deletion:::::${result}`)})){
    res.redirect("/listings");
  }
})

//new route
app.get("/listings/new",(req,res)=>{
  // res.render("listings/new.ejs");
  res.send(working);
})

app.post("/listings/new/creation", async (req,res)=>{
  let newTitle=req.body.title;
  let newImage=req.body.image;
  let newPrice=req.body.price;   
  let newContent=req.body.content;
  let newDescription=req.body.description;

  const newListings = new Listings({
    title: newTitle,
    image:newImage,
    price:newPrice,
    content:newContent,
    description:newDescription,
  });
  // await newListings.save().catch((err)=>{console.log(err)});
  res.redirect("/listings");
})



// port connection
let port=8080;
app.listen(port,(req,res)=>{
  console.log(`listening to port: ${port}`)
})