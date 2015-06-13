function getFunctionName(fun){
  return Function.prototype.toString.call(fun)
          .match(/function ([^\(]+)/)[1] || 'anonymous function';
}
 
/**
 * executes the 'this' function after type checking, throws an error if not passing
 *
 * @arguments {*} data to be examined - 4th argument after checkers should pass checkers[4] test
 * @param checkers {Array<String|Function> | String | Function}
 */
Function.prototype.check = function(checkers){
 //debugger;
  var args = Array.prototype.slice.call(arguments,1);
  //adds the ability to send single checker without array
  checkers = Array.isArray(checkers)? checkers:[checkers];
 
  checkers.forEach(function (checker,i,a) {
    var checkerType = typeof checker;
    switch (checkerType){
      case 'string':
        checker=checker.toLowerCase();
        if(checker === 'array'){console.warn('use Array.isArray or Object.prototype.toString.call to type-check arrays')}
        if(checker !== typeof args[i]){
          throw new TypeError(args[i] + ' is not of type: ' + checker)
        }
        break;
      case 'function':
        if(!checker(args[i])){
          throw new TypeError(args[i] + ' is not passing ' + getFunctionName(checker) + ' check');
        }
        break;
      default :
        throw new TypeError('invalid checker');
    }
  });
 
  return this.apply(null,args)
};
 
/**
 * return function with built-in checks
 * useful also in curry style: someFunc.check.add(checkers...)(arguments...);
 *
 * @arguments checkers {String|Function}
 * @returns {function(this:Function.prototype.check)}
 */
Function.prototype.check.add = function(){
  var checkers = Array.prototype.slice.call(arguments);
  return function(){
    var args = Array.prototype.slice.call(arguments);
    return this.check.apply(this,[checkers].concat(args));  //checkers inside array, and than all data args
  }.bind(this)
};
