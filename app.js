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


const user = require('./routes/user');
app.use(user);

const message = require('./routes/message');
app.use(message);

const group = require('./routes/group');
app.use(group);

//database
const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const UserGroup = require('./models/userGroup');

Message.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Message);
User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

const con = require('./util/database');
con
    .sync()
    .then((result) => {
        console.log(result);
        app.listen(3000);
    })
    .catch(err => console.log(err));

