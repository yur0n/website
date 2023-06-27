const screen = document.querySelector('#screen');
const result = document.querySelector('#result');
const buttons = document.querySelectorAll('.action');
const numbers = document.querySelectorAll('.number');
let pressed = '';
let first = '';

function reset() {
    screen.value = '';
    first = 0;
    pressed = 0;
};
function equals() {
    switch (pressed) {
            case 'plus': return screen.value = +first + +screen.value;
            case 'minus': return screen.value = first - screen.value;
            case 'multiply': return screen.value = first * screen.value;
            case 'divide': return screen.value = first / screen.value;
            case 'exp': return screen.value = first ** screen.value;
        };
};
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        switch (number.id) {
            case 'num1': return screen.value += '1';
            case 'num2': return screen.value += '2';
            case 'num3': return screen.value += '3';
            case 'num4': return screen.value += '4';
            case 'num5': return screen.value += '5';
            case 'num6': return screen.value += '6';
            case 'num7': return screen.value += '7';
            case 'num8': return screen.value += '8';
            case 'num9': return screen.value += '9';
            case 'num0': return screen.value += '0';
            case 'numDot': return screen.value += '.';
            case 'square': return screen.value = screen.value ** 2;
            case 'sqrt': return screen.value = Math.sqrt(screen.value);
            case 'equals': return equals();
            case 'clear': return screen.value = '';
            case 'reset': return reset();
        };
    });
});
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        first = screen.value;
        screen.value = '';
        pressed = button.id;
    });
});