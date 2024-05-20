import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../theme/theme";

export default ({focused,color,size},route) => {
    
        let iconName ;

        if (route.name === 'Home') {

          iconName = focused ? 'home' : 'home-outline'
                        
        }
        else if (route.name === 'Explore') {

          iconName = focused ? 'compass' : 'compass-outline'
                        
        }  else if (route.name === 'Profile') {

          iconName = focused ? 'person' : 'person-outline'
                        
        } 
        else if (route.name === 'Cart') {

            iconName = focused ? 'cart' : 'cart-outline'
                          
          } 

        return <Icon name={iconName} color={focused ? colors.primary : color} size={24} />

    }