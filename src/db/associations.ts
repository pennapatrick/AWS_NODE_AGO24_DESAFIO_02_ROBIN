import { Car } from '../models/Cars/Car';
import { Order } from '../models/Orders/Order';
import { Item } from '../models/Cars/Item';
import { Customer } from '../models/Customers/Customer';

export function setupAssociations() {
  Item.belongsTo(Car, {
    foreignKey: 'carId',
    as: 'car',
  });

  Car.hasMany(Item, {
    foreignKey: 'carId',
    as: 'items',
    onDelete: 'CASCADE',
  });

  Order.belongsTo(Car, {
    foreignKey: 'carId',
    as: 'car',
  });

  Car.hasMany(Order, {
    foreignKey: 'carId',
    as: 'orders',
  });

  Order.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer',
  });
}
