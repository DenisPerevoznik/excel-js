import "./module"
import "./scss/index.scss"
console.log("Index.js working!");

async function start(){
    return await Promise.resolve('async working!');
}

start().then(console.log)