# REST API for an EMI Calculator with Prepayment Option

The following shows an overview of the endpoints that will be exported:

- GET `api/emis` get all EMIs
![get_emis](https://github.com/mitulagr2/emi-calculator-be/blob/main/public/get_emis.png?raw=true)
- GET `api/emi/:id` get EMI by id
![get_emi_id](https://github.com/mitulagr2/emi-calculator-be/blob/main/public/get_emi_id.png?raw=true)
- POST `api/calculate-emi` calculate and add new EMI
![post_calculate_emi](https://github.com/mitulagr2/emi-calculator-be/blob/main/public/post_calculate_emi.png?raw=true)

## Project structure

```bash
/src
├── bin
│   ├── formatEmi.ts        # Formats EMI record with month-wise breakdown
│   └── IPMT.ts             # Calculates Interest per month
├── config
│   └── config.ts           # Sequelize configuration
├── controllers
│   ├── emi.ts              # EMI controller
│   └── index.ts            # App controller
├── index.ts                # Entry point
├── models
│   ├── emi.ts              # EMI Model
│   └── index.ts            # App database setup
├── routes
│   └── index.ts            # Base router
└── types
    └── types.ts            # App database instance and response types
```

## Getting Started

Follow the steps below to run this project locally. Refer to `.env.example` and add `.env`.

1. Install Bun. Alternatively, you can update `startup.sh` to use the package manager of your choice.
2. Install [Docker](https://www.docker.com/) and Docker Compose.
3. Run `startup.sh`.
4. (Optional) To populate the database during testing, run `populateTestDB.sh`.

## Tech Stack

This project was built using Node v18.12.0 and uses the following technologies:

- [Express](https://expressjs.com/) - Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Language and transpiler
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Sequelize](https://sequelize.org/) - Object relation manager
- [Bun](https://bun.sh/) - Package management
