import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserWishList from '../screens/UserWishList';
import PayInfo from '../screens/PayInfo';
import UserProfile from '../screens/UserProfile';
const Stack = createNativeStackNavigator();

function UserStacks() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
    <Stack.Screen name="UserProfile" component={UserProfile}/>
    <Stack.Screen name="PayInfo" component={PayInfo} />
    <Stack.Screen name="UserWishList" component={UserWishList} />
    </Stack.Navigator>
  );
}

export default UserStacks