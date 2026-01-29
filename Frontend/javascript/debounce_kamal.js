const cl = ()=>{
    console.log("callack executed");
}

const debounce = (fun,delay)=>{
    let timer=null;
    console.log("typed...."+fun);
    return function(...args){
        if(timer!=null) clearTimeout(timer);
        timer = setTimeout(()=>{
            console.log("function called....");
            fun.apply(this,args)
        },delay)
    }
}

// const func = debounce(cl,1000)

