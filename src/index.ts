import express from 'express';
import sequelize from './db/conn';
import authRoutes from './routes/auth/auth.routes'
import userRoutes from './routes/users/user.routes';
import CustomerRoutes from './routes/customers/customer.routes'
import carRoutes from './routes/cars/car.routes';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Conectado!');

    await sequelize.sync();

    app.use('/api/users', userRoutes);
    app.use('/api/auth', authRoutes)
    app.use('/api/customers', CustomerRoutes);
    app.use('/api/cars', carRoutes);

    app.use(errors());

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MySQL Falhou:', error);
  }
};

startServer();
