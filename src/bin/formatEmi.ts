import type { EMIResponse, MonthlyPayment } from "../types/types.ts";
import type { EMI } from "../models/emi.ts";
import type { Model } from "sequelize";

const formatEmi = (emi_data: Model) => {
  const emi = emi_data as EMI;
  const resp: EMIResponse = {
    loanAmount: emi.loan_amount,
    interestRate: emi.interest_rate,
    loanTenureMonths: emi.loan_tenure_months,
    emi: emi.emi,
    prepayment: emi.prepayment_amount,
    monthWisePayments: [],
  };

  for (let n = 1; n <= resp.loanTenureMonths; ++n) {
    const prevBal =
      n === 1
        ? resp.loanAmount
        : resp.monthWisePayments[n - 1].remainingBalance;

    const prepayment = n === 1 ? resp.prepayment : 0;
    const interestPaid = prevBal * resp.interestRate;
    const principalPaid = resp.emi - interestPaid;

    const curMonth: MonthlyPayment = {
      interestPaid,
      principalPaid,
      emiPaid: resp.emi,
      month: n,
      prepayment,
      remainingBalance: prevBal - principalPaid,
    };

    resp.monthWisePayments.push(curMonth);
  }

  return resp;
};

export default formatEmi;
