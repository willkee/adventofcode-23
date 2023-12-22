const sumArray = (array) => array.reduce((acc, num) => acc + num, 0);

const GCD = (a, b) => {
	a = Math.abs(a);
	b = Math.abs(b);

	if (b > a) [a, b] = [b, a];
	while (true) {
		if (b === 0) return a;
		a %= b;
		if (a === 0) return b;
		b %= a;
	}
};
module.exports = { sumArray, GCD };
