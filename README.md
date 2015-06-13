# DataTypes and arguments checker

call .check() upon any function, and pass a string or a function to see if your arguments pass this test, otherwise it will throw an error. 

This makes javascript functions to accept static types rather than dynamic, and reduces run-time bugs

### example:

````
function add7(x){
  return x + 7;
}
 
//desired behavior:
add7(3); //returns -> 10
 
//undesired:
add7('3'); //returns -> "37"

//solution:
  add7.check('number',3);  //returns -> 10, just as normal add7()
  add7.check('number','3');  //throws -> Uncaught TypeError: 3 is not of type number 
````

### options:

##### predefined checkers:
 
````
function isInteger(data){
  return data === parseInt(data, 10)
}
add7.check(isInteger,3.4); // Uncaught TypeError: 3.4 is not passing isInteger check
````


##### Multiple argumets checks

````
someFunc(['boolean', Array.isArray, isInteger], true, [23,4,5], 3);
````

##### Create a new safe function from your unsafe function, with built-in checks

````
add7OnlyToInts = add7.check.add(isInteger)
add7OnlyToInts(3.4) //throws
````

##### Curry-style your checks:
````
add7.check.add(isInteger)(3.4)
````

#### Read Api_and_example.js for more details.
