import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button,Image,TextInput,FlatList,SafeAreaView, InteractionManager } from 'react-native';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const FIREBASE_API_ENDPOINT = 'https://virtual-bookstore-35845-default-rtdb.firebaseio.com/';
var array2 = []

var username_Admin = 'Moonis07'
var pass_Admin = 'pro123'

function Buttons(props){
  const color = props.color

  return(
      <TouchableOpacity
        style={{
          backgroundColor: props.color,
          width: '85%',
          height: '10%',
          borderRadius: 50,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        disabled = {props.disabled}
        activeOpacity={0.8}
        onPress={props.event}>
        <Text style={{ fontSize: 24, color: 'white', alignSelf: 'center'}}>
          {props.text}
        </Text>
      </TouchableOpacity>
  );
}


function Images(props){
  
  return(
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.event}>
        <Text>
        <Image style={{width:120, height:180, }} source={props.image} />
        </Text>
      </TouchableOpacity>
  );
}


function AdminLogin({showLogin, hidelogin}) {

  const [getAdminU, setAdminU] = React.useState('');
  const [getAdminP, setAdminP] = React.useState('');

  const verify = () =>{

    if ((getAdminP == pass_Admin) && (getAdminU == username_Admin)){
      
      hidelogin(false)
    }
    else{
      alert('Wrong Credentials')
    }
  }

  return(
    <View style={styles.container}>
      <View>
      <Image style={{marginLeft:'35%', marginRight:'50%', width:100, height:100, marginTop:'10%'}} source={require('./assets/logo.png')} />
        <Text style={{fontSize: 40, marginLeft:'5%', color:'white', fontWeight:'bold', marginTop: '7%'}}> Login! </Text>

        <Text style={{ marginLeft:'7%', color:'white', marginTop: '7%', marginBottom:'2%'}}> Username: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue", color:'white', height: '10%', width: '85%', fontSize: 20, borderRadius:50}}  
                    onChangeText={setAdminU}/>

        <Text style={{  marginLeft:'7%', color:'white', marginTop: '7%', marginBottom:'2%'}}> Password: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue", color:'white', height: '10%', width: '85%', fontSize: 20, borderRadius:50, marginBottom: '10%'}}  
                    secureTextEntry={true}
                    onChangeText={setAdminP}/>

        <Buttons text = 'Let me in'  color = {'#ff9d32'} event= {()=> verify() }/>
      </View>
    </View>
  )
  }

function BookManagement({navigation}) {

  return(

    <View style={{flex:1, backgroundColor: 'white'}}>
      <Image style={{marginLeft:'35%', marginRight:'50%', width:100, height:100, marginTop:'10%', marginBottom:'10%'}} source={require('./assets/logo.png')} />
      
          <Buttons text = 'Add Books'  color = {'#373a96'} event = {() => navigation.navigate('Add Books')}/>
          <Text> </Text>
          <Buttons text = 'View Books'  color = {'#373a96'} event = {() => navigation.navigate('View Books')}/>
          <Text> </Text>
          <Buttons text = 'Edit Books'  color = {'#373a96'} event = {() => navigation.navigate('View Books')}/>
          <Text> </Text>
          <Buttons text = 'Delete Books'  color = {'#373a96'} event = {() => navigation.navigate('View Books')}/>
    </View>
  )

}

function AddBooks({navigation}) {

  const [getName, setName] = React.useState('');
  const [getAuthor, setAuthor] = React.useState('');
  const [getDesc, setDesc] = React.useState('');
  const [getPrice, setPrice] = React.useState('');
  const [getImage, setImage] = React.useState('');

  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        bookname: getName,
        authorname: getAuthor,
        Description: getDesc,
        Price: getPrice,
        picture: getImage
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/books.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

      navigation.navigate('Home')
  };

  return(
    <View style={{flex:1, backgroundColor: 'white'}}>
      
      <Text style={{ marginLeft:'7%', marginTop: '5%', marginBottom:'2%'}}> Book Price (Rupees)</Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setPrice}
                    keyboardType = {'numeric'}/>
        
        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Image URL</Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setImage}/>

        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Book Name: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setName}/>

        <Text style={{ marginLeft:'7%',  marginBottom:'2%'}}> Author Name: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setAuthor}/>

        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Book Description: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '24%', width: '85%', fontSize: 20, borderRadius:25, marginBottom:'3%'}}
                    onChangeText={setDesc}/>
        
          <Buttons text='Add Book' color='#373a96'  event={() => postData()}
          />
          <Text> </Text>

    </View>
  )
}

function EditBooks({route,navigation}) {

  const { itemId,bName,bAuthor,bPrice,bDesc } = route.params;

  const [getName, setName] = React.useState(bName);
  const [getAuthor, setAuthor] = React.useState(bAuthor);
  const [getDesc, setDesc] = React.useState(bDesc);
  const [getPrice, setPrice] = React.useState(bPrice);
  const [getImage, setImage] = React.useState('');

  const editData = () => {

  const id = array2[itemId];
    var requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        bookname: getName,
        authorname: getAuthor,
        Description: getDesc,
        Price: getPrice,
        picture: getImage
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/books/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

      navigation.navigate('Home')

  }


  return(

    <View style={{flex:1, backgroundColor: 'white'}}>
      
      <Text style={{ marginLeft:'7%', marginTop: '5%', marginBottom:'2%'}}> Book Price (Rupees)</Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    keyboardType = 'numeric'
                    value={getPrice}
                    onChangeText={(getPrice)=>setPrice(getPrice)}
                    />

        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Book Name: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    value={getName}
                    onChangeText={(getName)=>setName(getName)}
                    />
        
        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Image URL: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    value={getImage}
                    onChangeText={(getImage)=>setImage(getImage)}
                    />

        <Text style={{ marginLeft:'7%',  marginBottom:'2%'}}> Author Name: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    value={getAuthor}
                    onChangeText={(getAuthor)=>setAuthor(getAuthor)}
                    />

        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Book Description: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '25%', width: '85%', fontSize: 20, borderRadius:25, marginBottom:'3%'}}
                    value={getDesc}
                    onChangeText={(getDesc)=>setDesc(getDesc)}
                    />
        <Buttons text='Edit Book' color='#373a96'  event={() => editData()}
          />
          <Text> </Text>

    </View>
  )
}

function DeleteBooks({route,navigation}) {

  const { itemId } = route.params;

  const deleteData = () => {
    const id = array2[itemId]
    var requestOptions = {
    method: 'DELETE',
    };

    fetch(`${FIREBASE_API_ENDPOINT}/books/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log('Delete Response:', result))
      .catch((error) => console.log('error', error));
  };

  return(
    <View style={{flex:1, backgroundColor: 'white'}}>
      <Text style = {{fontSize: 30, marginLeft:'3%',marginBottom:'5%',marginTop:'7%'}}>Are you sure?</Text>
        <Buttons text='YES' color='#373a96'  event={() => deleteData()}
          />
          <Text> </Text>
        <Buttons text='NO' color='#373a96'  event={() => navigation.navigate('View Books')}
          />
    </View>
  )
}

function ViewBooks({navigation}) {

  const [getName, setName] = useState([])
  const [getAuthor, setAuthor] = useState([])
  const [getDesc, setDesc] = useState([])
  const [getPrice, setPrice] = useState([]);
  const [getImage, setImage] = useState([]);

  const [getKeys, setKeys] = useState([]);

  React.useEffect(()=>{Display()},[])
 

  const Display = async () =>{

    const response = await fetch(`${FIREBASE_API_ENDPOINT}/books.json`);
    const data2 = await response.json();
    const array = Object.values(data2)
    array2 = Object.keys(data2)

    const map = array.map((ele)=>{

      setName((getName)=>[...getName, ele.bookname])
      setAuthor((getAuthor)=>[...getAuthor, ele.authorname])
      setDesc((getDesc)=>[...getDesc, ele.Description])
      setPrice((getPrice)=>[...getPrice, ele.Price])
      setImage((getImage)=>[...getImage, ele.picture])
  })
  }
  if(getName){
  
    return(
    
     <View style={{flex:1, backgroundColor: 'white'}}>
        <FlatList
          data={getName}
          renderItem={(item,index)=> {
            return (
                <View style={{flexDirection: 'row', marginBottom:'10%', marginLeft: '5%',marginTop:'5%'}}>
                  <Image style={{ width:120, height:180}} source={{uri: getImage[item.index]}} />
                  <View style={{marginLeft:'5%'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold',marginBottom:'2%'}}>{getName[item.index]}</Text>
                    <Text style={{fontSize: 12, color:'grey', fontWeight: 'bold',marginBottom:'2%'}}> By:  {getAuthor[item.index]}</Text>
                    <Text style={{fontSize:35, fontWeight:'bold'}}> Rs.  {getPrice[item.index]}</Text>
                                      
                    <TouchableOpacity
                    style={{ backgroundColor: '#373a96',
                    width:150,
                    height:40,
                    borderRadius: 10,
                    justifyContent: 'center',
                    marginBottom:'2%'}}
                      onPress={() => navigation.navigate('Edit Books',{ itemId: getName.indexOf(getName[item.index]),bName: getName[item.index],bAuthor: getAuthor[item.index],
                        bPrice: getPrice[item.index], bDesc: getDesc[item.index]})}>
                    <Text style={{ fontSize: 20, color:'white' ,alignSelf: 'center'}}> Edit Book </Text>
                  </TouchableOpacity>

                     <TouchableOpacity
                    style={{ backgroundColor: '#373a96',
                    width: 150,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: 'center',}}
                      onPress={() => navigation.navigate('Delete Books',{ itemId: getName.indexOf(getName[item.index]) })}>
                    <Text style={{ fontSize: 20, color:'white' ,alignSelf: 'center'}}> Delete Book</Text>
                  </TouchableOpacity>
                    
                  </View>
                </View>
            )
          }}
          keyExtractor={(item,index)=>{index.toString()}}
        />
      </View>
    )

  }
  else{
    return(
      <View>
      </View>
    )
  }
}

function Logout() {

  return(
    <View>
    </View>
  )

}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator style={styles.container} >
      <Drawer.Screen name="Home" component={BookManagement} options={({navigation}) =>({ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20}, headerRight: () => (<Button title = 'Logout' color = {'#e39ff6'} onPress={() => Logout()} />) })} />
      <Drawer.Screen name="Add Books" component={AddBooks} options={{ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20} }} />
      <Drawer.Screen name="View Books" component={ViewBooks} options={{ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20} }} />
      <Drawer.Screen name="Edit Books" component={EditBooks} options={{ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20}, drawerItemStyle:{height: 0} }} />
      <Drawer.Screen name="Delete Books" component={DeleteBooks} options={{ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20}, drawerItemStyle:{height: 0} }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [showLogin, hideLogin] = useState(true)
  if (showLogin == true){
    return(
      <NavigationContainer>
      < AdminLogin showLogin={showLogin} hidelogin={hideLogin} />
      </NavigationContainer>
    )
  }
  else{
    return (
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373a96',
  },
});