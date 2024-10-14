import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/conn';
import { Car } from '../Cars/Car';
import { Customer } from '../Customers/Customer';

export interface OrderAttributes {
  id?: string;
  customerId: string;
  createdAt?: Date;
  status: 'Aberto' | 'Aprovado' | 'Fechado' | 'Cancelado';
  cep: string | null;
  city: string | null;
  uf: string | null;
  rentalFee?: number;
  totalValue?: number;
  carId: string;
  startDateTime: Date | null;
  endDateTime: Date | null;
  cancellationDate: Date | null;
  closingDate: Date | null;
  fine: number | null;
  customer?: Customer;
  car?: Car;
}

export class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: string;
  public customerId!: string;
  public createdAt!: Date;
  public status!: 'Aberto' | 'Aprovado' | 'Fechado' | 'Cancelado';
  public cep!: string | null;
  public city!: string | null;
  public uf!: string | null;
  public rentalFee!: number;
  public totalValue!: number;
  public carId!: string;
  public startDateTime!: Date | null;
  public endDateTime!: Date | null;
  public cancellationDate!: Date | null;
  public closingDate!: Date | null;
  public fine!: number | null;
  public customer?: Customer;
  public car?: Car;

  public static initialize() {
    Order.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        customerId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Customer,
            key: 'id',
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('Aberto', 'Aprovado', 'Fechado', 'Cancelado'),
          allowNull: false,
        },
        cep: {
          type: DataTypes.STRING,
          defaultValue: null,
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING,
          defaultValue: null,
          allowNull: true,
        },
        uf: {
          type: DataTypes.STRING,
          defaultValue: null,
          allowNull: true,
        },
        rentalFee: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
          allowNull: false,
        },
        totalValue: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
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
        startDateTime: {
          type: DataTypes.DATE,
          defaultValue: null,
          allowNull: true,
        },
        endDateTime: {
          type: DataTypes.DATE,
          defaultValue: null,
          allowNull: true,
        },
        cancellationDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        closingDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        fine: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'orders',
        timestamps: false,
      }
    );
  }
}

Order.initialize();
