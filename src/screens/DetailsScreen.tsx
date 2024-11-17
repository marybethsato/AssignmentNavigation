import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { getTransactionByID, TransactionEntry, TransactionType } from '../utils/utility';

type Props = StackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { transactionId } = route.params;
  const transaction: TransactionEntry | undefined = getTransactionByID(transactionId);

  if (!transaction) {
    return <Text style={styles.errorText}>Transaction not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text>Description: {transaction.desc}</Text>
        <Text>Amount: ${transaction.amount.toFixed(2)}</Text>
        <Text>Type: {TransactionType[transaction.type]}</Text>
      </View>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('AddTransaction', { transaction })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  errorText: { textAlign: 'center', marginTop: 20, color: 'red' },
});
