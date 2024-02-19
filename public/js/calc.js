const calc = document.querySelector('#calc');
const screen = document.querySelector('.screen');
class Calculator {
    pressed = '';
    first = '';
    constructor(calc, screen) {
        this.screen = screen;
        calc.addEventListener('click', this.onClick.bind(this), false);
    }
    onClick(e) {
        if (e.target.id == 'calc') return;
	if (e.target.className == 'number') return this.screen.value += e.target.textContent;
	    switch (e.target.id) {
		case 'numDot': return this.screen.value.includes('.') ? false : this.screen.value += '.';
		case 'square': return this.screen.value = this.screen.value ** 2;
		case 'sqrt': return this.screen.value = Math.sqrt(this.screen.value);
		case 'clear': return this.screen.value = '';
		case 'equals': return this.equals();
		case 'reset': return this.reset();
		default:
			this.first = this.screen.value;
			this.screen.value = '';
			this.pressed = e.target.id;
	    };
    };
    reset() {
        this.screen.value = '';
        this.first = '';
        this.pressed = '';
    };
	equals() {
        switch (this.pressed) {
            case 'plus': return this.screen.value = +this.first + +this.screen.value;
            case 'minus': return this.screen.value = this.first - this.screen.value;
            case 'multiply': return this.screen.value = this.first * this.screen.value;
            case 'divide': return this.screen.value = this.first / this.screen.value;
            case 'exp': return this.screen.value = this.first ** this.screen.value;
        };
    };
}

new Calculator(document.querySelector('#calc'), document.querySelector('.screen'))
