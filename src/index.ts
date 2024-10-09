import express from 'express';
import sequelize from './db/conn';
import userRoutes from './routes/userRoutes';
import CustomerRoutes from './customers/routes/CustomerRoutes'
import carRoutes from './cars/routes/carRoutes'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Conectado!');
    
    await sequelize.sync({ force: true });

    app.use('/api/users', userRoutes);
    app.use('/api/customers', CustomerRoutes);
    app.use('/api/cars', carRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MySQL Falhou:', error);
  }
};

startServer();
