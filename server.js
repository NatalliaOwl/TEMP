// importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcryptjs = require('bcryptjs');
const path = require('path');
// const { upload, uploadMultiple } = require('./middleware/multer');
// const { getStorage, ref, uploadBytesResumable } = require('firebase/storage');

// require('dotenv').config();

// firebase admin setup
let serviceAccount = require("./public/credentials/ns-ecommercewebapp-firebase-adminsdk-8b1z4-522f20e93b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// declare static path
let staticPath = path.join(__dirname, "public");

// initializing express.js
const app = express();

// middlewares
app.use(express.static(staticPath));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

// signup route
app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post("/signup", (req, res) => {
    console.log(req.body);
// т.к. у меня не установлен bcrypt, то ответ приходит не полный с этим кодом
    let { name, email, password, phoneNumber, tac, notification } = req.body;

    //response validation
    if(name.length < 3) {
        return res.json({'alert': 'Name must be at least 3 letters long.'});
    } else if(!email.length) {
        return res.json({'alert': 'Please enter email address.'});
    } else if(password.length < 8) {
        return res.json({'alert': 'Password must be at least 8 symbols long.'});
    } else if(!phoneNumber.length) {
        return res.json({'alert': 'Please enter phone number.'});
    } else if(!Number(phoneNumber) || phoneNumber.length < 10) {
        return res.json({'alert': 'Invalid phone number.'});
    } else if(!tac) {
        return res.json({'alert': 'Please agree to the terms and conditions.'});
    }

    // store user in DB
    db.collection('users').doc(email).get()
        .then(user => {
            if(user.exists) {
                return res.json({'alert': 'Email address is already exists. Please login or enter another email.'});
            } else {
                //encrypt password
                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users')
                            .doc(email)
                            .set(req.body)
                            .then(data => {
                                res.json({
                                    name: req.body.name,
                                    email: req.body.email,
                                    seller: req.body.seller
                                })
                            })
                     })
                 })
            }
        })
})

// login route
app.get("/login", (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if (!email.length || !password.length) {
        return res.json({'alert': 'Please fill out all fields.'});
    }

    db.collection('users').doc(email).get()
      .then(user => {
          if (!user.exists) {      // if email does not exist
              return res.json({'alert': 'Entered email does not exist.'})
          } else {
              bcryptjs.compare(password, user.data().password, (err, result) => {
                  if (result) {
                      let data = user.data();
                      return res.json({
                          name: data.name,
                          email: data.email,
                          seller: data.seller,
                      })
                  } else {
                      return res.json({'alert': 'Password is incorrect.'})
                  }
              })
          }
      })
})

// seller route
app.get("/seller", (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req, res) => {
    let { name, about, address, phoneNumber, tac, legitInfo, email } = req.body;
    if (!name.length || !address.length || !about.length || !phoneNumber.length < 10
        || !Number(phoneNumber)) {
        return res.json({'alert': 'Invalid information.'});
    } else if (!tac || !legitInfo) {
        return res.json({'alert': 'Please agree to the terms and conditions.'})
    } else {
        // update users seller status here
        db.collection('sellers').doc(email).update({
            seller: true
        }).then(data => {
            res.json(true);
        })
    }
})

app.get("/product", (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})

app.get('/product/:id',  (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})

app.get('/cart/:id',  (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"));
})

// код Ирины для search
app.get('/search/:key', (req, res) => {
    res.sendFile(path.join(staticPath, 'search.html'));
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

app.get("/add-product", (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
})

app.post("/add-product", (req, res) => {
    let { name, shortDes, des, sizes, actualPrice, discount, sellPrice, stock,
    tags, tac } = req.body;

    // if(!name.length) {
    //     return res.json({'alert': 'Enter product name.'});
    // } else if(shortDes.length > 100 || shortDes.length < 10) {
    //     return res.json({'alert': 'Short line must be between 10 and 100 letters long.'});
    // } else if(!des.length) {
    //     return res.json({'alert': 'Enter detail description about the product.'});
    // }
    // else if(!sizes.length) {
    //     return res.json({'alert': 'Select at least one size.'});
    // } else if(!actualPrice.length || !discount.length || !sellPrice.length) {
    //     return res.json({'alert': 'Add prices and discount.'});
    // } else if(stock < 20) {
    //     return res.json({'alert': 'You should have at least 20 items in stock.'});
    // } else if(!tags.length) {
    //     return res.json({'alert': 'Enter few tags to help ranking your product in search.'});
    // } else if(!tac) {
    //     return res.json({'alert': 'You must agree to our Terms and Conditions.'});
    // }

    let docName = `${name.toLowerCase()} - ${Math.floor(Math.random() * 5000)}`;
    db
        .collection('products')
        .doc(docName)
        .set(req.body)
        .then(data => {
            res.json({'product': name});
        })
        .catch(err => {
            return res.json({'alert': 'Some error occurred.Try again.'});
        })


})

app.get("/women", (req, res) => {
    res.sendFile(path.join(staticPath, "women.html"));
})

app.get("/men", (req, res) => {
    res.sendFile(path.join(staticPath, "men.html"));
})

app.get("/accessories", (req, res) => {
    res.sendFile(path.join(staticPath, "accessories.html"));
})

app.get("/terms", (req, res) => {
    res.sendFile(path.join(staticPath, "terms.html"));
})
app.get("/privacy", (req, res) => {
    res.sendFile(path.join(staticPath, "privacy.html"));
})

// 404 route
app.get("/404", (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})
app.use((req, res) => {
    res.redirect('/404');
})
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000')
})
