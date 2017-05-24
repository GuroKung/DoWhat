import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, AlertIOS } from 'react-native';
import { MessageBar as MessageBarAlert , MessageBarManager } from 'react-native-message-bar';

import moment from 'moment';
import firebase from '../firebaseService';
import TaskLists from './taskLists';

class Project extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            title: 'Do What',
            headerBackTitle: navigation.state.params.project.name,
            headerLeft: (
                <Button
                    title="Menu"
                    onPress={() => navigate('Menu') }
                />
            )
        };
    };

    constructor(props){
        super(props);

        const { params } =  props.navigation.state;
        let currentProject = params.project;
        let curentUser = firebase.auth().currentUser;   
        let projectId = params.projectId;
        let taskUrl = 'users/' + curentUser.uid + '/projects/' + projectId + '/tasks';
        this.state = { taskUrl, currentProject, projectId };
    }

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    alertCreateTaskSuccess () {
        MessageBarManager.showAlert({
            title: 'Success',
            message: 'Task created',
            alertType: 'success',
            animationType: 'SlideFromLeft',
            stylesheetSuccess: {
                backgroundColor: '#6fcf97',
                strokeColor: '#6fcf97'
            }
        });
    }

    archiveProject(projectId, navigate) {
        AlertIOS.alert(
            'Comfirm Archive Project',
            'Are you sure want to archive this project ? It will be gone forever.',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Archive', onPress: async () => {
                        try {
                            let curentUser = firebase.auth().currentUser;
                            await firebase.database().ref(`users/${curentUser.uid}/projects/${projectId}`).remove();
                            navigate('MainPage');
                        } catch (error) {
                            console.log(error.toString());
                        }
                    }
                }
            ]
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        if (this.state.currentProject.tasks) {
            var remainingTasks = `${this.state.currentProject.tasks.length} remains`;
        }

        return (
            <View style={styles.container}>
                <View style={styles.projectHeader}>
                    <Text style={styles.textSize}>{this.state.currentProject.name}</Text>
                </View>
                <View style={styles.projectSub}>
                    <Text>{remainingTasks}</Text>
                </View>
                <View style={styles.projectSub}>
                    <Button title="Archive Project" onPress={() => this.archiveProject(this.state.projectId, navigate)} color='red'/>
                </View>
                <TaskLists taskUrl={this.state.taskUrl} navigation={this.props.navigation} alertCreateTaskSuccess={this.alertCreateTaskSuccess}/>
                <MessageBarAlert ref="alert" />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: { flex: 1 },
    textSize: { fontSize: 22 },
    projectHeader: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
    projectSub: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 }
});

export default Project;