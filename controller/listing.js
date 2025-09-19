const Listing = require("../models/listing")

module.exports.index = async(req,res)=> {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings})
}

module.exports.renderNewForm = (req,res)=> {
 res.render("listings/new.ejs")
}


module.exports.showListing = (async(req,res)=> {
  let {id} = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
      path:"author"
    }
  })
  .populate("owner");
 
if(!listing) {
  req.flash("error", "listing you requested does not exist")
  res.redirect("/listings")
}
console.log(listing)
  res.render("listings/show.ejs",{listing})
});



module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  

  const { listing } = req.body;

  if (!listing) {
    req.flash("error", "Invalid form submission");
    return res.redirect("/listings/new");
  }

  const newListing = new Listing(listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename}
  await newListing.save();

  req.flash("success", "New listing is created!");
  res.redirect("/listings");
};


module.exports.renderEditForm = (async(req,res)=> {
    let {id} = req.params;
    id = id.trim();
    const listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error", "listing you requested does not exits")
     res.redirect("/listings")
    }
    let originalImageUrl=listing.image.url;
   originalImageUrl =  originalImageUrl.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit.ejs",{listing, originalImageUrl} )
});



module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

 let listing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

  if (typeof req.file !== "undefined") {
     let url = req.file.path;
     let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing updated");
  res.redirect(`/listings/${listing._id}`);
};




module.exports.destroylisting = (async(req,res)=> {
   let {id} = req.params;
   const deletedlisting = await Listing.findByIdAndDelete(id);
   console.log(deletedlisting);
    req.flash("success", "listing deleted")
   res.redirect("/listings")
})




// module.exports.createListing = (async(req,res,next)=> {
//   let {title, description, image,  price, location, country } = req.body

//       const newListing = new Listing({
//       title,
//       description,
//       image,
//       price,
//       location,
//       country,
    
//     });

//      newListing.owner = req.user._id;
//     await newListing.save();
//    req.flash("success", "New listing is created !")
    
//     res.redirect("/listings");

// });



// module.exports.updateListing = (async(req,res)=> {
//  let {id} = req.params;
//    let {title, description, image,  price, location, country:newListings} = req.body
//  const updatedlist = await Listing.findByIdAndUpdate(id, {title, description, image,  price, location, country:newListings});
//   req.flash("success", "listing updated")
//   res.redirect(`/listings/${id}`);
// });