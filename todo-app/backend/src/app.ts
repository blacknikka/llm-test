import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // 追加
import todosRoutes from './routes/todos';
import connectDB from './utils/db';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // 追加
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todosRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;