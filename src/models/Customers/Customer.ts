import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/conn';

export interface CustomerAttributes {
  id?: string;
  name: string;
  dateOfBirth: Date;
  cpf: string;
  email: string;
  phone: string;
  createdAt?: Date;
  deletedAt?: Date | null;
}

export class Customer
  extends Model<CustomerAttributes>
  implements CustomerAttributes
{
  public id!: string;
  public name!: string;
  public dateOfBirth!: Date;
  public cpf!: string;
  public email!: string;
  public phone!: string;
  public createdAt!: Date;
  public deletedAt!: Date | null;

  public static initialize() {
    Customer.init(
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
        dateOfBirth: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'customers',
        timestamps: false,
      }
    );
  }
}

Customer.initialize();
