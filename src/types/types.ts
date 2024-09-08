import type { Dialect, Model, Sequelize } from "sequelize";

export interface DBCredential {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

export interface Database {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [x: string]: Model | Sequelize | typeof Sequelize;
}

export interface MonthlyPayment {
  month: number;
  emiPaid: number;
  interestPaid: number;
  principalPaid: number;
  prepayment: number;
  remainingBalance: number;
}

export interface EMIResponse {
  loanAmount: number;
  interestRate: number;
  loanTenureMonths: number;
  emi: number;
  prepayment: number;
  monthWisePayments: MonthlyPayment[];
}
