import 'react-native-gesture-handler';
import React, {useEffect, useState, Component} from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align, TrackingMode} from "../map";
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import { SearchBar,ButtonGroup } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { Tooltip } from 'react-native-elements';
import http from "../utils/http-common";
import http_map from "../utils/http-reverse";
import Geolocation from "react-native-geolocation-service";
import { useLinkProps } from '@react-navigation/native';

const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};
const P4 = {latitude: 37.564834, longitude: 126.977218};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// let mode  = 0;


@observer
class map extends Component{
    state = {
        search: '',
        // points : [],
        check: false,
    };
    constructor () {
        super()
        this.state = {
          selectedIndex: 0,
          mode : 0,
          userfishes : [],
          points : [],
          zoom : 5
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.searchUserFish('')
        // this.searchAddress('')
    }
    // searchAddress(point){
    //     console.log("실행")
        // http_map.get('gc', { params : {
        //     // request : 'coordsToaddr',
        //     coords : '126.1861667,33.25702778',
        //     output : 'json'
        // }})
        // .then((data) => {
        //     console.log(data)
        // }).catch((err) => console.log(err.message))
    // }
    searchPoint(name){
        http.get(('/api/spots/'),{params : {keyword : name}})
        .then((data => {
            this.setState({points : data.data.data.spots})
            // console.log(this.state.points);
        }))
    }

    searchUserFish(name){
        http.get(('/api/userfishes/'),{params : {keyword : name}})
        .then((data => {
            this.setState({userfishes : data.data.data.userfishes})
            console.log(this.state.userfishes);
        }))
    }

    updateIndex (selectedIndex) {
        this.setState({mode : selectedIndex})
        this.setState({selectedIndex})
    }

    updateSearch = (search) => {
        this.setState({ search , check: false});
        // alert("test");
    };
    
    handleBlur(event) {
        // alert(this.state.search);
        let name = ''
        if(this.state.search !== undefined){
            name = this.state.search.replace(/\s+$/g, "");
        }
        this.setState({search : name});
        // this.props.fishStore.getUs,erFishesByName(name);
        this.searchUserFish(name)
        this.searchPoint(name)
        
        // console.log(this.state.records);
    }
    changeZoom(number){
        this.setState({zoom : number});
        alert("1")
    }
    render(){
        const { search } = this.state;
        const buttons = ['물고기', '낚시포인트'];
        const { selectedIndex } = this.state;
        const {fishStore} = this.props;
        let iconName = 'search-outline';
        let iconSize = 30;
        const Icons = () => {
            return(
                <Ionicons
                    name={iconName}
                    size= {iconSize}
                />
            )
        }

        return(
            <View>    
                <SearchBar
                    placeholder="물고기 이름을 검색!"
                    onChangeText={this.updateSearch}
                    platform="android"                    
                    searchIcon={Icons}
                    onBlur={this.handleBlur.bind(this)}
                    // onEndEditing={this.handleBlur.bind(this)}
                    value={search}
                />
                {/* <MapViewScreen test={this.state}/> */}
                <MapViewScreen userfishes={this.state.userfishes} points={this.state.points} mode={this.state.mode} zoom={this.state.zoom} changeZoom={this.changeZoom}/>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 55}}
                />
            </View>     
        )
    }
}

const HomeScreen = () =>
    
    <Tab.Navigator>
        <Tab.Screen name={"낚시 포인트"} tabBarOptions={{backgroundColor:'black'}} component={MapViewScreen}/>
        <Tab.Screen name={"물고기"} component={MapViewScreen}/>
    </Tab.Navigator>

const TextScreen = () => {
    return <Text>text</Text>
}


const p = {latitude: 0,longitude:0}
let tmp = []
const MapViewScreen = (props) => {
    useEffect(() => {
        requestLocationPermission();
    }, []);
    //
    return (<>
        <NaverMapView style={{width: '100%', height: '80%'}}
                      showsMyLocationButton={true}
                      setLocationTrackingMode={TrackingMode.Follow}
                      center={{...P0, zoom: props.zoom}}
                    //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                    //   onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                    //   onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                      useTextureView>
                    {/* <Markers fishes={props}/> */}
                    {/* <TouchableOpacity> */}
                        <Markers fishes={props.userfishes} points={props.points} mode={props.mode} changeZoom={props.changeZoom}/>
                    {/* </TouchableOpacity> */}
            {/* <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
            <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
            <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>*/}
            {/* <Marker coordinate={{latitude: tmp.latitude,longitude: tmp.longitude}} onClick={() => console.warn('onClick! p4')} image={require("./assets/marker.png")} width={48} height={48}/>  */}
        </NaverMapView>
    </>)
};



const Markers = (props) => {
    if(props.fishes !== undefined){
        if(props.mode === 0){
            return(
                // props.fishes.fishes.map((item,idx) =>(
                props.fishes.map((item,idx) =>(
                        // <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
                        <Marker key={idx} coordinate={{latitude:item.lat,longitude:item.lng}} 
                        onClick={() => {
                            console.log(`${item.lat},${item.lng}`)
                            http_map.get('gc', { params : {
                                // request : 'coordsToaddr',
                                coords : `${item.lng},${item.lat}`,
                                output : 'json',
                                orders : 'legalcode'
                            }})
                            .then((data) => {
                                console.log(data)
                                alert(data.data.results[0].region.area1.name+" "+data.data.results[0].region.area2.name+" "+data.data.results[0].region.area3.name+" "+data.data.results[0].region.area4.name)
                            }).catch((err) => console.log(err.message))
                        }} 
                        image={require("./assets/fish2.png")} width={48} height={48} />
                        // () => console.warn(idx)
                ))
                // <View>
                //     {/* <Text>test</Text> */}
                //  {/* </View> */}
            )
        }else if(props.mode === 1){
            return(
                props.points.map((item,idx) =>(
                        // <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
                        <Marker key={idx} coordinate={{latitude:item.lat,longitude:item.lng}} 
                        onClick={() => {
                            console.log(`${item.lat},${item.lng}`)
                            http_map.get('gc', { params : {
                                // request : 'coordsToaddr',
                                coords : `${item.lng},${item.lat}`,
                                output : 'json',
                                orders : 'legalcode'
                            }})
                            .then((data) => {
                                console.log(data)
                                alert(data.data.results[0].region.area1.name+" "+data.data.results[0].region.area2.name+" "+data.data.results[0].region.area3.name+" "+data.data.results[0].region.area4.name)
                            }).catch((err) => console.log(err.message))
                        }} 
                        image={require("./assets/fish2.png")} width={48} height={48} />
                ))
                // <View>
                //     {/* <Text>test</Text> */}
                //  {/* </View> */}
            )
        }
    }else
    {
        return(
            <View></View>
        )
    }
};
const location = []
async function requestLocationPermission() {
    // const [location, setLocation] = useState();
    if (Platform.OS !== 'android') return;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'show my location need Location permission',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
            Geolocation.getCurrentPosition(
                (position) => {
                  console.log(position);
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}


export default map;