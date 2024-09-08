import {
  DataTypes,
  Model,
  Sequelize,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

/** Database EMI Table representation
 * - id (primary key, auto-increment)
 * - loan_amount (decimal)
 * - interest_rate (decimal)
 * - loan_tenure_months (integer)
 * - emi (decimal)
 * - prepayment_amount (decimal, default null) - stores any extra payments made during the loan.
 * - remaining_balance (decimal) - updates based on monthly payments and prepayments.
 */
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

// Initialize EMI Table
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
      // append createdAt and updatedAt fields
      timestamps: true,
    }
  );
  return EMI;
};

export default init;
