          <View style={styles.numBox}>
            {this.state.numbers.map((number, index) =>
              <Num
                number={number}
                key={index}
                handleNum={(number) => this.handleNum(number)}
              />
            )}
            {/* <TouchableOpacity style={styles.square} onPress={() => this.handleNum(0)}>
