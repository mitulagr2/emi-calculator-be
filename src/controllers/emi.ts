import type { Request, Response } from "express";
import db from "../models/index.ts";

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
