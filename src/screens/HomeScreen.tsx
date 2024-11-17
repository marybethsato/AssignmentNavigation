import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import { getInitialData, TransactionEntry, TransactionType_bgColor } from '../utils/utility';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [transactions, setTransactions] = useState<TransactionEntry[]>(getInitialData());

  const renderTransaction = ({ item }: { item: TransactionEntry }) => (
    <TouchableOpacity
      style={[styles.transactionItem, { backgroundColor: TransactionType_bgColor[item.type] }]}
      onPress={() => navigation.navigate('Details', { transactionId: item.id })}
    >
      <Text style={styles.transactionTitle}>{item.title}</Text>
      <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No transactions available. Add one using the button below!</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  emptyView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', fontSize: 18, color: '#888' },
  transactionItem: { padding: 16, marginBottom: 10, borderRadius: 8 },
  transactionTitle: { fontSize: 16, fontWeight: 'bold' },
  transactionAmount: { fontSize: 14 },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#6200ee' },
});
