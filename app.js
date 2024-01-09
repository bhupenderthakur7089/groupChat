const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors({
    origin: "http://127.0.0.1:5501",
    method: ['GET', 'POST']
}));

const path = require('path');
app.use(express.static(path.join(__dirname)));

// app.use((req, res) => {
//     console.log('RL Requested is: ', req.url);
//     if (req.url === '/') {
//         res.sendFile(path.join(__dirname, 'signUp.html'));
//     } else {
//         res.sendFile(path.join(__dirname, `${req.url}`));
//     }
// })

const user = require('./routes/user');
app.use(user);

const message = require('./routes/message');
app.use(message);

//database
const User = require('./models/user');
const Message = require('./models/message');

Message.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Message);

const con = require('./util/database');
con
    .sync()
    .then((result) => {
        console.log(result);
        app.listen(3000);
    })
    .catch(err => console.log(err));


// const helmet = require('helmet');
// app.use(helmet());

// const compression = require('compression');
// app.use(compression());

// const morgan = require('morgan');
// app.use(morgan('combined', { stream: accessLogStream }));

// const fs = require('fs');
// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'),
//     { flags: 'a' }
// );

