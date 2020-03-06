console.log('Strarting the app.');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');

const argv = yargs
     .command('add','add new note', {
         title:{
             describe: 'Title of the note.',
             demand: true,
             alias: 't'
         },
         body:{
             describe: 'Content of the note.',
             demand: true,
             alias: 'b'
         }
     })
     .command('list','list of all notes.')
     .command('remove','Remove a specific note.',{
         title:{
             describe: 'title of the note.',
             demand: true,
             alias: 't'
         }
     })
     .command('read','Reading a specific note.',{
        title:{
            describe: 'title of the note.',
            demand: true,
            alias: 't'
        }
     })
     .help()
     .argv;
//let command = process.argv[2];
let command = argv._[0];
//console.log(command);
//console.log(argv);

let printBodyAndTitle = (object) =>{
    console.log('_______');
    console.log(`Title : ${object.title}`);
    console.log(`Message : ${object.body}`);
};

if(command === 'add'){
    //console.log('Adding new note');
    let note = notes.addNotes(argv.title,argv.body);
    if (note){
        console.log('New note has been created.');
        printBodyAndTitle(note);
    }else{
        console.log('A note is already created with the very same title.');
    }
} else if(command === 'list'){
    //console.log('Listing all notes.');
    let allNotes = notes.allNotes();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(element => printBodyAndTitle(element));
} else if(command === 'read'){
    //console.log('Reading note.');
    let note = notes.readNote(argv.title);
    if (note){
        console.log(`Topic is found to read.`);
        printBodyAndTitle(note);
    } else {
        console.log('There is no such a note to read.');
    }
} else if(command === 'remove'){
    //console.log('Removing note.');
    let note = notes.removeNote(argv.title);
    let message = note ? 'Note removed successfully!' : 'There is no such a note to remove.';
    console.log(message);
    // if(note){
    //     console.log('Removing the note sucessfully!');
    // }else{
    //     console.log('There is no such a note to remove from the file.')
    // }
} else{
    console.log('Unauthorized command.');
}