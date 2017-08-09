import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numbers: [1,2,6,4]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.numbers.map((num) => {
          return (
            <TouchableOpacity style={styles.square}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{num}</Text>
              </View>
            </TouchableOpacity>
        );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square:{
    backgroundColor: '#fff',
    borderWidth: 2,
    width: 100,
    height: 100
  },
  number: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
