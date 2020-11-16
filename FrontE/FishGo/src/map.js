// import 'react-native-gesture-handler';
import React, {useEffect, useState, Component} from 'react';
import NaverMapView, {Marker, TrackingMode} from "../map";
import {PermissionsAndroid, Platform, View} from "react-native";
import { SearchBar,ButtonGroup} from 'react-native-elements';
import {  observer } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import http from "../utils/http-common";
import http_map from "../utils/http-reverse";
import Geolocation from "react-native-geolocation-service";




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
    }
    searchPoint(name){
        http.get(('/api/spots/'),{params : {keyword : name}})
        .then((data => {
            if(data.data.data !== undefined){
                this.setState({points : data.data.data.spots})
                console.log(this.state.points);
            }
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

    updateZoom = (number) => {
        this.setState({ zoom : number})
    };

    handleBlur(event) {
        let name = ''
        if(this.state.search !== undefined){
            name = this.state.search.replace(/\s+$/g, "");
        }
        this.setState({search : name});
        this.searchUserFish(name);
        this.searchPoint(name);
        this.updateZoom(this.state.zoom+1);
    }
    
    render(){
        const { search } = this.state;
        const buttons = ['물고기', '낚시포인트'];
        const { selectedIndex } = this.state;
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
        const Close = () => {
            return(
                <Ionicons
                    name={'close-outline'}
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
                    cancelIcon={Icons}
                    clearIcon={null}
                    onBlur={this.handleBlur.bind(this)}
                    value={search}
                />
                <MapViewScreen userfishes={this.state.userfishes} points={this.state.points} mode={this.state.mode} zoom={this.state.zoom} updateZoom={this.updateZoom}/>
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

const MapViewScreen = (props) => {
    useEffect(() => {
        requestLocationPermission();
        cameraChange(5,37.53815725,126.9307627);
    }, [props.zoom]);
    //

    const [currentLocation, setCurrentLocation] = useState({latitude: 37.53815725, longitude: 126.9307627});
    const [currentZoom, setCurrentZoom] = useState(props.zoom);
    const [saveZoom, setSaveZoom] = useState(props.zoom);
    const cameraChange = (zoom,lat,lng) => {
        setCurrentLocation({latitude : lat, longitude : lng});
        setCurrentZoom(zoom);
        setSaveZoom(zoom);
    };
    const setZoom = (e) => {
        setSaveZoom(e.zoom);
    }
    return <>
        <NaverMapView style={{width: '100%', height: '80%'}}
                      showsMyLocationButton={true}
                      setLocationTrackingMode={TrackingMode.Follow}
                      center={{...currentLocation, zoom: currentZoom}}
                      onCameraChange={e => setZoom(e)}
                      useTextureView>
            <Markers fishes={props.userfishes} points={props.points} mode={props.mode} zoom={saveZoom} changeZoom={cameraChange}/>
        </NaverMapView>
    </>
};



const Markers = (props) => {
    if(props.fishes !== undefined){
        if(props.mode === 0){
            if(props.fishes.length !== 0){
                return(
                    props.fishes.map((item,idx) =>(
                            <Marker key={idx} coordinate={{latitude:item.lat,longitude:item.lng}} 
                            onClick={() => {
                                if(props.zoom >= 15){
                                    http_map.get('gc', { params : {
                                        coords : `${item.lng},${item.lat}`,
                                        output : 'json',
                                        orders : 'legalcode'
                                    }})
                                    .then((data) => {
                                        alert(data.data.results[0].region.area1.name+" "+data.data.results[0].region.area2.name+" "+data.data.results[0].region.area3.name+" "+data.data.results[0].region.area4.name)
                                    }).catch((err) => console.log(err.message))
                                }else{
                                    props.changeZoom(15,item.lat,item.lng)
                                }
                            }}
                            image={require("./assets/fish2.png")} width={48*props.zoom*0.1} height={48*props.zoom*0.15} />
                    ))
                )
            }else{
                return(
                    <View></View>
                ) 
            }
        }else if(props.mode === 1){
            if(props.points !== undefined){
                return(
                    props.points.map((item,idx) =>(
                            <Marker key={idx} coordinate={{latitude:item.lat,longitude:item.lng}} 
                            onClick={() => {
                                if(props.zoom >= 15){
                                    http_map.get('gc', { params : {
                                        // request : 'coordsToaddr',
                                        coords : `${item.lng},${item.lat}`,
                                        output : 'json',
                                        orders : 'legalcode'
                                    }})
                                    .then((data) => {
                                        alert(data.data.results[0].region.area1.name+" "+data.data.results[0].region.area2.name+" "+data.data.results[0].region.area3.name+" "+data.data.results[0].region.area4.name)
                                    }).catch((err) => console.log(err.message))
                                }else{
                                    props.changeZoom(15,item.lat,item.lng)
                                }
                            }}
                            image={require("./assets/fish2.png")} width={48*props.zoom*0.1} height={48*props.zoom*0.15} />
                    ))
                )
            }else{
                return(
                    <View></View>
                )
            }
        }
    }else
    {
        return(
            <View></View>
        )
    }
};
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
            // console.log('You can use the location');
            Geolocation.getCurrentPosition(
                (position) => {
                //   console.log(position);
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
        // console.warn(err);
    }
}


export default map;