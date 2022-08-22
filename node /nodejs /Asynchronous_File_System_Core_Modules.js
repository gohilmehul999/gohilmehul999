const { log } = require('console');
const fs = require('fs');


// file module directories create
//  fs.mkdir('filemodule_directory',(err) => {
//     console.log('directory created');
//  });


// file module file create
// fs.writeFile('./filemodule_directory/filemodule_file.txt','file created',(err) => {
//     console.log('file created');
//  });



// file module file add file content in file
// fs.appendFile('./filemodule_directory/filemodule_file.txt',' append file data',(err) => {
//     console.log('file append');
//  });


 // file module file data read without buffer and with buffer
// const read = fs.readFile('./filemodule_directory/filemodule_file.txt','utf-8',(err,data) => {
//     console.log('file complate  readding');
//     console.log(data);
//  });


//   const read = fs.readFile('./filemodule_directory/filemodule_file.txt',(err,data) => {
//         console.log('file complate  readding');
//         console.log(data.toString());
//     });





// file module rename the file name 
//  fs.rename('./filemodule_directory/filemodule_file.txt','./filemodule_directory/rename_file.txt',(err,data) => {
//             console.log('file rename ');});




// file module file delete
// fs.unlink('./filemodule_directory/rename_file.txt',(err,data) => {
//             console.log('file deleted');});



// file module remove directory
// fs.rmdir('filemodule_directory',(err,data) => {
//             console.log('directory remove');});