export type RecordStatus = 'Pending' | 'Paid';

export type Payment = {
  id: string;
  amount: number;
  paidAt: string;
};

export type DebtRecord = {
  id: string;
  name: string;
  amount: number;
  reason: string;
  dateTime: string;
  notes: string;
  payments: Payment[];
  status: RecordStatus;
};

export type ContactSummary = {
  name: string;
  outstanding: number;
  transactions: number;
  lastTransactionDate: string;
};

export type TabKey = 'home' | 'records' | 'contacts' | 'settings';
