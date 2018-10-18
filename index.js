'use strict';

class Calculator {
    constructor() {
        this.priority = {
            '^': 3,
            '*': 2,
            '/': 2,
            '+': 1,
            '-': 1,
            '(': 0,
            ')': 0
        };

        this.methods = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b
        };

    }

    isDigit(data) {
        return data.test(/0-9/);

    }

    pushToStack(result, stack, data) {
        if (stack.length === 0) {
            stack.push(data);
            return;
        }

        while (this.priority[stack[stack.length - 1]] >= this.priority[data]) {
            result.push(stack.pop());
        }
        stack.push(data);
    }

    createString(str) {
        let result = [];
        let stack = [];
        str = str.split(' ');
        for (let symbol in str) {
            if (this.isDigit(str[symbol])) {
                result.push(str[symbol])
            } else {
                if (str[symbol].length > 1) {
                    return 'error';
                }
                this.pushToStack(result, stack, str[symbol]);
            }
        }
        while (stack.length) {
            result.push(stack.pop());
        }
        return result;
    }

    calculate(str) {
        let data = this.createString(str);
        if (data === 'error') {
            return data;
        }
        while (data.length > 1) {
            for (let obj in data) {
                if (!this.isDigit(data[obj])) {
                    data.splice(obj - 2, 3, this.methods[data[obj]](+data[obj - 2], +data[obj - 1]));
                    break;
                }
            }
        }
        return data;
    }
}

// exports.calculator = Calculator;
const c = new Calculator();
console.log(c.calculate('1 + 2'));
