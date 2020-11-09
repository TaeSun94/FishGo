/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { inject, observer } from 'mobx-react';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import SearchDetailScreen from './search_detail';

@inject('fishStore')
@observer
class SearchScreen extends Component {
    state = {
        keyword: '',
        fish:{},
        fishes: [],
        check: false
    }
    
    
    updateTxt = (data) => {
        this.setState({ keyword: data});
        this.setState({check:false});
    }
    
    search = () => {
        this.props.fishStore.allFishes.filter(fish =>{
            if( this.state.keyword === fish.name){
                this.setState({check:true});
                this.setState({fish: fish})
            }
        })
    }

    render() {
        const { fishStore } = this.props;
        return (
            <SafeAreaView>
                <View>
                    <SearchBar
                        placeholder="검색할 물고기 이름을 넣어주세요"
                        onChangeText={this.updateTxt}
                        value={this.state.keyword}
                        style={{ width: '80%' }}
                        // onSubmitEditing={this.search}
                        onEndEditing={this.search}
                    />
                </View>
                <ScrollView>
                    <SearchDetailScreen props={this.state}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

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

export default SearchScreen;
