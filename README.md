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
  add7.check('number','3');  //will throw an error
````

### options:

1. Multiple argumets checks
2. Create from your funciton new safe functions with built-in checks

Read Api_and_example.js for more details.
