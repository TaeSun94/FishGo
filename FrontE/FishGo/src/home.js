/**

 * Sample React Native App
 * https://github.com/facebook/react-native
   *
 * @format
 * @flow
   */
  import React, {Component} from 'react';
  import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Button
  } from 'react-native';
  import ImagePicker from 'react-native-image-picker';
  class HomeScreen extends Component {
    state = {
  avatar: ''
    }
    addImage = () => {
  ImagePicker.showImagePicker({
    title: '',
    takePhotoButtonTitle: '사진 찍기',
    chooseFromLibraryButtonTitle: '사진첩에서 불러오기',
    cancelButtonTitle: '돌아가기'
  }, response=> {
    this.setState({
      avatar: response.uri
    })
    if (response.didCancel) {
      console.log("돌아가기")
    }
      
    else if(response !== null){
      this.props.navigation.navigate('Descrimination',{pic: this.state.avatar})
    }
    else{
      this.props.navigation.navigate('Home');
    }
  })

 }
 render() {
   return (
     <View style={{
       backgroundColor: '#2fa9ff',
       width:'100%',
       height:'100%',
       alignItems: 'center',
       justifyContent: 'center'
     }}>
       <View style={{
         padding:30,
         alignItems: 'center',
         justifyContent: 'center'
       }}>
         <Text style={{
           fontWeight: 'bold',
           fontSize:80,
         }}>Fish~ Go!</Text>
       </View>
       <View style={{
         padding: 10,
         flexDirection: 'row',
         justifyContent: 'space-between'
       }}>
         <TouchableOpacity style={{
           width: 120,
           height: 120,
           borderColor: 'white',
           borderWidth:2,
           marginRight: 50,
           alignItems:'center',
           justifyContent: 'center',
         }}
         onPress={()=>{
           this.props.navigation.navigate('Collection')
         }}
         >
           <Text style={styles.btn}>내 도감 보러가기</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{
           width: 120,
           height: 120,
           borderColor: 'white',
           borderWidth:2,
           alignItems:'center',
           justifyContent: 'center',
         }}
         onPress={()=>this.addImage()}
         >
           <Text style={styles.btn}>물고기 판별</Text>
         </TouchableOpacity>
       </View>
       <View style={{
         padding: 10,
         flexDirection: 'row',
         justifyContent: 'space-between',
       }}>
         <TouchableOpacity style={{
           width: 120,
           height: 120,
           borderColor: 'white',
           borderWidth:2,
           marginRight: 50,
           alignItems:'center',
           justifyContent: 'center',
         }}
         onPress={()=>{
           this.props.navigation.navigate('Map')
         }}>
           <Text style={styles.btn}>지도 검색</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{
           width: 120,
           height: 120,
           borderColor: 'white',
           borderWidth:2,
           alignItems:'center',
           justifyContent: 'center',
         }}>
           <Text style={styles.btn}>물고기 정보 검색</Text>
         </TouchableOpacity>
       </View>
     </View>
   )
 }
}

const styles = StyleSheet.create({
 btn: {
   fontSize: 20,
   fontWeight: 'bold',
   textAlign:'center'
 }
});

export default HomeScreen;