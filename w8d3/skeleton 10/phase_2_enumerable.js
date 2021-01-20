

Array.prototype.myEach = function(cb) {
    for (let i = 0; i < this.length; i++){
        cb(this[i]);
    };
};

let add = function(x,y){
    return x + y;
};
// console.log([1,2,3].myEach(add));

Array.prototype.myMap = function(cb) {
    let mapped = [];
    this.myEach(function(ele) {
        let result = cb(ele);
        mapped.push(result);
    });
    return mapped
};

Array.prototype.myMap2 = function (cb) {
    let mapped = [];
    const innerFunction = function (ele) {
        mapped.push(cb(ele))
    };

    this.myEach(innerFunction);
    return mapped;
};

[1,2,3].myMap2(myDoubler)
console.log(arr)
// console.log([1,2,3].myMap(add));

Array.prototype.myReduce = function(cb,initial){
    let array = this;
    if (initial === undefined) {
        initial = this[0];
        array = array.slice(1);
    };
    let result = initial;
    array.myEach(el => result=cb(result, el));
    return result;
};

console.log([1,2,3].myReduce(add, 10));