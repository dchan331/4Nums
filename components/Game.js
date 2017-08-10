import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import dataFile from './4Nums';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: 0,
      numbers: [1,2,6,4],
      operators: ['+','-','x','/'],
      clicked: [],
      solutions: []
    }
    this.handleNum = this.handleNum.bind(this);
    this.handleSign = this.handleSign.bind(this)
  }

  componentDidMount(){
    var item = Math.floor(Math.random()*dataFile.length);
    console.log('CDM', item)
    this.setState({item: item})
    var numbers = setNums(item)
    this.setState({numbers: numbers})
  }

  handleNum(num){
    var temp = this.state.clicked;
    var newClicked = temp.concat([this.state.numbers[num]])
    this.setState({clicked: newClicked})
  }

  handleSign(num){
    var temp = this.state.clicked;
    var newClicked = temp.concat([this.state.operators[num]])
    this.setState({clicked: newClicked})
  }

  handleSolutions(x){
    console.log('HS', this.state.item)
    if(x){
      this.setState({solutions: []})
    }else{
      var solutions = displaySolutions(this.state.item)
      this.setState({solutions: solutions})
    }
  }
  render() {
    console.log(this.state.solutions);
    return (
      <View>
        <View style={styles.container}>
          <View>
            <TouchableOpacity style={styles.square} onPress={() => this.handleNum(0)}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{this.state.numbers[0]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.square} onPress={() => this.handleNum(1)}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{this.state.numbers[1]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.square} onPress={() => this.handleNum(2)}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{this.state.numbers[2]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.square} onPress={() => this.handleNum(3)}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{this.state.numbers[3]}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View><Text style={{fontSize: 40, textAlign: 'center'}}>{this.state.clicked}</Text></View>

        <View style={styles.operatorsView}>
          {this.state.operators.map((ops,i) => {
            return (
              <TouchableOpacity style={styles.square} onPress={() => this.handleSign(i)}>
                <View style={styles.operators}>
                  <Text style={{fontSize: 30}}>{ops}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.operatorsView}>
          {this.state.solutions.length !== 0 ?
            <View>
              {this.state.solutions.map((solve) => {
                return <Text>{solve}</Text>
              })}
              <TouchableOpacity onPress={() => this.handleSolutions('hide')}><Text>Hide Solutions</Text></TouchableOpacity>
            </View>
            :
            <TouchableOpacity style={styles.container} onPress={() => this.handleSolutions()}>
              <View><Text>Solutions</Text></View>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

function setNums(item){
  var nums = dataFile[item].Solvables.split(' ');
  let array = [];
  nums.forEach((num) => {
    array.push(Number(num))
  })
  return array
}

function displaySolutions(item){
  var nums = dataFile[item];
  var solve = []
  for(var key in nums){
    if(key.startsWith('Solution') && nums[key] !== ''){
      solve.push(nums[key].trim())
    }
  }
  return solve
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  square:{
    backgroundColor: '#fff',
    borderWidth: 2,
    width: 100,
    height: 100,
  },
  number: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  operators: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  operatorsView:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  solutions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderWidth: 2
  }
});
