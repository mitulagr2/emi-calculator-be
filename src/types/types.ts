import type { Dialect, Model, Sequelize } from "sequelize";

/** Sequelize configuration */
export interface DBCredential {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

/** typeof app database instance */
export interface Database {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [x: string]: Model | Sequelize | typeof Sequelize;
}

/** Formatted monthly breakdown response */
export interface MonthlyPayment {
  month: number;
  emiPaid: number;
  interestPaid: number;
  principalPaid: number;
  prepayment: number;
  remainingBalance: number;
}

/** Formatted EMI response */
export interface EMIResponse {
  loanAmount: number;
  interestRate: number;
  loanTenureMonths: number;
  emi: number;
  prepayment: number;
  monthWisePayments: MonthlyPayment[];
}
