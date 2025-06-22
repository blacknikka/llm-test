// filepath: /home/yasu/work/adr/llm-test/todo-app/backend/src/utils/db.ts
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Only exit process if not in test environment
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};

export default connectDB;