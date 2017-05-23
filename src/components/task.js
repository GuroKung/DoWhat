import React, { Component } from 'react';
import { Text,View, Button, StyleSheet } from 'react-native';

import firebase from '../firebaseService';

import GreenButton from './greenBtn';

class Task extends Component {
    constructor(props){
        super(props);
        const { params } =  props.navigation.state;
        let currentTask = params;

        this.state = { currentTask };
        this.doneTask = this.doneTask.bind(this);
    }

    async doneTask(){
        try {

            let curentUser = firebase.auth().currentUser;
            let projects = await firebase.database().ref('users/' + curentUser.uid + '/projects/').once('value');

            projects.val().forEach((project, projectIndex) => {
                if (project.tasks) {
                    project.tasks.forEach(async (task, taskIndex) => {
                        if (task.id == this.state.currentTask.id) {
                            await firebase.database().ref(`users/${curentUser.uid}/projects/${projectIndex}/tasks/${taskIndex}`).remove();
                            this.props.navigation.navigate('MainPage');
                        }
                    });
                }
            });
        

        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.taskName}>
                    <Text style={styles.textSize}>{this.state.currentTask.label}</Text>
                </View>
                <View >
                    <GreenButton title="Done" press={this.doneTask}/>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start' },
    textSize: { fontSize: 22 },
    taskName: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 }
});

export default Task;