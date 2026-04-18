import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ContactCard } from '../components/ContactCard';
import { TopAppBar } from '../components/TopAppBar';
import { colors, spacing } from '../theme';
import { ContactSummary } from '../types';

type ContactsScreenProps = {
  contacts: ContactSummary[];
  onSelectContact: (name: string) => void;
};

export const ContactsScreen = ({ contacts, onSelectContact }: ContactsScreenProps) => (
  <FlatList
    data={contacts}
    keyExtractor={(item) => item.name}
    renderItem={({ item }) => <ContactCard item={item} onPress={() => onSelectContact(item.name)} />}
    ListHeaderComponent={
      <View>
        <TopAppBar title="Contacts" greeting="People with active balances" />
      </View>
    }
    ListEmptyComponent={<Text style={styles.empty}>No contacts yet</Text>}
    contentContainerStyle={styles.contentContainer}
    showsVerticalScrollIndicator={false}
  />
);

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    paddingBottom: 140,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  empty: {
    color: colors.textSecondary,
    marginTop: 36,
    textAlign: 'center',
  },
});
