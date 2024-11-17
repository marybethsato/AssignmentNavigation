import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { RootStackParamList } from '../../App';
import { addEditTransaction, getNewID, TransactionEntry, TransactionType } from '../utils/utility';

type Props = StackScreenProps<RootStackParamList, 'AddTransaction'>;

export default function AddTransactionScreen({ navigation, route }: Props) {
  const [title, setTitle] = useState(route.params?.transaction?.title || '');
  const [description, setDescription] = useState(route.params?.transaction?.desc || '');
  const [amount, setAmount] = useState(route.params?.transaction?.amount?.toString() || '');
  const [type, setType] = useState(route.params?.transaction?.type || TransactionType.Essential);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = () => {
    if (!title || !description || !amount) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const newTransaction: TransactionEntry = {
      id: route.params?.transaction?.id || getNewID(),
      title,
      desc: description,
      amount: parseFloat(amount),
      type,
    };

    addEditTransaction(newTransaction);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <DropDownPicker
        open={dropdownOpen}
        value={type}
        items={[
          { label: 'Essential', value: TransactionType.Essential },
          { label: 'Leisure', value: TransactionType.Leisure },
          { label: 'Others', value: TransactionType.Others },
        ]}
        setOpen={setDropdownOpen}
        setValue={setType}
        style={styles.dropdown}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 4 },
  dropdown: { marginBottom: 10 },
});
