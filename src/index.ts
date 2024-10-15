import express from 'express';
import sequelize from './db/conn';
import authRoutes from './routes/auth/auth.routes';
import userRoutes from './routes/users/user.routes';
import customerRoutes from './routes/customers/customer.routes';
import carRoutes from './routes/cars/car.routes';
import orderRoutes from './routes/orders/order.routes';
import { errors } from 'celebrate';
import { setupAssociations } from './db/associations';
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Conectado!');

    await sequelize.sync();
    setupAssociations();
    setupSwagger(app)
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/customers', customerRoutes);
    app.use('/api/v1/cars', carRoutes);
    app.use('/api/v1/orders', orderRoutes);

    app.use(errors());

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MySQL Falhou:', error);
  }
};

startServer();
