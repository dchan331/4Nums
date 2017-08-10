import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheets/main';

class Num extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log("NUM REACHED", this.props.number);
    return(
      <TouchableOpacity style={styles.numSquare} onPress={() => this.props.handleNum(this.props.number)}>
        <View style={styles.number}>
          <Text style={{fontSize: 30}}>{this.props.number}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default Num;
