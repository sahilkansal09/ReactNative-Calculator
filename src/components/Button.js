import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const Button = (props) => {

    var properties = {
        flex: 1
    }

    Object.assign(properties, props.properties)

    return (
        <View style={properties}>
            <TouchableOpacity onPress={() => {
                props.onPress(props.text)
            }

            }
            style={{
                borderColor: 'grey',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                borderWidth: 1,
                justifyContent: 'center'
            }}>
                <Text
                    style={{
                        fontSize: 25
                    }}> {props.text} </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Button;