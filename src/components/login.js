import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import styles from '../styles';
import firebase from '../firebaseService';

import GreenButton from './greenBtn';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:'', 
            password: ''
         };
         this.signup = this.signup.bind(this);
    }
    async signup() {
            console.log('Call Signup', this.state);
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password);

            console.log("Account created");

            // Navigate to the Home page, the user is auto logged in

        } catch (error) {
            console.log(error.toString())
        }

    }
    login(){
        console.log("LOGIN");
    }
    render() {
        return (
            <View style={{ flex: 1 , justifyContent: "center", padding: 50, alignItems: 'stretch'}}>
                <Text style={{ marginBottom: 15,  fontSize: 50, alignItems: 'center' }}> Do What </Text>
                <Text>Email:</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Input email"
                    onChangeText={(email) => {
                        console.log('On Text Change email:', email);
                        this.setState({email})
                        console.log('current state', this.state.email);
                    }}
                    autoCapitalize="none"
                />
                <Text>Password:</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Input password"
                    password={true}
                    onChangeText={(password) => this.setState({password})}
                    autoCapitalize="none"
                />
                <GreenButton title="LOGIN" press={this.login} />
                <Button 
                title="Sign Up"
                color="#841584"
                accessibilityLabel="Ok, Great!"
                onPress={this.signup}/>
            </View>
        );
    }
}


export default Login;