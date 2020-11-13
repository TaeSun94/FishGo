/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    SafeAreaView,
    ScrollView
} from 'react-native';
import CollectionDetailListScreen from './collection_detail_list';

class CollectionDetailScreen extends Component {
    render() {
        const { params } = this.props.route;
        return (
            <SafeAreaView>
                <ScrollView horizontal = {true}
                style={{flexWrap: 'wrap'}}>
                    <CollectionDetailListScreen fishes={params.fishes} />
                </ScrollView>
                <Button
                    title="목록으로"
                    onPress={() => {
                        this.props.navigation.navigate('Collection')
                    }}
                />
            </SafeAreaView>
        )

    }
}

// else {
//     return (
//         <SafeAreaView>
//             <View>
//                 <Text>아직 잡지 못하였어요!</Text>
//             </View>
//         </SafeAreaView>
//     )
// }

const styles = StyleSheet.create({
    mainView: {
        // backgroundColor: '#2fa9ff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 20,
    },
    mainContentView: {
        elevation: 8,
        backgroundColor: '#fff',
        flex: 1,
        margin: 20,
        padding: 10,
        width: '90%',
        height: '100%',
        alignItems: 'center',
        borderRadius: 15,
    },
    subcontentView: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    sub2ContentView: {
        padding: 10,
        justifyContent: 'flex-start'
        // justifyContent: 'space-between'
    }
});

export default CollectionDetailScreen;
