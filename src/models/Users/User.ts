import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/conn';

export interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  deletedAt?: Date | null;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public deletedAt!: Date | null;

  public static initialize() {
    User.init(
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
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
        tableName: 'users',
        timestamps: false,
      }
    );
  }
}

User.initialize();
