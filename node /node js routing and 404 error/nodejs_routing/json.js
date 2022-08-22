const biodata = {
    name:'mehul',
    age:26,
    channel:'none'
};
const jsondata = JSON.stringify(biodata);
// console.log(jsondata);
const objdata = JSON.parse(jsondata);
console.log(objdata.name); 
// console.log(__dirname)
// console.log(__filename)




