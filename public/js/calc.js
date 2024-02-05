const calc = document.querySelector('#calc');
const screen = document.querySelector('.screen');
let pressed = '';
let first = '';

function reset() {
    screen.value = '';
    first = '';
    pressed = '';
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

calc.addEventListener('click', (e) => {
	if (!e.target.id && !e.target.className) return;
	if (e.target.className == 'number') return screen.value += e.target.textContent;
	switch (e.target.id) {
		case 'numDot': return screen.value.includes('.') ? false : screen.value += '.';
		case 'square': return screen.value = screen.value ** 2;
		case 'sqrt': return screen.value = Math.sqrt(screen.value);
		case 'clear': return screen.value = '';
		case 'equals': return equals();
		case 'reset': return reset();
		default:
			first = screen.value;
			screen.value = '';
			pressed = e.target.id;
	};
});
