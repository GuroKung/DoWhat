import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import firebase from '../firebaseService';

import GreenButton from './greenBtn';

class TaskLists extends Component {
    constructor(props){
        super(props);

        let tasks = [{label: 'Now Loading..'}];

        firebase.database().ref(props.taskUrl).once('value')
            .then((snapshot) => {
                if (!snapshot) this.setState({ tasks: [] });
                else this.setState({ tasks: snapshot.val() });
            })
            .catch((error) => {
                console.log('ERROR: ' + error.message);
                // throw error;
            });

        this.state = { tasks };
    }

    async createNewTask() {
        if (this.state.newTask) {
            try {
                let tasks = this.state.tasks;

                if(!tasks) tasks = [];

                tasks.push({
                    label: this.state.newTask
                });

                await firebase.database().ref(this.props.taskUrl).set(tasks);
                this.setState({ tasks });
            } catch (error) {
                console.log(error.toString());
            }
        }
    }

    clearTask() {
        this.setState({ newTask: '' });
    }

    render() {
        let tasks = [];

        if (this.state.tasks) {
            tasks = this.state.tasks.map((task, index) => {
                return (
                    <View key={index} style={{ borderStyle: 'solid'}}>
                        <Text>{task.label}</Text>
                    </View>
                )
            });
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'column', padding: 50, justifyContent: 'center' }}>
                    {tasks}
                </View>
                <View style={{ padding: 50, justifyContent: 'flex-start' }}>
                    <TextInput
                        style={{ height: 80 }}
                        placeholder="Create New Task"
                        onChangeText={(newTask) => this.setState({ newTask })}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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

export default TaskLists;