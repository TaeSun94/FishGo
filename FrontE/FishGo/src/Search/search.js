/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
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
import { SearchBar } from 'react-native-elements';
import SearchDetailScreen from './search_detail';

@inject('fishStore')
@observer
class SearchScreen extends Component {
    state = {
        keyword: '',
        fishes: [],
        check: false,
        fish: null
    }

    updateTxt = (data) => {
        this.setState({ keyword: data });
        this.setState({ check: false });
        this.setState({fish: null});
    }

    search = () => {
        this.setState({ check: true });
        this.props.fishStore.allFishes.filter(fish => {
            if (this.state.keyword === fish.name) {
                this.setState({ fish: fish })
            }
        })
    }

    render() {
        const { fishStore } = this.props;
        return (
            <SafeAreaView style={styles.mainView}>
                <SearchBar
                    placeholder="검색할 물고기 이름을 넣어주세요"
                    onChangeText={this.updateTxt}
                    value={this.state.keyword}
                    style={{ width: '80%',fontFamily:'Bazzi'}}
                    // onSubmitEditing={this.search}
                    onEndEditing={this.search}
                />
                <ScrollView>
                    <SearchDetailScreen style={styles.scrollView} props={this.state} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainView: { 
        backgroundColor: 'rgba(172,209,233,0.4)', 
        width: '100%', 
        height: '100%' 
    }
});

export default SearchScreen;
