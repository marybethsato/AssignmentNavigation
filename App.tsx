import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import { TransactionEntry } from './src/utils/utility';


// Define the types for navigation params
export type RootStackParamList = {
  Home: undefined; // Home screen does not take any parameters
  AddTransaction: { transaction?: TransactionEntry } | undefined; // Optional parameter for editing a transaction
  Details: { transactionId: string }; // Details screen requires a transaction ID
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'BrokeBuddy' }} // Set the header title
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={({ route }) => ({
            title: route.params?.transaction ? 'Edit Transaction' : 'Add Transaction', // Dynamic header title
          })}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Transaction Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
