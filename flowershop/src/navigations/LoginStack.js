import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import LoginForm from '../screens/Login';
import Singin from '../screens/Singin';

const Stack = createNativeStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Singin" component={Singin} />
    </Stack.Navigator>
  );
}

export default LoginStack