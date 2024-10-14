import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/conn';
import { Car } from './Car';

export interface ItemAttributes {
  id?: string;
  name: string;
  carId: string;
}

export class Item extends Model<ItemAttributes> implements ItemAttributes {
  public id!: string;
  public name!: string;
  public carId!: string;

  public static initialize() {
    Item.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        carId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Car,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'items',
        timestamps: false,
      }
    );
  }
}

Item.initialize();
