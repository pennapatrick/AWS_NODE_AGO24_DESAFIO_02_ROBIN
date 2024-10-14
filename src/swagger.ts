import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API for chalange backend of compass.',
      version: '1.0.0',
      description:
        'API to create, read, update and delete users, customers, cars and orders.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: [
    './src/routes/cars/car.routes.ts',
    './src/routes/customers/customer.routes.ts',
    './src/routes/users/user.routes.ts',
    './src/routes/auth/auth.routes.ts',
    './src/routes/orders/order.routes.ts',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
