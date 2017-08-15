import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 7,
    flexDirection: 'row',
    margin: 70
  },
  square: {
    backgroundColor: '#fff',
    borderWidth: 1,
    flex: .5,
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
  operatorsView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },
  solutions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderWidth: 2
  },
  entire:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;
