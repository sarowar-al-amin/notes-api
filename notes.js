console.log('Starting notes.js file');
// console.log(module);
const fs = require('fs');


// fetchNotes is used to read data from the file. return Data in json format.
let fetchNotes = () => {
    try{
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }catch(err){
        // console.log(err);
        // console.error();
        return [];
    }
};

// Save node function is used to write in the file. It returns nothing.
let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNotes = (title,body) =>{
   // console.log('Adding notes with title: ', title, ' and body: ',body);
   let notes = fetchNotes();
   let note = {
       title,
       body
   };

   let duplicateNote = notes.filter(note => note.title === title);

   if(duplicateNote.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
   }

};

let readNote = (title) => {
    //console.log('Reading node with title :', title);  
    let notes = fetchNotes();
    let duplicateNote = notes.filter(note => note.title === title); 
    return duplicateNote[0];
};

let allNotes = () =>{
    //console.log('Showing all notes.');
    return fetchNotes();
};

let removeNote = (title) =>{
    //console.log('Removing node with title :', title);
    let notes = fetchNotes();
    let filterNotes = notes.filter(note => note.title !== title);
    saveNotes(filterNotes);

    return notes.length !== filterNotes.length;
};

module.exports = {
    addNotes,
    readNote,
    allNotes,
    removeNote
};