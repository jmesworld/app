export const convertToEur = (balance: any) => {
  const convertedBalance = (parseInt(balance) * 0.1412840103).toString();
  return convertedBalance;
};
