import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/conn';
import { ItemAttributes } from './Item';

export interface CarAttributes {
  id?: string;
  plate: string;
  brand: string;
  model: string;
  km: number;
  year: number;
  dailyPrice: number;
  status: 'ativo' | 'inativo' | 'excluido';
  items?: ItemAttributes[];
  createdAt?: Date;
  deletedAt?: Date | null;
}

export class Car extends Model<CarAttributes> implements CarAttributes {
  public id!: string;
  public plate!: string;
  public brand!: string;
  public model!: string;
  public km!: number;
  public year!: number;
  public dailyPrice!: number;
  public status!: 'ativo' | 'inativo' | 'excluido';
  public createdAt!: Date;
  public items?: ItemAttributes[] | undefined;

  public static initialize() {
    Car.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        plate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        km: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        dailyPrice: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('ativo', 'inativo', 'excluido'),
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
        tableName: 'cars',
        timestamps: false,
      }
    );
  }
}

Car.initialize();
