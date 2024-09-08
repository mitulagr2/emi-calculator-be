import {
  DataTypes,
  Model,
  Sequelize,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export class EMI extends Model<
  InferAttributes<EMI>,
  InferCreationAttributes<EMI>
> {
  declare id: number;
  declare loan_amount: number;
  declare interest_rate: number;
  declare loan_tenure_months: number;
  declare emi: number;
  declare prepayment_amount: CreationOptional<number>;
  declare remaining_balance: number;
}

const init = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  EMI.init(
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      loan_amount: { type: dataTypes.DECIMAL, allowNull: false },
      interest_rate: { type: dataTypes.DECIMAL, allowNull: false },
      loan_tenure_months: { type: dataTypes.INTEGER, allowNull: false },
      emi: { type: dataTypes.DECIMAL, allowNull: false },
      prepayment_amount: { type: dataTypes.DECIMAL, defaultValue: null },
      remaining_balance: { type: dataTypes.DECIMAL, allowNull: false },
    },
    {
      sequelize,
      modelName: "EMI",
      timestamps: true,
    }
  );
  return EMI;
};

export default init;
