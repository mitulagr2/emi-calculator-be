import type { EMIResponse, MonthlyPayment } from "../types/types.ts";
import type { EMI } from "../models/emi.ts";
import type { Model } from "sequelize";
import IPMT from "./IPMT.ts";

/** Takes a database EMI object and returns formatted response */
const formatEmi = (emi_data: Model) => {
  const emi = emi_data as EMI;
  /** Formatted EMI Response */
  const resp: EMIResponse = {
    loanAmount: emi.loan_amount,
    interestRate: emi.interest_rate,
    loanTenureMonths: emi.loan_tenure_months,
    emi: emi.emi,
    prepayment: emi.prepayment_amount || 0,
    monthWisePayments: [],
  };

  const R_monthly = resp.interestRate / 1200;

  // Month-wise breakdown
  for (let n = 1; n <= resp.loanTenureMonths; ++n) {
    const prevBal =
      n === 1
        ? resp.loanAmount - resp.prepayment
        : resp.monthWisePayments[n - 2].remainingBalance;

    const prepayment = n === 1 ? resp.prepayment : 0;
    const interestPaid = IPMT(resp.loanAmount, resp.emi, R_monthly, n);
    const emiPaid = resp.emi;
    const principalPaid = Math.round((emiPaid - interestPaid) * 100) / 100;
    const remainingBalance = Math.round((prevBal - principalPaid) * 100) / 100;

    const curMonth: MonthlyPayment = {
      interestPaid,
      principalPaid,
      emiPaid,
      month: n,
      prepayment,
      remainingBalance,
    };

    resp.monthWisePayments.push(curMonth);
  }

  return resp;
};

export default formatEmi;
