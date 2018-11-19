var packageJsonChanged = require('./index');

console.log(packageJsonChanged.check());
console.log(packageJsonChanged.update());
console.log(packageJsonChanged.check());
