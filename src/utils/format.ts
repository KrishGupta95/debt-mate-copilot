export const formatInr = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export const formatDateTime = (value: string) => {
  const date = new Date(value);
  return `${date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })} • ${date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

export const getPaidAmount = (amounts: { amount: number }[]) =>
  amounts.reduce((sum, payment) => sum + payment.amount, 0);
