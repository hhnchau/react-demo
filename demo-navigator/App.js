import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {

  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>

      <Text>{number}</Text>

      <Button
        title='Go to Detail'
        onPress={() => {
          navigation.navigate('Detail', { id: 1, count: number, func: setNumber }); //Create new screen
          //navigation.push('Detail'); //Add screen on top
        }
        }
      ></Button>
      <Button
        title='Replace'
        onPress={() => {
          navigation.replace('Detail'); //New screen finish Old screen
        }}
      />
    </View>
  );
}

const Detail = ({ navigation, route }) => {
  const [number, setNumber] = useState(route.params.count);
  console.log(route.params.func);
  return (
    <View style={styles.container}>
      <Text>{number}</Text>

      <Button
        title='Increase'
        onPress={() => {
          setNumber(number + 1);
          route.params.func(number + 1);
        }}
      />

      <Button
        title='Go to Detail again'
        onPress={() => {
          //navigation.navigate('Detail');
          navigation.push('Detail');
        }}
      />
      <Button
        title='Go Back'
        onPress={() => {
          navigation.goBack(); //Back a screen
          //navigation.popToTop(); //Go to Home
        }}
      />
    </View>
  )
}

export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator 
        tabBarOptions={{
          labelStyle:{
            // color:'red',
            fontSize:30
          },
          activeTintColor: 'blue',
          inactiveTintColor: 'black'
        }}
        //tabBar={()=> <Text>Custom Tab</Text>}
      >
        <Tab.Screen name="Home" component={Home}
          options={
            {
              tabBarLabel:"Tab1",
              tabBarIcon: ({color})=> <FontAwesome name='home' size={30} color={color}/>
            }
          }></Tab.Screen>
        <Tab.Screen name="Profile" component={Detail} initialParams={{ count: 10 }}
          options={{
            tabBarLabel:"Tab2",
            tabBarIcon: ({color})=> <FontAwesome name='gear' size={30} color={color}/>
          }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={Home}></Stack.Screen>
    //     <Stack.Screen 
    //     name="Detail" 
    //     component={Detail} 
    //     initialParams={{ count: 10 }} //init data default for params navigator
    //     ></Stack.Screen>
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
