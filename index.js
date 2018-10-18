'use strict';

class Calculator {
    constructor() {
        this.priority = {
            '^': 3,
            '*': 2,
            '/': 2,
            '+': 1,
            '-': 1
        };

        this.methods = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
            '^': (a, b) => Math.pow(a, b)
        };

    }

    isDigit(data) {
        return /^-?[0-9]+([.][0-9])?$/.test(data);

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

    createString(input) {
        const result = [];
        const stack = [];
        input = input.split(' ');
        for (let i = 0; i < input.length; ++i) {
            if (input[i] === '/' && input[i + 1] === '0') {
                return 'error'
            }
            if (this.isDigit(input[i])) {
                result.push(input[i])
            } else {
                if (input[i].length > 1) {
                    return 'error';
                }
                this.pushToStack(result, stack, input[i]);
            }
        }
        while (stack.length) {
            result.push(stack.pop());
        }
        return result;
    }

    calculate(str) {
        const data = this.createString(str);
        if (data === 'error') {
            return 'error';
        }
        while (data.length > 1) {
            for (let obj in data) {
                if (!this.isDigit(data[obj])) {
                    if (obj < 2) {
                        return 'error'
                    }
                    data.splice(obj - 2, 3, this.methods[data[obj]](+data[obj - 2], +data[obj - 1]));
                    break;
                }
            }
        }
        return data;
    }
}

exports.calculator = Calculator;
// const c = new Calculator();
// console.log(c.calculate('12 - 2 ^ 3 + 1 * 2'));
