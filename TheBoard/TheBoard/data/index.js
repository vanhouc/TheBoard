﻿( function ( data ) {

    var seedData = require( "./seedData" );
    var database = require( "./database" );

    data.getNoteCategories = function ( next ) {
        database.getDb( function ( err, db ) {
            if ( err ) {
                next( err, null );
            }
            else {
                db.notes.find().toArray( function ( err, results ) {
                    if ( err ) {
                        next( err, null );
                    }
                    else {
                        next( null, results );
                    }
                });
            }
        });
    };
    function seedDatabase() {
        database.getDb( function ( err, db ) {
            if ( err ) {
                console.log( "Failed to seed database: " + err );
            }
            else {
                // test to see if data exists
                db.notes.count( function ( err, count ) {
                    if ( err ) {
                        console.log( "Failed to retreive database count" );
                    }
                    else {
                        if ( count === 0 ) {
                            console.log( "Seeding the Database..." );
                            seedData.initialNotes.forEach( function ( item ) {
                                db.notes.insert( item, function ( err ) {
                                    if ( err ) console.log( "Failed to insert note into database" );
                                });
                            });
                        }
                        else {
                            console.log( "Database already seeded" );
                        }
                    }
                });
            }
        });
    }

    seedDatabase();

})( module.exports );