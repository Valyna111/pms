import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersList from '../screens/UsersList';
import AddItemsAdmin from '../screens/AddItemsAdm';
import AdminProfilePage from '../screens/AdminProfile'
import AdminFlowerList from '../screens/AdminFlowerList'
import EditItemAdmin from '../screens/EditItemAdmin'

const Stack = createNativeStackNavigator();

function AdminStacks() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <Stack.Screen name="AdminProfile" component={AdminProfilePage} />
      <Stack.Screen name="UsersList" component={UsersList} />
      <Stack.Screen name="AddItemsAdmin" component={AddItemsAdmin} />
      <Stack.Screen name="AdminFlowerList" component={AdminFlowerList} />
      <Stack.Screen name="EditItemAdmin" component={EditItemAdmin} />
    </Stack.Navigator>
  );
}

export default AdminStacks