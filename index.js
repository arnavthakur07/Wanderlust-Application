const express = require("express")
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js")



const app = express()
let port = 8080;
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then((res)=> {
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/",(req,res)=> {
  res.send("working the root")
})

app.get("/listings",wrapAsync(async(req,res)=> {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings})
}));

app.get("/listings/new",async(req,res)=> {
 res.render("listings/new.ejs")
})

app.get("/listings/:id",async(req,res)=> {
  let {id} = req.params;
  const listing = await Listing.findById(id)
  res.render("listings/show.ejs",{listing})
})

app.post("/listings",wrapAsync(async(req,res,next)=> {
  let {title, description, image,  price, location, country } = req.body
      const newListing = new Listing({
      title,
      description,
      image,
      price,
      location,
      country,
    });

    
    await newListing.save();

    
    res.redirect("/listings");

}));


app.get("/listings/:id/edit",wrapAsync(async(req,res)=> {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
}));

app.put("/listings/:id",wrapAsync(async(req,res)=> {
 let {id} = req.params;
   let {title, description, image,  price, location, country:newListings} = req.body
 const updatedlist = await Listing.findByIdAndUpdate(id, {title, description, image,  price, location, country:newListings});
  console.log(updatedlist)
  res.redirect(`/listings/ ${id}`);
}));
  
app.delete("/listings/:id",wrapAsync(async(req,res)=> {
   let {id} = req.params;
   const deletedlisting = await Listing.findByIdAndDelete(id);
   console.log(deletedlisting);
   res.redirect("/listings")
}));




app.use((err,req,res,next)=> {
  let {statusCode=500, message="something went wrong"} = err;
  res.status(statusCode).send(message)
});
  

app.listen(port,()=> {
    console.log(`listening the port ${port}`)
});