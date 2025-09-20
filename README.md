
# 🌍 Wanderlust

A full-stack web application inspired by Airbnb, built with **Node.js, Express, MongoDB, and EJS**. It allows users to explore, create, and manage property listings from around the world.

---

## 🚀 Features

* ✨ **User Authentication** – Sign up, log in, and manage accounts.
* 🏠 **Listings Management** – Create, edit, and delete property listings.
* 🖼️ **Image Uploads** – Add images for each listing (via Cloudinary / local storage).
* 💬 **Reviews System** – Leave reviews and ratings on listings.
* 🌎 **Interactive Maps** – Map integration using Mapbox / Leaflet.
* 🔒 **Validation & Error Handling** – Proper input validation and custom error pages.
* 🎨 **Responsive UI** – Built with Bootstrap / custom CSS for mobile-friendly experience.

---

## 🛠️ Tech Stack

**Frontend:**

* HTML, CSS, Bootstrap
* EJS (templating engine)

**Backend:**

* Node.js, Express.js
* MongoDB (Mongoose ODM)

**Other Tools & Libraries:**

* Passport.js (authentication)
* Method-Override (PUT & DELETE requests)
* Express-Session & Connect-Mongo (session storage)
* Cloudinary (image hosting)
* Mapbox / Leaflet (map integration)

---

## 📂 Project Structure

```
wanderlust/
│── models/          # Mongoose models (Listing, Review, User)
│── routes/          # Express routes
│── views/           # EJS templates
│   ├── listings/    # Listing-related pages
│   ├── reviews/     # Review-related pages
│   └── users/       # Auth-related pages
│── public/          # Static files (CSS, JS, images)
│── utils/           # Custom error handlers, async wrappers
│── app.js           # Main server file
│── package.json     # Dependencies & scripts
```

---

## ⚡ Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Setup environment variables in a `.env` file

   ```env
   MONGO_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   MAPBOX_TOKEN=your_mapbox_token
   SECRET=your_session_secret
   ```

4. Start the app

   ```bash
   npm start
   ```

5. Visit the app

   ```
   http://localhost:8080
   ```

---

## 📸 Screenshots

(Add screenshots of homepage, listing page, create listing form, etc.)

