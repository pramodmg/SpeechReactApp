/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ListView
} from 'react-native';
var Speech = require('react-native-speech');
// var Speech = require('./SpeechLib');
window.id = 0;
    
const oDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SpeechApp extends Component {
  constructor() {
    super()
    this._toDoList = [];
    this.state = {
      todoText: '',
      indexActive: undefined,
      skipped: false,
      listViewdata: [],
      dataSource: oDataSource.cloneWithRows(this._toDoList)
    }
  }

  _startHandler() {
    // console.log('the this.state.listViewdata', this.state.listViewdata)
    // let data = this.state.listViewdata.toString();
    // console.log('the data is ',data);
    let self = this; 
    this.state.listViewdata.forEach(function(data, i){
      // console.log('yyyy', Speech.pause);;
      // if (Speech.isPaused()) {
      setTimeout(function(){
        console.log('this.state.', self.state.skipped)
        console.log('*************', i);
        self.setState({
          indexActive: i
        });
        if(self.state.skipped) {
          self.setState({
            newStyle: false,
            skipped: false,
            indexActive: i + 1
          });
          return;
        }
        Speech.speak({
          text: data,
          voice: 'en-UK',
          rate: 0.35
        })
        .catch(error => {
          console.log('You\'ve already started a speech instance.');
        });
      },2000 * (i + 1));
      // }
    });
  }

  addText() {
    this.refs.todo.setNativeProps({text: ''})
    this._toDoList.push(this.state.todoText);
    this.state.listViewdata.push(this.state.todoText);
    this.setState({dataSource: oDataSource.cloneWithRows(this._toDoList)});
  }

  renderItem(rowData, rowID, sectionID, highlightRow){
    // let stylesR = ["styles.todoItem"];
    console.log('this.state. is' , this.state)
    // console.log('the rowID and this.state. is ', sectionID, this.state.indexActive);
    let highlightText = {};
    if(this.state.indexActive == sectionID) {
      // console.log('here ******** ')
      highlightText = styles.yellowBackground
    }
    // console.log('Data:::', rowData, 'Style:::;', pummysStyle);
    // stylesR = stylesR.toString();
    return (
      <Text style={[ styles.todoList, highlightText ]}> {rowData} </Text>
    );  
  }

  _skipHandler() {
    this.setState({
      skipped: true
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TextInput
          ref='todo'
          style = {styles.input}
          placeholder = 'Email'
          autoCapitalize = 'none'
          onChangeText = {(todoText) => this.setState({todoText})}
          value={this.state.todoText}
        />
        <Button onPress={this.addText.bind(this)}
          title="Add">
        </Button>
        <Button onPress={this._startHandler.bind(this)}
          title="Speak">
        </Button>
        <Button onPress={this._skipHandler.bind(this)}
          title="Skip">
        </Button>
        <ListView 
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
          style={styles.todoList}
          contentContainerStyle={styles.contentContainer}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}>
          </ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  todoList: {
    padding: 10
  },
  yellowBackground: {
    backgroundColor: 'yellow'
  },
  todoItem:{
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    paddingRight: 10,
    textAlign: 'center'
  },
  listContainer: {
    paddingTop: 22
  },
  listItem: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todoContainer: {
    flex: 1,
    width: window.width
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  contentContainer: {
    paddingHorizontal: 20,
  }
});

AppRegistry.registerComponent('SpeechApp', () => SpeechApp);
