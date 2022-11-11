import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import CustomButton from "../shared/components/customButton";
import CustomText from "../shared/components/customText";
import Header from "../shared/components/header";
import TextInputField from "../shared/components/textInputField";
import GlobalStyles from "../shared/styles/globalStyles";
import OverlayLoader from "../components/overlayLoader";
import { postComplainAPICall } from "../shared/services/auth";
import { showToastMessage } from "../shared/js/showToastMessage";

const Help = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [subTopicsOpen, setSubTopicsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [topicsData, setTopicsData] = useState([]);
    const [value, setValue] = useState(null);
    const [subTopicValue, setSubTopicValue] = useState(null);
    const [userData, setUserData] = useState({});
    const [recipientName, setRecipientName] = useState("");
    const [description, setDesription] = useState("");
    const [isRecipientNameInvalid, setIsRecipientNameInvalid] = useState(false);
    const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);
    const [topics, setTopics] = useState([]);
    const [subTopics, setSubTopics] = useState([]);
    const [isSubTopicInvalid, setIsSubTopicInvalid] = useState(false);
    const [isTopicInvalid, setIsTopicInvalid] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    useEffect(() => {
        handleUserData();
        getTopics();
    }, []);


    useEffect(() => {
        if (value) {
            setSubTopicValue(null);
            let _topic = topicsData.find((item) => item.id === value);
            let _subTopics = _topic?.subTopic?.map((item) => {
                return {
                    label: item,
                    value: item
                }
            });
            setSubTopics([..._subTopics]);
        }
    }, [value]);

    const getTopics = () => {
        setIsLoading(true);
        firestore()
            .collection('help')
            .get()
            .then(response => {
                setIsLoading(false);
                let _helps = response._docs;
                if (_helps.length > 0) {

                    let _helpsData = _helps.map(({ _data }) => {
                        return _data;
                    });
                    setTopicsData([..._helpsData])
                    let _topics = _helpsData.map((item) => {
                        return {
                            label: item.topic,
                            value: item.id
                        }

                    })
                    setTopics([..._topics]);

                }
            })
            .catch(error => {
                setIsLoading(false);
                showToastMessage('error', 'top', `${error}`, 3000, 60);
            });
    }

    const handleUserData = async () => {
        let _userData = await AsyncStorage.getItem('userData');
        _userData = JSON.parse(_userData);
        setUserData({ ..._userData });
    }

    const handleBackNavigation = () => {
        navigation.navigate("support")
    }


    const checkName = () => {
        let _error = false;
        if (!(recipientName.trim().length > 0)) {
            _error = true;
        }
        setIsRecipientNameInvalid(_error);
        return !_error;
    };

    const checkDescription = () => {
        let _error = false;
        if (!(description.trim().length > 0)) {
            _error = true;
        }
        setIsDescriptionInvalid(_error);
        return !_error;
    }
    const checkTopic = () => {
        let _error = false;
        if (!(value?.trim().length > 0)) {
            _error = true;
        }
        setIsTopicInvalid(_error);
        return !_error;
    };

    const checkSubTopic = () => {
        let _error = false;
        if (!(subTopicValue?.trim().length > 0)) {
            _error = true;
        }
        setIsSubTopicInvalid(_error);
        return !_error;
    }

    const handleSubmit = async () => {
        let _name = checkName();
        let _description = checkDescription();
        let _topic = checkTopic();
        let _subTopic = checkSubTopic();
        if (!(_name && _description && _topic && _subTopic)) {
            return;
        }
        setIsButtonLoading(true);
        let _data = {
            email: userData?.email,
            name :`${userData?.givenName} ${userData?.familyName}`,
            phoneNumber: userData?.phoneWithCountryCode,
            topic: topicsData.find((item) => item.id === value)?.topic,
            recipient_name: recipientName,
            subTopic: subTopicValue,
            description: description
        }
        let _response = await postComplainAPICall(_data);
        setIsButtonLoading(false);
        if(_response.isSuccess){
            showToastMessage('success', 'top', "Email sent successfully");
            handleBackNavigation();
        }

    }

    return (
        <>
            <Header
                title={"Help"}
                hasBack={true}
                onPress={handleBackNavigation}
            />
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <View style={{ marginVertical: 10 }}>
                    <CustomText style={styles.label1}>{userData?.givenName} {userData?.familyName}</CustomText>
                    <CustomText style={styles.label1}>{userData?.phoneWithCountryCode}</CustomText>
                    <CustomText style={styles.label1}>{userData?.email}</CustomText>
                </View>

                <CustomText style={styles.label}>Topic</CustomText>
                <DropDownPicker
                    style={[styles.dropdown, { borderColor: isTopicInvalid ? 'red' : GlobalStyles.inputBorder }]}
                    open={open}
                    textStyle={GlobalStyles.textColor}
                    containerStyle={[{ zIndex: 999 ,color:'red' }]}
                    value={value}
                    items={topics}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setTopics}
                />
                <CustomText style={styles.label}>Sub topic</CustomText>
                <DropDownPicker
                    style={[styles.dropdown , { borderColor: isSubTopicInvalid ? 'red' : GlobalStyles.inputBorder }]}
                    open={subTopicsOpen}
                    containerStyle={[{ zIndex: 99 }]}
                    value={subTopicValue}
                    items={subTopics}
                    textStyle={GlobalStyles.textColor}
                    setOpen={setSubTopicsOpen}
                    setValue={setSubTopicValue}
                    setItems={setSubTopics}
                />
                <CustomText style={styles.label}>Recipient's name</CustomText>
                <TextInputField
                    placeholder="Ex. John Doe"
                    OnChangeText={value => setRecipientName(value)}
                    IsError={isRecipientNameInvalid}
                />
                <CustomText style={styles.label}>Describe the problem you experienced</CustomText>
                <TextInputField
                    Multiline={true}
                    numberOfLines={5}
                    IsError={isDescriptionInvalid}
                    OnChangeText={value => setDesription(value)}
                />
                <CustomButton
                    Title={"Submit"}
                    IsLoading={isButtonLoading}
                    style={GlobalStyles.mt2}
                    onPress={handleSubmit}
                />
            </ScrollView>
            {
                isLoading && <OverlayLoader />
            }
        </>
    )
}
export default Help;

const styles = StyleSheet.create({
    dropdown: {
        height: 60,
    },
    label: {
        marginTop: 10,
        marginBottom: 3
    },
    label1: {
        marginBottom: 3
    }
})