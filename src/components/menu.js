import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import firebase from '../firebaseService';

class Menu extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            title: 'Do What'
        };
    };

    constructor(props) {
        super(props);

        let projects = [];
        let curentUser = firebase.auth().currentUser;  

        firebase.database().ref('users/' + curentUser.uid).once('value')
            .then((snapshot) => {
                if (!snapshot) this.setState({ projects: [] });
                else {
                    for(project in snapshot.val()) {
                        projects.push({ name: project.name });
                    }
                    this.setState({ projects });
                }
            })
            .catch((error) => {
                console.log('ERROR: ' + error.message);
                this.setState({ projects: [] });
                // throw error;
            });

        this.state = { projects };
    }
    render() {
        return (
            <View>
                <Text>Projects</Text>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between'}}>
                    {this.state.projects}
                </View>
            </View>
        );
    }
}

export default Menu;