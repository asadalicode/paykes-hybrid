import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import CustomText from "../shared/components/customText";

const OverlayLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="white" size={"large"} />
        </View>
    )
}
export default OverlayLoader;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 9999,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(90, 90, 90,0.8)'
    }
})