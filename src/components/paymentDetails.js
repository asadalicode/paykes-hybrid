import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import FastImage from "react-native-fast-image";
import { Divider } from "react-native-paper";
import CustomButton from "../shared/components/customButton";
import CustomText from "../shared/components/customText";
import GlobalStyles from "../shared/styles/globalStyles";
import PaymentConfirmModal from "./paymentConfirmModal";

const PaymentDetails = ({ recipient, totalSent, kshValue, kesAmount, cardDetails, handleConfirmPayment, navigation ,isLoading}) => {
    const [isShowPaymentMethod , setIsShowPaymentMethod]= useState(false);
    
    return (
        <View style={{ padding: 15 }}>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText style={styles.title}>Recipient</CustomText>
                    <View>
                        <CustomText style={{ fontWeight: 'bold', fontSize: 16 }}>{recipient?.fullName}</CustomText>
                        <CustomText style={{ fontSize: 12 }}>{`${recipient.phoneNumberCountryCode}${recipient.phoneNumber}`} m-pesa</CustomText>
                    </View>
                </View>
                <FastImage
                    source={require('../assets/images/keyniya.png')}
                    style={[{ height: 25, width: 25 }]}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>

            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText style={styles.title}>Total Sent</CustomText>
                    <View>
                        <CustomText style={styles.subTitle}>{totalSent} USD</CustomText>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText style={styles.title}>Exchange Rate</CustomText>
                    <View>
                        <CustomText style={styles.subTitle}>1 USD = {kshValue} Ksh</CustomText>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText style={styles.title}>Fees </CustomText>
                    <View>
                        <CustomText style={styles.subTitle}>0.00 USD</CustomText>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText style={styles.title}>Total to Pay</CustomText>
                    <View>
                        <CustomText style={styles.subTitle}>{totalSent} USD</CustomText>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText style={styles.title}>Pay with</CustomText>
                    <View>
                        <CustomText style={styles.subTitle}> **** {cardDetails.last4}</CustomText>
                    </View>
                </View>
            </View>
            {/* <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText style={styles.title}>Date Funds Available</CustomText>
                    <View>
                        <CustomText style={styles.subTitle}> . . .3678</CustomText>
                    </View>
                </View>
            </View> */}
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText style={styles.title}>Total to Recipient</CustomText>
                    <View>
                        <CustomText style={styles.subTitle}> {kesAmount} Ksh</CustomText>
                    </View>
                </View>
            </View>
            <View style={[styles.textContainer, GlobalStyles.mt2]}>
                <CustomText style={[styles.infoText]}>
                    Please be sure you know your recipient. Fraudulent transections may result in the loss of your money
                </CustomText>
            </View>
            <CustomButton
                Title={"Confirm transfer"}
                style={GlobalStyles.mt2}
                onPress={()=>setIsShowPaymentMethod(true)}
            />

            <PaymentConfirmModal
                navigation={navigation}
                isShowPaymentConfirmModal={isShowPaymentMethod}
                setIsShowPaymentMethod={setIsShowPaymentMethod}
                handleConfirm={handleConfirmPayment}
                isLoading={isLoading}
            />
        </View>
    )
}
export default PaymentDetails;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.4
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        width: 100,
        marginRight: 40
    },
    subTitle: {
        fontSize: 16,
        color: 'black'
    },
    textContainer: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#E6F8FA',
    },
    infoText: {
        fontWeight: '500',
        fontSize: 14,
        textAlign: 'center'
    },
})