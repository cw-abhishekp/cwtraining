//map filter is mainly used to transform the array entirely means what we want to do the entire array pass the function it will does all the work.

const arr = [1,2,3,4]

// here x refers to the each value of the array
function double(x){
    return x*2;
}

console.log(arr)
console.log(arr.map((x)=> x.toString(2))) // this will transform to the binary
console.log(arr.map(double))


// filter function is used to filter out the value
// const filt = arr.filter((x)=>x%2) when single line then we can directly do that this 
const filt = arr.filter((x)=>{
    return x%2;
})
console.log(filt)

// reduce function should be where it takes all the values of the array and comes up with the single value so it reduces the array to single value not arr size
// here we can pass two parameters one is acc which is total or final value and curr represents the curr index value so we can do that get value
const redmaxvalue = arr.reduce(function(acc,curr){
    acc = Math.max(acc,curr);
    return acc;
},0)

console.log(redmaxvalue)

