import 'react-native-gesture-handler';
import React, {useEffect, Component} from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align} from "../map";
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
// import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import { SearchBar } from 'react-native-elements';



const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};
const P4 = {latitude: 37.564834, longitude: 126.977218};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


class map extends Component{
    
    
    render(){
        // const { search } = this.state;

        return(
            // <SafeAreaView>
            //     
            // </SafeAreaView>
                <HomeScreen/>
                
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
class MapViewScreen extends Component{
    state = {
        search: '',
    };
    updateSearch = (search) => {
        this.setState({ search });
    };
    // constructor(){
    //     useEffect(() => {
    //         requestLocationPermission();
    //     },[]);
    // }
    render(){
        const { search } = this.state;
        return(
            <>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
            />
            <NaverMapView style={{width: '100%', height: '90%'}}
                        showsMyLocationButton={true}
                        center={{...P0, zoom: 5}}
                        //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                        //   onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                        //   onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                        useTextureView>
                <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
                <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
                <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>
                <Marker coordinate={P4} onClick={() => console.warn('onClick! p4')} image={require("./assets/marker.png")} width={48} height={48}/>
                <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
                <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
                <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
                <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/>
            </NaverMapView>
            {/* <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
                <View style={{backgroundColor: 'gray', padding: 4}}>
                    <Text style={{color: 'white'}}>open stack</Text>
                </View>
            </TouchableOpacity> */}
            {/* <Text style={{position: 'absolute', top: '95%', width: '100%', textAlign: 'center'}}>Icon made by Pixel perfect from www.flaticon.com</Text> */}
        </>
        )
    }
    
};

// updateSearch = (search) => {
//     // this.setState({ search });
//     state.search = search;
// };
// state = {
//     search: '',
// };

// const { search } = state;

// const MapViewScreen = ({navigation}) => {
//     useEffect(() => {
//         requestLocationPermission();
//     }, []);
//     // 
    
    
//     return <>
//         <SearchBar
//                 placeholder="Type Here..."
//                 onChangeText={updateSearch}
//                 value={state.search}
//         /> 
//         <NaverMapView style={{width: '100%', height: '90%'}}
//                       showsMyLocationButton={true}
//                       center={{...P0, zoom: 5}}
//                     //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
//                     //   onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
//                     //   onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
//                       useTextureView>
//             <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "test caption", align: Align.Left}}/>
//             <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
//             <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>
//             <Marker coordinate={P4} onClick={() => console.warn('onClick! p4')} image={require("./assets/marker.png")} width={48} height={48}/>
//             <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
//             <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
//             <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
//             <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/>
//         </NaverMapView>
//         {/* <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
//             <View style={{backgroundColor: 'gray', padding: 4}}>
//                 <Text style={{color: 'white'}}>open stack</Text>
//             </View>
//         </TouchableOpacity> */}
//         {/* <Text style={{position: 'absolute', top: '95%', width: '100%', textAlign: 'center'}}>Icon made by Pixel perfect from www.flaticon.com</Text> */}
//     </>
// };

async function requestLocationPermission() {
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
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}


export default map;