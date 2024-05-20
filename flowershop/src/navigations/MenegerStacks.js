import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductList from '../screens/ProductList';
import Sales from '../screens/Sales';
import ManagerProfilePage from '../screens/MenegerProfile';

const Stack = createNativeStackNavigator();

function MenegerStacks() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
    <Stack.Screen name="ManagerProfilePage" component={ManagerProfilePage} />
    <Stack.Screen name="ProductList" component={ProductList} />
    <Stack.Screen name="Sales" component={Sales} />
    </Stack.Navigator>
  );
}

export default MenegerStacks