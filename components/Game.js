import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import dataFile from './4Nums';
import styles from '../assets/stylesheets/main';
import Num from './Num';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: 0,
      numbers: [],
      operators: ['+','-','x','/'],
      clicked: [],
      solutions: []
    }
    this.handleNum = this.handleNum.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.handleGame = this.handleGame.bind(this);
    this.handleSolutions = this.handleSolutions.bind(this)
  }

  componentDidMount(){
    var item = Math.floor(Math.random()*dataFile.length);
    this.setState({item: item})
    var numbers = setNums(item)
    this.setState({numbers: numbers})
  }

  handleNum(num){
    var temp = this.state.clicked;
    console.log('up', temp);
    if(temp.length !== 0 && this.state.operators.indexOf(temp[temp.length - 1]) === -1){
      alert('choose a sign')
    }else{
      temp.push([this.state.numbers[num], num])
      this.setState({clicked: temp})
    }

    if(temp.length === 3){
      console.log('in here');
      var num1 = temp[0];
      var num2 = temp[2];
      var operator = temp[1];
      var newNumbers = this.state.numbers;
      newNumbers[num1[1]] = '';
      // console.log(calculator([1,'+',2]))
      newNumbers[num2[1]] = calculator([num1[0], operator, num2[0]])
      this.setState({numbers:newNumbers, clicked: []});
      if(checkWin(newNumbers) === 'winner'){
        alert('Winner')
        this.handleGame()
      }
    }
  }

  handleGame(){
    var item = Math.floor(Math.random()*dataFile.length);
    this.setState({item: item})
    var numbers = setNums(item)
    this.setState({numbers: numbers})
  }

  handleSign(num){
    var temp = this.state.clicked;
    if(this.state.operators.indexOf(temp[temp.length - 1]) !== -1){
      temp[1] = this.state.operators[num]
      this.setState({clicked: temp})
    }else if(temp.length === 0 || this.state.numbers.indexOf(temp[temp.length - 1][0]) === -1){
        alert('choose a number')
    }else{
      var newClicked = temp.concat([this.state.operators[num]])
      this.setState({clicked: newClicked})
    }
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

  handleUndo(){
    var newClicked = this.state.clicked;
    newClicked.pop();
    this.setState({clicked: newClicked})
  }

  render() {
    return (
      <View style={styles.gameBox}>
        {/* container for the 4 nums */}
        <View style={styles.container}>
          <View>
            {this.state.numbers[0] === '' ? <View style={styles.square}></View>:
            <TouchableOpacity style={styles.square} onPress={() => this.handleNum(0)}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{this.state.numbers[0]}</Text>
              </View>
            </TouchableOpacity>
          }
          {this.state.numbers[1] === '' ? <View style={styles.square}></View>:
            <TouchableOpacity style={styles.square} onPress={() => this.handleNum(1)}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{this.state.numbers[1]}</Text>
              </View>
            </TouchableOpacity>
          }
          </View>
          <View>
            {this.state.numbers[2] === '' ? <View style={styles.square}></View>:
            <TouchableOpacity style={styles.square} onPress={() => this.handleNum(2)}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{this.state.numbers[2]}</Text>
              </View>
            </TouchableOpacity>
          }
          {this.state.numbers[3] === '' ? <View style={styles.square}></View>:
            <TouchableOpacity style={styles.square} onPress={() => this.handleNum(3)}>
              <View style={styles.number}>
                <Text style={{fontSize: 30}}>{this.state.numbers[3]}</Text>
              </View>
            </TouchableOpacity>
          }
          </View>
        </View>
        {/* end of container for nums */}
        <View style={styles.operatorsView}>
          {this.state.operators.map((ops,i) => {
            return (
              <TouchableOpacity key={i} style={styles.square} onPress={() => this.handleSign(i)}>
                <View style={styles.operators}>
                  <Text style={{fontSize: 30}}>{ops}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.square} onPress={() => this.handleUndo()}>
          <View><Text>Undo </Text><Text>{this.state.clicked}</Text></View>
        </TouchableOpacity>

        <View style={styles.operatorsView}>
          {this.state.solutions.length !== 0 ?
            <View>
              {this.state.solutions.map((solve, i) => {
                return <Text key={i}>{solve}</Text>
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


const math_it_up = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '/': function (x, y) { return (x / y)},
    'x': function (x, y) { return x * y },
  }

function calculator(array){
  var len = array.length
  var operator = array[len - 2];
  var num1 = Number(array[len - 3]);
  var num2 = Number(array[len - 1])
  return math_it_up[operator](num1,num2)
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

function checkWin(array){
  var count = 0;
  array.forEach((num) => {
    if(num === ''){
      count ++
    }
  })
  if(count === 3 && array.indexOf(24) !== -1){
    return 'winner';
  }
  return 'continue'
}
