import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme/theme'
import Icon from "react-native-vector-icons/Ionicons"

const Notifications = ({navigation}) => {
    return (
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
            {/* Toolbar */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Icon suppressHighlighting name="arrow-back" onPress={() => navigation.goBack()} size={24} />
                    <Text style={{ marginLeft:16, fontSize: 24, fontWeight: "bold" }}>Notifications</Text>
                </View>
                <Text onPress={() => alert("Notifications")}>
                    Clear All
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Notifications