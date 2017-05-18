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

        firebase.database().ref('users/' + curentUser.uid + '/projects').once('value')
            .then((snapshot) => {
                if (!snapshot) this.setState({ projects: [] });
                else this.setState({ projects: snapshot.val() });
            })
            .catch((error) => {
                console.log('ERROR: ' + error.message);
                this.setState({ projects: [] });
                // throw error;
            });

        this.state = { projects };
    }
    render() {
        let projects = [];
        const { navigate } = this.props.navigation;

        if (this.state.projects) {
            projects = this.state.projects.map((project, index) => {
                return (
                    <View key={index} style={{ borderStyle: 'solid'}}>
                        <Button 
                            title={project.name}
                            onPress={() => navigate('Project', { projectId: index, project })}/>
                    </View>
                )
            });
        }
        
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text style={{ fontSize: 22 }}>Projects</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                        title="Task Lists"
                        onPress={() => this.props.navigation.navigate('MainPage')}
                    />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between'}}>
                    {projects}
                </View>
            </View>
        );
    }
}

export default Menu;