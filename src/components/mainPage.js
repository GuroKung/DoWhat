import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import moment from 'moment';
import firebase from '../firebaseService';
import GreenButton from './greenBtn';

class MainPage extends Component {
    static navigationOptions = {
        title: 'Do What'
    };

    constructor(props){
        super(props);
        let currentDate = moment().format("MMM Do YY");
        let curentUser = firebase.auth().currentUser;
        let tasks = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];       

        firebase.database().ref('users/' + curentUser.uid + '/tasks').once('value')
        .then((snapshot) => {
            if(!snapshot) this.setState({ tasks: [] });
            else this.setState({ tasks: snapshot.val() });
        })
        .catch((error) => {
            console.log('ERROR: ' + error.message);
            // throw error;
        });

        this.state = { currentDate, curentUser, tasks };
    }

    async createNewTask() {
        if (this.state.newTask) {
            try {
                let tasks = this.state.tasks;

                if(!tasks) tasks = [];

                tasks.push({
                    label: this.state.newTask
                });

                await firebase.database().ref('users/' + this.state.curentUser.uid + '/tasks').set(tasks);
                this.setState({ tasks });
            } catch (error) {
                console.log(error.toString());
            }
        }
    }

    clearTask(){

    }

    render() {

        let tasks = [];
        console.log();
        if (this.state.tasks) {
             tasks = this.state.tasks.map((task, index) => {
                return <Text key={index}>{task.label}</Text>
            });
        }
       
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text style={{ fontSize: 22 }}>Today Task List{"\n"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -15 }}>
                    <Text>{this.state.currentDate.toString()}</Text>
                </View>
                <View style={{flexDirection: 'column', padding: 50, justifyContent: 'center' }}>
                    {tasks}
                </View>
                <View style={{ padding: 50, justifyContent: 'flex-start' }}>
                    <TextInput
                        style={{ height: 80 }}
                        placeholder="Create New Task"
                        onChangeText={(newTask) => this.setState({ newTask })}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  }}>
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

export default MainPage;