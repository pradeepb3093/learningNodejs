const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorCtrl = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    User.findById('63557fb7d4aa9549d588b6f8')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(errorCtrl.get404);
mongoConnect(() => {
    // const newUser = new User('pradeep', 'pradeep@gmail.com');
    // newUser.save()
    //     .then(r => {
    //         console.log(r);
            
    //     })
    //     .catch(err => console.log(err));
    app.listen(3000);
});