let val = 1;
const getData = ()=>{
    console.log("This is a function whenver key pressed "+(val++))
}


// this is the debounce function that we customely write so that it has the greater performance 
const debounce = (fun,time)=>{
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun(this,args)  
        }, time);
    }
}

// so what this is doing ki calling function after every certain time and then in debounce if diff greater than 300 sec
function throttle(fn, time) {
  let last = 0;

  return function (...args) {
    const now = Date.now();
    if (now - last >= time) {
      last = now;
      fn.apply(this, args);
    }
  };
}


const functionDebounce = debounce(getData,300);