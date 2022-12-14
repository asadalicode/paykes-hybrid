import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base64 } from "js-base64";
import React, { useState } from "react";
import { Modal, StyleSheet, Pressable, View, Image } from "react-native";
import CustomButton from "../shared/components/customButton";
import CustomText from "../shared/components/customText";
import TextInputField from "../shared/components/textInputField";
import { showToastMessage } from "../shared/js/showToastMessage";
import GlobalStyles from "../shared/styles/globalStyles";

const PaymentConfirmModal = ({ isShowPaymentConfirmModal, setIsShowPaymentMethod, navigation, isLoading, handleConfirm }) => {


    const [password, setPassword] = useState('');

    const handleFogotPassword = () => {
        navigation.push('forgotPassword');
    };
    const encryptPassword = (password) => {
        return Base64.encode(password);
    }
    const handleConfirmPayment = async () => {
        let _userData = await AsyncStorage.getItem('userData');
        _userData = JSON.parse(_userData);
        if (_userData.password !== encryptPassword(password)) {
            showToastMessage(
                'error',
                'top',
                `Invalid password`,
                3000,
                60,
            );
            return;
        } else {
            handleConfirm();
        }
    }


    return (
        <View style={styles.centeredView}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowPaymentConfirmModal}
                onRequestClose={() =>
                    setIsShowPaymentMethod(false)
                }
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <View style={{position:'absolute',right:20,top:20}}>
                            <Pressable onPress={() => setIsShowPaymentMethod(false)}>
                                <Image
                                    source={require('../assets/images/cross.png')}
                                    style={{ height: 15, width: 15 }}
                                />
                            </Pressable>
                        </View>
                        <CustomText style={styles.title}>
                            Enter your password
                        </CustomText>
                        <CustomText style={{ textAlign: 'center', marginTop: 15 }}>
                            For security reasons, your password is required to complete this transection.
                        </CustomText>

                        <TextInputField
                            style={{ width: '95%', marginTop: 15 }}
                            Label={"Enter password"}
                            SecureTextEntry={true}
                            OnChangeText={(value) => {
                                setPassword(value);
                            }}
                        />
                        <View style={{ alignSelf: 'flex-start' }}>

                            <Pressable onPress={handleFogotPassword}>
                                <CustomText style={[styles.signup, GlobalStyles.mt2]}>
                                    Forgot password?
                                </CustomText>
                            </Pressable>
                        </View>
                        <CustomButton
                            onPress={handleConfirmPayment}
                            IsLoading={isLoading}
                            style={[GlobalStyles.mt3, { width: '100%' }]}
                            Title={"Confirm transfer"} />
                    </View>
                </View>
            </Modal>

        </View >
    );
}
export default PaymentConfirmModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    signup: {
        color: GlobalStyles.priColor,
        marginLeft: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        width: '90%',
        position:'relative',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})