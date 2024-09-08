#!/usr/bin/env bash

source .env

if ! command -v curl &> /dev/null
then
    echo "curl could not be found"
    exit 1
fi

declare -A emi0
emi0[loan_amount]="500000"
emi0[interest_rate]="8.5"
emi0[loan_tenure_months]="60"
emi0[prepayment_amount]="0"

declare -A emi1
emi1[loan_amount]="500000"
emi1[interest_rate]="8.5"
emi1[loan_tenure_months]="60"
emi1[prepayment_amount]="20000"

declare -A emi2
emi2[loan_amount]="1000000"
emi2[interest_rate]="6.5"
emi2[loan_tenure_months]="60"
emi2[prepayment_amount]="0"

declare -A emi3
emi3[loan_amount]="5000000"
emi3[interest_rate]="9"
emi3[loan_tenure_months]="240"
emi3[prepayment_amount]="0"

declare -A emi4
emi4[loan_amount]="750000"
emi4[interest_rate]="11"
emi4[loan_tenure_months]="36"
emi4[prepayment_amount]="15000"

declare -n emi
for emi in ${!emi@}; do
    curl -s -o /dev/null -X POST -H "Content-Type: application/json" -d "{\"loan_amount\": \"${emi[loan_amount]}\", \"interest_rate\": \"${emi[interest_rate]}\", \"loan_tenure_months\": \"${emi[loan_tenure_months]}\", \"prepayment_amount\": \"${emi[prepayment_amount]}\"}" http://localhost:${PORT}/api/calculate-emi
done

echo "database populated successfully"
