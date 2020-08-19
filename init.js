#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

const ignoreFileList = ['.env', 'package-lock.json'];
const ignoreFolderList = ['node_modules', '.git'];

function copyFileSync( source, target ) {
    if (ignoreFileList.includes(path.basename(source))) {
      return
    }

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }


    // console.log('writing', targetFile);
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target, depth = 0 ) {
    if (ignoreFolderList.includes(path.basename(source))) {
      return
    }

    console.log(source, target, depth)

    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = depth === 0 ? target : path.join( target, path.basename( source ) );

    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder, depth + 1);
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

copyFolderRecursiveSync(__dirname, path.join(process.cwd(), '.'));
// console.log(__dirname, path.join(process.cwd(), '.'))
