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

// @inject('fishStore')
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
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.searchUserFish('')
        // this.searchAddress('')
    }
    // searchAddress(point){
    //     console.log("실행")
    //     http_map.get('gc', { params : {
    //         // request : 'coordsToaddr',
    //         coords : '126.1861667,33.25702778',
    //         output : 'json'
    //     }})
    //     .then((data) => {
    //         console.log(data)
    //     }).catch((err) => console.log(err.message))
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
        // if(selectedIndex === 0){
        //     this.setState({mode : selectedIndex})
        // }else if(selectedIndex === 1){
        //     mode = 1;
        // }
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
                <MapViewScreen userfishes={this.state.userfishes} points={this.state.points} mode={this.state.mode}/>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 55}}
                />
            </View>     
        )
    }
    // <Stack.Navigator>
    //     <Stack.Screen name="home" component={HomeScreen}/>
    //     <Stack.Screen name="stack" component={MapViewScreen}/>
    // </Stack.Navigator>
}
// const map = () => {
//     return <NavigationContainer>
        
//     </NavigationContainer>
// }

const HomeScreen = () =>
    
    <Tab.Navigator>
        <Tab.Screen name={"낚시 포인트"} tabBarOptions={{backgroundColor:'black'}} component={MapViewScreen}/>
        <Tab.Screen name={"물고기"} component={MapViewScreen}/>
    </Tab.Navigator>

const TextScreen = () => {
    return <Text>text</Text>
}


const p = {latitude: 0,longitude:0}

// @inject('fishStore')
// @observer
// class Markers extends Component{
//     check(){
//         console.log("배열확인");
//         console.log(this.props.fishStore.fishRecords);
//     }
//     render(){
//         this.check();
//         return(
//             this.props.fishStore.fishRecords.map((item,idx) =>(
//                 // <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
//                 <Marker coordinate={P1} onClick={() => console.warn(idx)} caption={{text: "hello"}}/>
//             ))
//         )
//     }
// }

// class MapViewScreen extends Component{
//     state = {
//         search: '',
//     };
//     updateSearch = (search) => {
//         this.setState({ search });
//     };
//     render(){
//         const { search } = this.state;
        
//         return(
//             <>
//             <SearchBar
//                 placeholder="Type Here..."
//                 onChangeText={this.updateSearch}
//                 value={search}
//             />
//             <NaverMapView style={{width: '100%', height: '90%'}}
//                         showsMyLocationButton={true}
//                         center={{...P0, zoom: 5}}
//                         //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
//                         //   onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
//                         //   onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
//                         useTextureView>
//                 <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
//                 <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
//                 <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>
//                 <Marker coordinate={P4} onClick={() => console.warn('onClick! p4')} image={require("./assets/marker.png")} width={48} height={48}/>
//                 <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
//                 <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
//                 <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
//                 <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/>
//             </NaverMapView>
//             {/* <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
//                 <View style={{backgroundColor: 'gray', padding: 4}}>
//                     <Text style={{color: 'white'}}>open stack</Text>
//                 </View>
//             </TouchableOpacity> */}
//             {/* <Text style={{position: 'absolute', top: '95%', width: '100%', textAlign: 'center'}}>Icon made by Pixel perfect from www.flaticon.com</Text> */}
//         </>
//         )
//     }
    
// };
let tmp = []
const MapViewScreen = (props) => {
    console.log(props)
    useEffect(() => {
        requestLocationPermission();
    }, []);
    //
    return <>
        <NaverMapView style={{width: '100%', height: '80%'}}
                      showsMyLocationButton={true}
                      setLocationTrackingMode={TrackingMode.Follow}
                      center={{...P0, zoom: 5}}
                    //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                    //   onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                    //   onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                      useTextureView>
                    {/* <Markers fishes={props}/> */}
                    <Markers fishes={props.userfishes} points={props.points} mode={props.mode}/>
            {/* <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
            <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
            <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>*/}
            {/* <Marker coordinate={{latitude: tmp.latitude,longitude: tmp.longitude}} onClick={() => console.warn('onClick! p4')} image={require("./assets/marker.png")} width={48} height={48}/>  */}
        </NaverMapView>
    </>
};



const Markers = (props) => {
    console.log("마커")
    console.log(props)
    if(props.fishes !== undefined){
        if(props.mode === 0){
            return(
                // props.fishes.fishes.map((item,idx) =>(
                props.fishes.map((item,idx) =>(
                        // <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
                        <Marker key={idx} coordinate={{latitude:item.lat,longitude:item.lng}} onClick={() => console.warn(idx)} image={require("./assets/fish2.png")} width={48} height={48} />
                ))
                // <View>
                //     {/* <Text>test</Text> */}
                //  {/* </View> */}
            )
        }else if(props.mode === 1){
            return(
                props.points.map((item,idx) =>(
                        // <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
                        <Marker key={idx} coordinate={{latitude:item.lat,longitude:item.lng}} onClick={() => console.warn(idx)} image={require("./assets/fish2.png")} width={48} height={48} />
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