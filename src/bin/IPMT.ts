/** Returns Interest Per Month
 * - pv - Present/Principal value
 * - pmt - Payment (Monthly)
 * - rate - Interest rate (Monthly)
 * - per - Months
 */
const IPMT = (pv: number, pmt: number, rate: number, per: number) => {
  const tmp = (1 + rate) ** per;

  const ipmt = 0 - (-pv * tmp * rate + pmt * (tmp - 1));

  return Math.round(ipmt * 100) / 100;
};

export default IPMT;
