import React, { Component } from 'react';
import { View, Text, TextInput, Button, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import firebase from '../firebaseService';

import GreenButton from './greenBtn';

class TaskLists extends Component {
    constructor(props){
        super(props);

        let tasks = [{label: 'Now Loading..'}];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        firebase.database().ref(props.taskUrl).once('value')
            .then((snapshot) => {
                if (!snapshot) this.setState({ dataSource: ds.cloneWithRows([]) });
                else this.setState({ dataSource: ds.cloneWithRows(snapshot.val()) });
            })
            .catch((error) => {
                console.log('ERROR: ' + error.message);
                this.setState({ dataSource: ds.cloneWithRows([]) });
                // throw error;
            });

        this.clearTask = this.clearTask.bind(this);
        this._renderRow = this._renderRow.bind(this);

        this.state = { dataSource: ds.cloneWithRows(tasks) };
    }

    async createNewTask() {
        if (this.state.newTask) {
            try {
                let tasks = this.state.dataSource._dataBlob.s1;
                let key = firebase.database().ref().child('tasks').push().key;

                if(!tasks) tasks = [];

                tasks.push({
                    id: key,
                    label: this.state.newTask
                });

                await firebase.database().ref(this.props.taskUrl).set(tasks);
                this.clearTask();
                this.setState({ dataSource: this.state.dataSource.cloneWithRows(tasks), newTask: '' });
                this.props.alertCreateTaskSuccess();
            } catch (error) {
                console.log(error.toString());
            }
        }
    }

    clearTask() {
        this._textInput.setNativeProps({text: ''});
    }
    
    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableHighlight onPress={() => {
                this.props.navigation.navigate('Task', rowData )
            }}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {rowData.label}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={styles.taskListsContainer}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeparator}
                        enableEmptySections={true}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={{ padding: 10, height: 80, backgroundColor: '#F6F6F6'}}
                        ref={component => this._textInput = component}
                        placeholder="Create New Task"
                        onChangeText={(newTask) => this.setState({ newTask })}
                    />
                    <View style={styles.textInputButtonContainer}>
                        <GreenButton title="Add" press={() => this.createNewTask()} />
                        <Button
                            title="Clear"
                            color="#000000"
                            accessibilityLabel="Clear"
                            onPress={this.clearTask} />
                    </View>
                </View>
            </View>            
        );
    }
}

let styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1
  },
  textBox: {
      backgroundColor: '#F6F6F6'
  },
  textInputContainer: {
       marginTop: 12, 
       justifyContent: 'flex-start'
  },
  textInputButtonContainer: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center'
  },
  taskListsContainer: {
      marginTop: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      maxHeight: 165
  }
});

export default TaskLists;