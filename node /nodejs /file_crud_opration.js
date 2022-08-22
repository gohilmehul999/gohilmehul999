const { log } = require('console');
const fs = require('fs');


// file module directories create
// fs.mkdirSync('filemodule_directory');


// file module file create
// fs.writeFileSync('./filemodule_directory/filemodule_file.txt','file craeted');



// file module file add file content in file
// fs.appendFileSync('./filemodule_directory/filemodule_file.txt',' append file data');


// // file module file data read without buffer and with buffer
//  const read = fs.readFileSync('./filemodule_directory/filemodule_file.txt','utf-8');
//  console.log(read);

//  const read = fs.readFileSync('./filemodule_directory/filemodule_file.txt');
// console.log(read.toString());




// file module rename the file name 
// fs.renameSync('./filemodule_directory/filemodule_file.txt','./filemodule_directory/rename_file.txt')




// file module file delete
// fs.unlinkSync('./filemodule_directory/rename_file.txt');



// file module remove directory
// fs.rmdirSync('filemodule_directory');