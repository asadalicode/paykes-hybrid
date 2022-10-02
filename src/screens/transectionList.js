import React from 'react';
import { ScrollView } from 'react-native'
import TransectionCard from '../components/transectionCard';
import Header from '../shared/components/header';

const TransectionList = ({ navigation, route }) => {

    const { transections, KESAmount } = route.params || {};

    return (
        <>
            <Header title={"Transections"} hasBack onPress={() => { navigation.push("dashboard") }} />
            <ScrollView contentContainerStyle={{marginTop:10,paddingBottom:20}}>
                {transections?.length > 0 && transections?.map(transection => (
                    <TransectionCard key={Math.random()} transection={transection} kesAmount={KESAmount} />
                ))}
            </ScrollView>
        </>
    )
}
export default TransectionList;