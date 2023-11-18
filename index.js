import { PORT, mongoDBURL} from './config.js';
import { Question } from './models/qmodel.js';
import {mongoose} from 'mongoose';
import express, { request }  from 'express';
import QuestionRoutes from './routes/QuestionRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get('/',(request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
})

// app.use((req, res, next) => {
//   res.send('Welcome to Express');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.use('/questions',QuestionRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log("App conected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
          });
    })
    .catch((error) =>{
        console.log(error);
    })
