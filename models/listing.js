const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String
    },
    
 image: {
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://unsplash.com/photos/antique-pendulum-clock-on-a-floral-wallpaper-C953386SPtc",
            set: (v) =>
                v === ""
                    ? "https://unsplash.com/photos/antique-pendulum-clock-on-a-floral-wallpaper-C953386SPtc"
                    : v,
        },
    },
    price: {
        type:Number
    },
    location: {
        type:String
    },
    country: {
        type:String
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports= Listing;
