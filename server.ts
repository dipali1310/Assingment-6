
import express from 'express';

const app = express();
import router from './routes/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('src/public'));
app.use('/dist/src/public/app.js', express.static('dist/src/public/app.js'));
app.use('/dist/src/public/app.js.map', express.static('dist/src/public/app.js.map'));
app.use('/dist/src/models/user.js', express.static('dist/src/models/user.js'));
app.use('/dist/src/models/user.js.map', express.static('dist/src/models/user.js.map'));
app.use('/dist/src/userservice/Userservice.js', express.static('dist/src/userservice/Userservice.js'));
app.use('/dist/src/userservice/Userservice.js.map', express.static('dist/src/userservice/Userservice.js.map'));
app.use('/dist/src/data/users.json', express.static('dist/src/data/users.json'));

app.use('/api', router);

export const myURL =`http://localhost:2000`;


app.listen(2000, () => {
    console.log(`Listening on port 2000`);
    }
);