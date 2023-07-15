import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const database = {
    users : [
        {
            id: '123',
            name: 'John',
            email: 'johndoe@yahoo.eu',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@yahoo.eu',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/register', (req,res) => {
    const { email, uname, password } = req.body;
    database.users.push(
        {
            id: '125',
            name: uname,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        }
    )
    res.json(database.users[database.users.length-1]);
})

app.post('/signin', (req,res) =>{
    if (req.body.email === database.users[0].email 
    && req.body.password === database.users[0].password ){
        res.json(database.users[0]);
    }else{
        res.status(400).json('error logging in'); 
    }
})

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    const found = false;
    database.users.forEach(user => {
        if(user.id === id){
            return res.json(user);
            found = true;
        }
    })
    if(!found){
        res.status(400).json('user not found');
    }
})

app.put('/image', (req,res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('user not found');
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
}); 