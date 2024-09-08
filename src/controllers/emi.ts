import type { Request, Response } from "express";
import db from "../models/index.ts";
import formatEmi from "../bin/formatEmi.ts";

/** Accepts user inputs and calculates the EMI */
export const calculate = (req: Request, res: Response) => {
  /** Prepayment or extra EMI */
  const prepayment = +req.body.prepayment_amount || 0;
  /** Loan Amount */
  const P = +req.body.loan_amount;
  /** Annual Rate of Interest */
  const R_annual = +req.body.interest_rate;
  /** Loan Tenure (in months) */
  let N = +req.body.loan_tenure_months;

  if (!P || !R_annual || !N) {
    return res
      .status(400)
      .send("Missing loan amount, interest rate, or loan tenure months.");
  }

  /** Monthly Rate of Interest */
  const R = R_annual / 1200;
  /** Equated Monthly Instalment */
  let E = (P * R * (1 + R) ** N) / ((1 + R) ** N - 1);
  // Round off to 2 decimal places
  E = Math.round(E * 100) / 100;

  /** Remaining balance */
  const P_new = P - prepayment;
  // Adjust loan tenure
  N = Math.ceil(Math.log(E / (E - P_new * R)) / Math.log(1 + R));

  // Create and return EMI
  db.sequelize.models.EMI.create({
    loan_amount: P,
    interest_rate: R_annual,
    loan_tenure_months: N,
    emi: E,
    prepayment_amount: prepayment > 0 ? prepayment : null,
    remaining_balance: P_new,
  })
    .then((emi) => {
      res.status(201).send(formatEmi(emi));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

/** Fetches and returns all EMI records from the database */
export const list = (_req: Request, res: Response) => {
  // Get all in descending order of creation
  return db.sequelize.models.EMI.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((emis) => res.status(200).send(emis))
    .catch((error) => {
      res.status(400).send(error);
    });
};

/** Fetches and returns a specific EMI record by its ID, including the month-wise breakdown of payments */
export const getById = (req: Request, res: Response) => {
  // Get by ID
  return db.sequelize.models.EMI.findByPk(req.params.id)
    .then((emi) => {
      if (!emi) {
        return res.status(404).send({
          message: "EMI Not Found",
        });
      }
      return res.status(200).send(formatEmi(emi));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};
