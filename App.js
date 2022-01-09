import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button,Image,TextInput,FlatList,SafeAreaView } from 'react-native';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const FIREBASE_API_ENDPOINT = 'https://virtual-bookstore-35845-default-rtdb.firebaseio.com/';
var array2 = []

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

function Options(props){
  const color = props.color

  return(
      <TouchableOpacity
        style={{
          backgroundColor: props.color,
          width: '40%',
          height: 100,
          borderRadius: 25,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        disabled = {props.disabled}
        activeOpacity={0.8}
        onPress={props.event}>
        <Text style={{ fontSize: 24, color: 'white', alignSelf: 'center', textAlign:'center'}}>
          {props.text}
        </Text>
      </TouchableOpacity>
  );
}


function AdminLogin({showLogin, hidelogin}) {

  return(
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 40, marginLeft:'5%', color:'white', fontWeight:'bold', marginTop: '7%'}}> Login! </Text>
        <Text style={{ marginLeft:'7%', color:'white', marginTop: '7%', marginBottom:'2%'}}> Username: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue", color:'white', height: '10%', width: '85%', fontSize: 20, borderRadius:50}}  />
        <Text style={{  marginLeft:'7%', color:'white', marginTop: '7%', marginBottom:'2%'}}> Password: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue", color:'white', height: '10%', width: '85%', fontSize: 20, borderRadius:50, marginBottom: '10%'}}  />
        <Buttons text = 'Let me in'  color = {'#ff9d32'} event= {()=> hidelogin(false) }/>
      </View>
    </View>
  )
  }

function BookManagement({navigation}) {

  return(

    <View style={{flex:1, backgroundColor: 'white'}}>
      <View style={{ alignSelf:'center'}}>
        <View style={{flexDirection: 'row', marginBottom:'10%', marginLeft:'10%'}}>
          <Options text = 'Add    Books'  color = {'#373a96'} event = {() => navigation.navigate('Add Books')}/>
          <Text style={{margin:'2%'}}> </Text>
          <Options text = 'Edit   Books'  color = {'#373a96'} event = {() => navigation.navigate('Edit Books')}/>
        </View>
        <View style={{flexDirection: 'row', marginLeft:'10%'}}>
          <Options text = 'Delete Books'  color = {'#373a96'} event = {() => navigation.navigate('Delete Books')}/>
          <Text style={{margin:'2%'}}> </Text>
          <Options text = 'View Books'  color = {'#373a96'} event = {() => navigation.navigate('View Books')}/>
        </View>
      </View>
    </View>
  )

}

function AddBooks() {

  const [getName, setName] = React.useState('');
  const [getAuthor, setAuthor] = React.useState('');
  const [getDesc, setDesc] = React.useState('');
  const [getPrice, setPrice] = React.useState('');
  const [getID, setID] = React.useState('');

  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        bookname: getName,
        authorname: getAuthor,
        Description: getDesc,
        Price: getPrice,
        ID: getID
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/books.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return(
    <View style={{flex:1, backgroundColor: 'white'}}>
      
      <Text style={{ marginLeft:'7%', marginTop: '5%', marginBottom:'2%'}}> Book Price (Rupees)</Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setPrice}/>
        
        <Text style={{ marginLeft:'7%', marginTop: '5%', marginBottom:'2%'}}> Book ID</Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setID}/>

        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Book Name: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setName}/>

        <Text style={{ marginLeft:'7%',  marginBottom:'2%'}}> Author Name: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setAuthor}/>

        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Book Description: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '25%', width: '85%', fontSize: 20, borderRadius:25, marginBottom:'3%'}}
                    onChangeText={setDesc}/>
        
        <View style={{ marginTop: 20 }}>
          <Button
            style={{ marginTop: 20, maginBottom: 20 }}
            title="Add Book"
            onPress={() => postData()}
          />
        </View>

    </View>
  )
}

function EditBooks({route,navigation}) {

  const { itemId } = route.params;

  const [getName, setName] = React.useState('');
  const [getAuthor, setAuthor] = React.useState('');
  const [getDesc, setDesc] = React.useState('');
  const [getPrice, setPrice] = React.useState('');

  const editData = () => {

  const id = array2[itemId];
    var requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        bookname: getName,
        authorname: getAuthor,
        Description: getDesc,
        Price: getPrice
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/books/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

  }


  return(

    <View style={{flex:1, backgroundColor: 'white'}}>
      
      <Text style={{ marginLeft:'7%', marginTop: '5%', marginBottom:'2%'}}> Book Price (Rupees)</Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setPrice}/>

        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Book Name: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setName}/>

        <Text style={{ marginLeft:'7%',  marginBottom:'2%'}}> Author Name: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '8%', width: '85%', fontSize: 20, borderRadius:20, marginBottom:'3%'}}
                    onChangeText={setAuthor}/>

        <Text style={{ marginLeft:'7%', marginBottom:'2%'}}> Book Description: </Text>
        <TextInput style={{alignSelf:'center', borderWidth: 2,borderColor: "slateblue",height: '25%', width: '85%', fontSize: 20, borderRadius:25, marginBottom:'3%'}}
                    onChangeText={setDesc}/>
        
        <View style={{ marginTop: 20 }}>
          <Button
            style={{ marginTop: 20, maginBottom: 20 }}
            title="Edit book"
            onPress={() => editData()}
          />
        </View>

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
    <View>
      <Text>Are you sure?</Text>
      <Button
        style={{ marginTop: 20, maginBottom: 20 }}
        title="Yes"
        onPress={() => deleteData()}
        />
      
      <Button
        style={{ marginTop: 20, maginBottom: 20 }}
        title="No"
        onPress={() => navigation.navigate('View Books')}
        />
    </View>
  )
}

function ViewBooks({navigation}) {

  const [getName, setName] = useState([])
  const [getAuthor, setAuthor] = useState([])
  const [getDesc, setDesc] = useState([])
  const [getPrice, setPrice] = useState([]);
  const [getID, setID] = useState([]);

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
      setID((getID)=>[...getID, ele.ID])
  })
  }
  if(getName){
  
    return(
    
      <View style={{flex:1, backgroundColor: 'white'}}>
        <FlatList
          data={getName}
          renderItem={(item,index)=> {
            return (
                <View style={{flexDirection: 'row', marginBottom:'10%', marginLeft: '5%'}}>
                  <View style={{marginLeft:'5%'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginTop:'15%',marginBottom:'5%'}}>{getName[item.index]}</Text>
                    <Text style={{fontSize: 12, color:'grey', fontWeight: 'bold',marginBottom:'10%'}}> By:  {getAuthor[item.index]}</Text>
                    <Text style={{fontSize:35, fontWeight:'bold'}}> Rs.  {getPrice[item.index]}</Text>
                  
                    <Button
                      style={{ marginTop: 20, maginBottom: 20 }}
                      title="Edit book"
                      onPress={() => navigation.navigate('Edit Books',{ itemId: getID[item.index] })}
                    />
                    <Button
                      style={{ marginTop: 20, maginBottom: 20 }}
                      title="Delete book"
                      onPress={() => navigation.navigate('Delete Books',{ itemId: getID[item.index] })}
                    />
                    
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
      <Drawer.Screen name="Home" component={BookManagement} options={({navigation}) =>({ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20}, headerRight: () => (<Button title = 'Logout' color = {'#e39ff6'} onPress={() => navigation.navigate('Logout')} />) })} />
      <Drawer.Screen name="Add Books" component={AddBooks} options={{ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20} }} />
      <Drawer.Screen name="Edit Books" component={EditBooks} options={{ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20} }} />
      <Drawer.Screen name="Delete Books" component={DeleteBooks} options={{ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20} }} />
      <Drawer.Screen name="View Books" component={ViewBooks} options={{ headerStyle: { backgroundColor: 'darkslateblue'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 20} }} />
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});