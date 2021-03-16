import React from 'react';
import { Button, Dimensions, StyleSheet, Text, Image, TextInput, View, ScrollView, FlatList } from 'react-native';

import { widthToDp, heightToDp, isOrientation, removeOrientation, getDynamicStyles } from './Dimen'

const { height } = Dimensions.get('window');

function ResponsiveComponent() {
  return (
    <View style={styles.container}>

      <View style={styles.top}>
        <View style={styles.profile}></View>
      </View>


      <View style={styles.center}></View>

      <View style={styles.bottom}>
        <View style={styles.bottomItem}>
          <View style={styles.bottomItemInner}></View>
        </View>

        <View style={styles.bottomItem}>
          <View style={styles.bottomItemInner}></View>
        </View>

        <View style={styles.bottomItem}>
          <View style={styles.bottomItemInner}></View>
        </View>

        <View style={styles.bottomItem}>
          <View style={styles.bottomItemInner}></View>
        </View>
      </View>

    </View>
  );
}

class SecondComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image style={{ width: 100, height: 100 }}
          source={{ uri: item.image }}
        ></Image>

        <View style={{ flex: 1, justifyContent: 'center' }}>
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



    const ps = portraitStyles();
    const ls = landscapeStyles();

    return (
      <View>
        <Text>First Class Component {a + 1} {b()}</Text>
        <Text>{this.props.txt}</Text>
        <Text style={styles.redSquare}></Text>


        {/* Responsive */}
        <View style={getDynamicStyles(ps.view, ls.view)}>
          <Text style={getDynamicStyles(ps.text, ls.text)}>Hello</Text>
        </View>


      </View>
    );
  }

  componentWillUnmount() {
    removeOrientation();
  }

  componentDidMount() {
    isOrientation(this);
  }

}

export default class App extends React.Component {
  state = {
    isShow: true,
    count: 100
  };

  render() {
    return (
      // <ResponsiveComponent/>
      <FirstClassComponent />
    );
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

const portraitStyles = () => {
  return StyleSheet.create({
    text: {
      fontSize: widthToDp('6%')
    },
    view: {
      backgroundColor: 'lightblue'
    }
  });
}

const landscapeStyles = () => {
  return StyleSheet.create({
    text: {
      fontSize: widthToDp('6%')
    },
    view: {
      backgroundColor: 'red'
    }
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  top: {
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  profile: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#eee'
  },
  center: {
    height: '10%',
    backgroundColor: '#7fbcac'
  },
  bottom: {
    height: '45%',
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  bottomItem: {
    width: '50%',
    height: '50%',
    backgroundColor: 'pink',
    padding: 5
  },
  bottomItemInner: {
    flex: 1,
    backgroundColor: '#232323'
  },

  responsive: {
    fontSize: 20
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

