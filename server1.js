const express = require('express');
const admin = require('firebase-admin');
// const bcrypt = require('bcrypt');
const path = require('path');

let serviceAccount = require("./public/credentials/ns-ecommercewebapp-firebase-adminsdk-8b1z4-522f20e93b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let staticPath = path.join(__dirname, "public")

const app = express();

app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})
app.get("/product", (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})
app.get("/search", (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"));
})
app.get("/cart", (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"));
})
app.get("/checkout", (req, res) => {
    res.sendFile(path.join(staticPath, "checkout.html"));
})
app.get("/mail", (req, res) => {
    res.sendFile(path.join(staticPath, "mail.html"));
})
app.get("/404", (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})
app.use((req, res) => {
    res.redirect('/404');
})
app.listen(3000, () => {
    console.log('listening on port 3000.........');
})
