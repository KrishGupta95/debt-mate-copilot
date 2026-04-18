import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { BottomNavBar } from './src/components/BottomNavBar';
import { FloatingActionButton } from './src/components/FloatingActionButton';
import { AddRecordModal } from './src/components/modals/AddRecordModal';
import { PaymentModal } from './src/components/modals/PaymentModal';
import { RecordDetailModal } from './src/components/modals/RecordDetailModal';
import { ContactDetailScreen } from './src/screens/ContactDetailScreen';
import { ContactsScreen } from './src/screens/ContactsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { RecordsScreen } from './src/screens/RecordsScreen';
import { colors } from './src/theme';
import { ContactSummary, DebtRecord, RecordStatus, TabKey } from './src/types';
import { getPaidAmount } from './src/utils/format';

const initialRecords: DebtRecord[] = [
  {
    id: 'r1',
    name: 'Aarav Sharma',
    amount: 5200,
    reason: 'Dinner split',
    dateTime: '2026-04-12T20:30:00',
    notes: 'Paid restaurant bill',
    payments: [{ id: 'p1', amount: 1200, paidAt: '2026-04-13T11:00:00' }],
    status: 'Pending',
  },
  {
    id: 'r2',
    name: 'Riya Kapoor',
    amount: 3000,
    reason: 'Cab and fuel',
    dateTime: '2026-04-11T09:15:00',
    notes: 'Weekend trip',
    payments: [{ id: 'p2', amount: 3000, paidAt: '2026-04-12T10:40:00' }],
    status: 'Paid',
  },
  {
    id: 'r3',
    name: 'Kabir Verma',
    amount: 8600,
    reason: 'Rent share',
    dateTime: '2026-04-09T18:45:00',
    notes: 'April rent',
    payments: [{ id: 'p3', amount: 2600, paidAt: '2026-04-10T15:20:00' }],
    status: 'Pending',
  },
  {
    id: 'r4',
    name: 'Aarav Sharma',
    amount: 1800,
    reason: 'Movie tickets',
    dateTime: '2026-04-06T22:00:00',
    notes: 'Two premium seats',
    payments: [],
    status: 'Pending',
  },
];

const getRemaining = (record: DebtRecord) => Math.max(record.amount - getPaidAmount(record.payments), 0);

const getUpdatedStatus = (record: DebtRecord): RecordStatus => (getRemaining(record) === 0 ? 'Paid' : 'Pending');

export default function App() {
  const [records, setRecords] = useState<DebtRecord[]>(initialRecords);
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRecordDetailModal, setShowRecordDetailModal] = useState(false);

  const [recordForPayment, setRecordForPayment] = useState<DebtRecord | null>(null);
  const [recordForDetail, setRecordForDetail] = useState<DebtRecord | null>(null);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | RecordStatus>('All');

  const [paymentAmount, setPaymentAmount] = useState('');
  const [form, setForm] = useState({
    name: '',
    amount: '',
    reason: '',
    dateTime: new Date().toISOString().slice(0, 19),
    notes: '',
  });

  const sortedRecent = useMemo(
    () => [...records].sort((a, b) => +new Date(b.dateTime) - +new Date(a.dateTime)).slice(0, 8),
    [records],
  );

  const totalPending = useMemo(() => records.reduce((sum, record) => sum + getRemaining(record), 0), [records]);

  const contacts: ContactSummary[] = useMemo(() => {
    const grouped = records.reduce<Record<string, ContactSummary>>((acc, record) => {
      const remaining = getRemaining(record);
      const existing = acc[record.name];
      if (!existing) {
        acc[record.name] = {
          name: record.name,
          outstanding: remaining,
          transactions: 1,
        };
      } else {
        existing.outstanding += remaining;
        existing.transactions += 1;
      }
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => b.outstanding - a.outstanding);
  }, [records]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records.filter((record) => {
      const status = getUpdatedStatus(record);
      const matchesFilter = filter === 'All' ? true : status === filter;
      const matchesSearch =
        query.length === 0 ||
        record.name.toLowerCase().includes(query) ||
        record.reason.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [filter, records, search]);

  const contactRecords = useMemo(() => {
    if (!selectedContact) {
      return [];
    }
    return records
      .filter((record) => record.name === selectedContact)
      .sort((a, b) => +new Date(b.dateTime) - +new Date(a.dateTime));
  }, [records, selectedContact]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddRecord = () => {
    const parsedAmount = Number(form.amount);
    if (!form.name.trim() || !form.reason.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid input', 'Please provide name, reason, and a valid amount.');
      return;
    }

    const normalizedDate = form.dateTime.trim() ? form.dateTime.trim() : new Date().toISOString();
    const newRecord: DebtRecord = {
      id: `${Date.now()}`,
      name: form.name.trim(),
      amount: parsedAmount,
      reason: form.reason.trim(),
      dateTime: normalizedDate,
      notes: form.notes.trim(),
      payments: [],
      status: 'Pending',
    };

    setRecords((prev) => [newRecord, ...prev]);
    setShowAddRecordModal(false);
    setForm({
      name: '',
      amount: '',
      reason: '',
      dateTime: new Date().toISOString().slice(0, 19),
      notes: '',
    });
  };

  const openPayment = (record: DebtRecord | null) => {
    if (!record) {
      Alert.alert('No pending records', 'This contact has no pending balance.');
      return;
    }

    setRecordForPayment(record);
    setPaymentAmount('');
    setShowPaymentModal(true);
  };

  const handleAddPayment = () => {
    if (!recordForPayment) {
      return;
    }

    const entered = Number(paymentAmount);
    const remaining = getRemaining(recordForPayment);

    if (!Number.isFinite(entered) || entered <= 0) {
      Alert.alert('Invalid payment', 'Enter a valid payment amount.');
      return;
    }

    const appliedPayment = Math.min(entered, remaining);

    setRecords((prev) =>
      prev.map((record) => {
        if (record.id !== recordForPayment.id) {
          return record;
        }

        const updated: DebtRecord = {
          ...record,
          payments: [
            ...record.payments,
            {
              id: `p-${Date.now()}`,
              amount: appliedPayment,
              paidAt: new Date().toISOString(),
            },
          ],
        };

        return {
          ...updated,
          status: getUpdatedStatus(updated),
        };
      }),
    );

    setShowPaymentModal(false);
    setPaymentAmount('');
  };

  const openRecordDetails = (record: DebtRecord) => {
    setRecordForDetail(record);
    setShowRecordDetailModal(true);
  };

  const currentPaymentRecord = recordForPayment
    ? records.find((record) => record.id === recordForPayment.id) || recordForPayment
    : null;

  const paymentPaid = currentPaymentRecord ? getPaidAmount(currentPaymentRecord.payments) : 0;
  const paymentRemaining = currentPaymentRecord ? getRemaining(currentPaymentRecord) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {selectedContact ? (
          <ContactDetailScreen
            contactName={selectedContact}
            records={contactRecords}
            onBack={() => setSelectedContact(null)}
            onAddPayment={() => {
              const target = contactRecords.find((record) => getRemaining(record) > 0) || null;
              openPayment(target);
            }}
          />
        ) : activeTab === 'home' ? (
          <HomeScreen records={sortedRecent} totalPending={totalPending} />
        ) : activeTab === 'records' ? (
          <RecordsScreen
            records={filteredRecords}
            filter={filter}
            search={search}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
            onOpenDetails={openRecordDetails}
          />
        ) : (
          <ContactsScreen contacts={contacts} onSelectContact={setSelectedContact} />
        )}
      </View>

      {!selectedContact ? (
        <>
          <FloatingActionButton onPress={() => setShowAddRecordModal(true)} />
          <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      ) : null}

      <AddRecordModal
        visible={showAddRecordModal}
        form={form}
        onClose={() => setShowAddRecordModal(false)}
        onChange={handleFormChange}
        onSubmit={handleAddRecord}
      />

      <PaymentModal
        visible={showPaymentModal}
        originalAmount={currentPaymentRecord?.amount ?? 0}
        paidAmount={paymentPaid}
        remaining={paymentRemaining}
        amount={paymentAmount}
        onAmountChange={setPaymentAmount}
        onQuickPick={(value) => setPaymentAmount(String(Math.max(0, Math.floor(value))))}
        onClose={() => setShowPaymentModal(false)}
        onSubmit={handleAddPayment}
      />

      <RecordDetailModal
        visible={showRecordDetailModal}
        record={recordForDetail}
        onClose={() => setShowRecordDetailModal(false)}
      />

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
