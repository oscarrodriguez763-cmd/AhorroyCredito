import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth';
import accountRoutes from './routes/accounts';
import loanRoutes from './routes/loans';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/loans', loanRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

export default app;
