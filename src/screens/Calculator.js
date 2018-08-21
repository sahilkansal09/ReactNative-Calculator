import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Button from '../components/Button';

const Row = (props) => {

    var array = []
    props.texts.forEach(function (val, index) {
        var object = props.properties
        var properties = {}
        if (object != null && object[index] != null) {
            properties = object[index]
            console.log(properties)
        }
        array.push
            (<Button
                properties={properties}
                onPress={(t) => props.callback(t)}
                text={val}
            />)
    })
    return (
        <View style={{
            backgroundColor: '', width: '25%',
            flex: 1
        }}>
            {
                array
            }
        </View>
    )
}


export default class Calculator extends React.Component {
    state = {
        textInput1: '0', textInput2: '', textOutput: '', outputTextSize: 25,
        isEqualBtnActive: false
    }

    buttonPressed = (text) => {
        //insert element in inputTextField1
        if (text != '+' && text != '-' && text != 'X' && text != '/' &&
            this.state.textInput2 == '' && this.state.isEqualBtnActive == false) {
                let newValue;
            // First removing zero from textinput1
            if (this.state.textInput1.charAt(0) == '0') {
                const newString = this.state.textInput1.substring(1, this.state.textInput1.length);
                this.setState({
                    textInput1: newString
                }, () => {
                    this.buttonPressed(text);
                })
                return;
            }
            // handling . button
            if (text == '.')
                {
                    if ((this.state.textInput1.includes('.') == true))
                     return
                    else
                        newValue = this.state.textInput1 + text
                    
                }
            // adding element in inputtext1
            if ((this.state.textInput1).length <= 10) {
                console.log('button pressed');
                console.log(text);
                newValue = this.state.textInput1 + text
                this.setState({
                    textOutput: '= ' + newValue,   // removing zero
                    textInput1: newValue,
                });
            }
        }
        // equal button state is active
        else if (this.state.isEqualBtnActive == true) {
            if (text == '+' || text == '-' || text == 'X' || text == '/') {
                const inpText = this.state.textOutput.substring(1, this.state.textOutput.length);
                this.setState({
                    textInput1: inpText,
                    textInput2: text,
                    isEqualBtnActive: false,
                    outputTextSize: 25
                })
            }
            else if (this.state.textInput2 == '') {
                console.log('single state');
                this.setState({
                    textInput1: '',
                    textOutput: '= ',
                    isEqualBtnActive: false,
                    outputTextSize: 25
                }, () => {
                    this.buttonPressed(text);
                })
            }
            else {
                this.setState({
                    textInput1: text,
                    textInput2: '',
                    textOutput: '= ' + text,
                    isEqualBtnActive: false,
                    outputTextSize: 25
                })
            }
        }
            // adding element in input text 2
        else {
            const textinput2 = this.state.textInput2;
            let newValue;
            if ((textinput2).length <= 11) {
                // handling . (once)
                if (text == '.')
                {
                    if ((this.state.textInput2.includes('.') == true))
                    {
                        return
                    }
                    else{
                        newValue = this.state.textInput2 + text
                    }
                }
                if (text == '+' || text == '-' || text == 'X' || text == '/' ) {
                    console.log("working");
                    if ((this.state.textInput2.includes('+') == true) ||
                        (this.state.textInput2.includes('-') == true) ||
                        (this.state.textInput2.includes('X') == true) ||
                        (this.state.textInput2.includes('/') == true) ) {
                        this.setState({
                            textInput1: this.state.textOutput.substring
                                        (1, this.state.textOutput.length),
                            textInput2: text,
                        })
                        return;
                    }
                    else {
                        newValue = this.state.textInput2 + text
                    }
                }
                else {
                    newValue = this.state.textInput2 + text
                }

                if (newValue.length == 1) {
                    this.setState({
                        textInput2: newValue,
                        textOutput: '= ' + this.state.textInput1
                    });
                }
                else {
                    const operator = newValue.substr(0, 1);
                    let output = '';
                    output = this.calculation(operator,
                        parseFloat(this.state.textInput1), parseFloat(newValue.substr(1, newValue.length)));
                    console.log('calculated output:', output);
                    this.setState({
                        textInput2: newValue,
                        textOutput: '= ' + output
                    });
                }

            }
        }
    }

    //clear button pressed
    buttonClearPressed = () => {
        this.setState({ textInput1: '0', textInput2: '', textOutput: '' });
    }
    //Equal button pressed
    buttonEqualPressed = () => {
        this.setState({ outputTextSize: 40, isEqualBtnActive: true, });
    }
    //Delete button pressed
    buttonDeletePressed = () => {
        if ((this.state.textInput2) == '') {
            // delete digits from input text1
            if ((this.state.textInput1).length > 1) {
                const newValue = this.state.textInput1.substring(0, this.state.textInput1.length - 1);
                console.log("truncated value: ", newValue);
                this.setState({
                    textOutput: '= ' + newValue,
                    textInput1: newValue
                });

            } else {      //delete first digit from input text1                     
                this.setState({
                    textInput1: '0',
                    textOutput: '= 0'
                })
            }
        }
        else {
            // delete digits from input
            const truncated_Value = (this.state.textInput2.substring(1, this.state.textInput2.length - 1));
            const truncated = (this.state.textInput2.substring(0, this.state.textInput2.length - 1))
            this.setState({
                textInput2: truncated
            })
            if (truncated_Value == '') {
                this.setState({
                    textOutput: '= ' + this.state.textInput1,
                });
            }
            else if (truncated == '') {
                this.setState({
                    textOutput: '= ' + this.state.textInput1,
                });
            }
            else {
                const newValue = parseFloat(this.state.textInput1) + parseFloat(truncated_Value);
                console.log("result: ", newValue);
                this.setState({
                    textOutput: '= ' + newValue,
                });
            }
        }
    }

    // % button pressed
    buttonPercentagePressed = () => {

        if ((this.state.textInput1 == '0' || this.state.textInput1 == '' ))
        {
            this.setState({
                textOutput: '= 0' ,
                textInput1: '0'
            });
        }
        else
        {
            console.log("per no working");
            let result = (parseFloat(this.state.textOutput.substring(1, this.state.textOutput.length).trim()) / 100);
            console.log(result);
            this.setState({
                textOutput: '= ' + result.toString(),
                textInput1: result.toString()
            });
        }
    };

    // for calculation
    calculation = (operator, operand1, operand2) => {
        switch (operator) {
            case '+':
                return (operand1 + operand2);
                break;
            case '-':
                return (operand1 - operand2);
                break;
            case 'X':
                return (operand1 * operand2);
                break;
            case '/':
                return (operand1 / operand2);
                break;
        }
    }

    render() {
        return (
            <View>
                {/* Top Section for input */}
                <View style={{ backgroundColor: '', height: '40%', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: '', height: '60%', }}>
                        <TextInput
                            style=
                            {{
                                textAlign: 'right',
                                fontSize: 25,
                            }}
                            value={this.state.textInput1}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            editable={false}
                        />
                        <TextInput
                            style=
                            {{
                                textAlign: 'right',
                                fontSize: 25,
                            }}
                            value={this.state.textInput2}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            editable={false}
                        />
                        <TextInput
                            style=
                            {{
                                textAlign: 'right',
                                fontSize: this.state.outputTextSize,
                            }}
                            value={this.state.textOutput}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            editable={false}
                        />
                    </View>
                </View>

                {/* Bottom Section for buttons */}

                <View style={{ backgroundColor: '', height: '60%', flexDirection: 'row' }}>
                    <Row
                        texts={['AC', '7', '4', '1', '%']}
                        callback={(text) => {
                            if (text == 'AC') {
                                this.buttonClearPressed();
                            }
                            else if (text == '%') {
                                this.buttonPercentagePressed();
                            }
                            else {
                                this.buttonPressed(text)
                            }
                        }}
                    />
                    <Row
                        texts={['DEL', '8', '5', '2', '0']}
                        callback={(text) => {
                            if (text == 'DEL') {
                                this.buttonDeletePressed();
                            }
                            else {
                                this.buttonPressed(text)
                            }
                        }}
                    />
                    <Row
                        texts={['/', '9', '6', '3', '.']}
                        callback={(text) => {
                            this.buttonPressed(text)
                        }}
                    />
                    <Row
                        texts={['X', '-', '+', '=']}
                        properties={
                            {
                                3: {
                                    backgroundColor: 'orange',
                                    flex: 2
                                }
                            }
                        }
                        callback={(text) => {
                            if (text == '=') {
                                this.buttonEqualPressed();
                            }
                            else {
                                this.buttonPressed(text)
                            }
                        }}
                    />
                </View>
            </View>
        );
    }
};

