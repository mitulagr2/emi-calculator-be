import type { Request, Response } from "express";
import db from "../models/index.ts";

export const calculate = (req: Request, res: Response) => {
  const prepayment = req.body.prepayment_amount || 0;
  const P = req.body.loan_amount;
  const R = req.body.interest_rate;
  let N = req.body.loan_tenure_months;

  if (!P || !R || !N) {
    return res
      .status(400)
      .send("Missing loan amount, interest rate, or loan tenure months.");
  }

  const P_new = P - prepayment;

  const E = ((P_new * R * (1 + R)) ^ N) / ((1 + R) ^ (N - 1));

  N = (Math.log(E) - Math.log(E - P_new * R)) / Math.log(1 + R);

  db.sequelize.models.EMI.create({
    loan_amount: P,
    interest_rate: R,
    loan_tenure_months: N,
    emi: E,
    prepayment_amount: prepayment > 0 ? prepayment : null,
    remaining_balance: P_new,
  })
    .then((emi) => {
      res.status(201).send(emi);
    })
    .catch((error) => res.status(400).send(error));
};

export const list = (_req: Request, res: Response) => {
  return db.sequelize.models.EMI.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((emis) => res.status(200).send(emis))
    .catch((error) => {
      res.status(400).send(error);
    });
};

export const getById = (req: Request, res: Response) => {
  return db.sequelize.models.EMI.findByPk(req.params.id)
    .then((emi) => {
      if (!emi) {
        return res.status(404).send({
          message: "EMI Not Found",
        });
      }
      return res.status(200).send(emi);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};
