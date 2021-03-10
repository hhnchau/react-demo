import React from 'react';
import { Button, Dimensions, StyleSheet, Text, Image, TextInput, View, ScrollView, FlatList } from 'react-native';


const { height } = Dimensions.get('window');

class SecondComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    return (
      <View style={{flex:1, flexDirection:'row'}}>
        <Image style={{width:100, height:100}}
          source={{ uri: item.image }}
        ></Image>

        <View style={{flex:1, justifyContent:'center'}}>
          <Text>{item.book_title}</Text>
          <Text>{item.author}</Text>
        </View>

      </View>
    )
  }

  componentDidMount() {
    const url = 'http://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1';
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson)
        this.setState(
          {
            dataSource: resJson.book_array
          }
        )
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          //flexDirection: 'row'
        }}
      >

        {/* <View style={
        styles.redSquare
      }></View>

      <View style={
        styles.greenSquare
      }></View> */}

        {/* <Image source={require("./assets/ic_yt.png")}/> */}
        {/* <Image source={{uri:"https://via.placeholder.com/600/92c952"}}
       style={{width:100, height:100}}
       resizeMode="stretch"/> */}


        {/* <ScrollView horizontal={true}></ScrollView> */}

        <FlatList
          data={this.state.dataSource}
          keyExtractor={item => item.toString()}
          renderItem={this.renderItem}
        ></FlatList>

      </View>
    )
  }
}

function FirstComponent(props) {
  console.log(props)
  const [count, setCount] = React.useState(0);
  return (
    <View>
      <Text>Fisrt Component {count} {height}</Text>
      <Text>{props.txt}</Text>
      <Button
        title="Click"
        onPress={() => {
          setCount(count + 1);
        }
        }
      />
    </View>
  );
}

class FirstClassComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const a = 1 + 5;
    const b = function () {
      return "Hello World";
    }
    return (
      <View>
        <Text>First Class Component {a + 1} {b()}</Text>
        <Text>{this.props.txt}</Text>
        <Text style={styles.redSquare}></Text>
      </View>
    );
  }

  componentWillUnmount() {

  }

}

export default class App extends React.Component {
  state = {
    isShow: true,
    count: 100
  };

  render() {
    return (
      <View style={styles.container}>

        {/* <Text style={
          { backgroundColor: "yellow" }
        }
        >D + {this.state.count}</Text> */}

        {/* <TextInput placeholder='Xin Chao' /> */}

        {/* <FirstComponent txt={"OKH"} /> */}

        {/* <FirstClassComponent txt = {"Haha!"}/> */}

        {/* {this.state.isShow ? <FirstClassComponent txt={"Haha!"} /> : <View />} */}

        {/* <Button
          title="Button"
          onPress={() => this.setState({ isShow: !this.state.isShow })}
        /> */}

        {/* <Button
          title="Increase"
          onPress={() => {
            this.setState({
              count: this.state.count + 1,
              a: 10
            })
          }
          }
        /> */}

        <SecondComponent />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  redSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  greenSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'green'
  }
});

