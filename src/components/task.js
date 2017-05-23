import React, { Component } from 'react';
import { Text,View, Button } from 'react-native';

import GreenButton from './greenBtn';

class Task extends Component {
    constructor(props){
        super(props);
        const { params } =  props.navigation.state;
        let currentTask = params;

        this.state = { currentTask };
    }
    removeTask(){

    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text style={{ fontSize: 22 }}>{this.state.currentTask.label}</Text>
                </View>
                <View >
                    {/*<GreenButton title="Move Task" onPress={}/>*/}
                    <Button color="red" title="Remove Task" onPress={this.removeTask}/>
                </View>
            </View>
        );
    }
}

export default Task;