// global variables and functions
// create a variable to hold database related stuff
var stdb = {}; stdb.db = null;

// function to open the database
stdb.open = function() {
	var size = 1024 * 1024 * 5; // 5MB
	stdb.db = openDatabase( 'STDB', '1.0', 'See Turtles Database', size );
};

// success and error functions for database queries
stdb.onSuccess = function() {
	// figure out what to do here...
	alert( "Success!" );
};

stdb.onError = function( tx, e ) {
	// figure out what to do here...
	console.log( e.message );
};

// create schema for our database
stdb.createSchema = function() {
	// start a transaction
	stdb.db.transaction( function( tx ) {
		// create the nests table
		tx.executeSql( "CREATE TABLE IF NOT EXISTS nests ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, discovery_date TEXT, predicted_delivery TEXT, actual_delivery TEXT, nest_lat REAL, nest_lon REAL )", [] );
		// create the observations table
		tx.executeSql( "CREATE TABLE IF NOT EXISTS observations ( id INTEGER PRIMARY KEY AUTOINCREMENT, nest_id INTEGER, observed_on TEXT, temperature REAL, condition TEXT )", [] );
		// create the species table
		tx.executeSql( "CREATE TABLE IF NOT EXISTS species ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, description TEXT )", [] );
		// create the turtles table
		tx.executeSql( "CREATE TABLE IF NOT EXISTS turtles ( id INTEGER, dob TEXT, gender TEXT DEFAULT F, species_id INTEGER, birth_lat REAL, birth_lon REAL, deceased INTEGER DEFAULT 0 )", [] );
		// create the sitings table
		tx.executeSql( "CREATE TABLE IF NOT EXISTS sitings ( id INTEGER PRIMARY KEY AUTOINCREMENT, turtle_id INTEGER, condition TEXT, is_injured INTEGER DEFAULT 0, sited_on TEXT, lat REAL, lon REAL )", [] );
	}, function( e ) { console.log( e ); } );
};

// create functions for adding NEW data to tables
stdb.addNest = function( name, discovery, predicted, actual, lat, lon ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'INSERT INTO nests ( name, discovery_date, predicted_delivery, actual_delivery, nest_lat, nest_lon ) VALUES ( ?, ?, ?, ?, ?, ? )',
			[ name, discovery, predicted, actual, lat, lon ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};

stdb.addObservation = function( nest_id, osbserved, temp, cond ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'INSERT INTO observations ( nest_id, observed_on, temperature, condition ) VALUES ( ?, ?, ?, ? )',
			[ nest_id, osbserved, temp, cond ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.addSpecies = function( name, description ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'INSERT INTO species ( name, description ) VALUES ( ?, ? )',
			[ name, description ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.addTurtles = function( id, dob, gender, species_id, birth_lat, birth_lon, deceased ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'INSERT INTO species ( id, dob, gender, species_id, birth_lat, birth_lon, deceased ) VALUES ( ?, ?, ?, ?, ?, ? )',
			[ id, dob, gender, species_id, birth_lat, birth_lon, deceased ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.addSitings = function( turtle_id, condition, is_injured, sited_on, lat, lon ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'INSERT INTO species ( turtle_id, condition, is_injured, sited_on, lat, lon ) VALUES ( ?, ?, ?, ?, ?, ? )',
			[ turtle_id, condition, is_injured, sited_on, lat, lon ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
// create functions for getting data from the tables
stdb.getNests = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM nests', [], successHandler, stdb.onError );
	});
};
<<<<<<< HEAD
stdb.getNests = function( successHandler ) {
=======

stdb.getNest = function( id, successHandler ) {
>>>>>>> 1f3e74f5c0128491d4faab7b79377b811be6b3d4
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM nests WHERE id = ?', [ id ], successHandler, stdb.onError );
	});
};
<<<<<<< HEAD
stdb.getObservation = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM observations', [], successHandler, stdb.onError );
	});
};
stdb.getObservation = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM observations WHERE id = ?', [ id ], successHandler, stdb.onError );
	});
};
stdb.getSpecies = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM species', [], successHandler, stdb.onError );
	});
};
stdb.getSpecies = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM species WHERE id = ', [ id ], successHandler, stdb.onError );
	});
};
stdb.getTurtles = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM turtles', [], successHandler, stdb.onError );
	});
};
stdb.getTurtles = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM turtles WHERE id = ', [ id ], successHandler, stdb.onError );
	});
};
stdb.getSitings = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM sitings', [], successHandler, stdb.onError );
	});
};
stdb.getSitings = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM sitings WHERE id = ', [ id ], successHandler, stdb.onError );
	});
};
=======

>>>>>>> 1f3e74f5c0128491d4faab7b79377b811be6b3d4
// create functions for updating data
stdb.updateNest = function( id,  name, discovery, predicted, actual, lat, lon ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET name = ?, discovery_date = ?, predicted_delivery = ?, actual_delivery = ?, nest_lat = ?, nest_lon = ? WHERE id = ?',
			[ name, discovery, predicted, actual, lat, lon, id ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.updateObservation = function( nest_id, osbserved, temp, cond ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET nest_id = ?, observed_on = ?, temperature = ?, condition = ? WHERE id = ?',
			[ nest_id, osbserved, temp, cond ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.updateSpecies = function( name, description ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET name = ?, description = ? WHERE id = ?',
			[ name, description ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.updateTurtles = function( id, dob, gender, species_id, birth_lat, birth_lon, deceased ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET id = ?, dob = ?, gender = ?, species_id = ?, birth_lat = ?, birth_lon = ?, deceased = ? WHERE id = ?',
			[ id, dob, species_id, birth_lat, birth_lon, deceased ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.updateSitings = function( turtle_id, condition, is_injured, sited_on, lat, lon ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET turtle_id = ?, condition = ?, is_injured = ?, sited_on = ?, lat = ?, lon = ? WHERE id = ?',
			[ turtle_id, condition, is_injured, sited_on, lat, lon ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
// create functions for deleting data
stdb.deleteNest = function( id ) {
	stdb.db.transaction( function( tx ) {
<<<<<<< HEAD
		//first get rid of the nest
=======
		// first get rid of the nest
>>>>>>> 1f3e74f5c0128491d4faab7b79377b811be6b3d4
		tx.executeSql( 'DELETE FROM nests WHERE id = ?',
			[ id ],
			null,
			stdb.onError
		);
		// next get rid of any associated observations
<<<<<<< HEAD
		tx.executeSql( 'DELETE FROM observations WHERE nest_id = ?')
			[ id ]
			stdb.onSuccess
			stdb.onError
		);
		// next get rid of any associated species 
		tx.executeSql( 'DELETE FROM species WHERE name = ?')
			[ id ]
			stdb.onSuccess
			stdb.onError
		);
		// next get rid of any associated turtles
		tx.executeSql( 'DELETE FROM turtles WHERE id = ?')
			[ id ]
			stdb.onSuccess
			stdb.onError
		);
		tx.executeSql( 'DELETE FROM sitings WHERE turtle_id = ?')
			[ id ]
			stdb.onSuccess
=======
		tx.executeSql( 'DELETE FROM observations WHERE nest_id = ?',
			[ id ],
			stdb.onSuccess,
>>>>>>> 1f3e74f5c0128491d4faab7b79377b811be6b3d4
			stdb.onError
		);
	});
};
// initialize the app
$( document ).on( 'mobileinit', function() {
	
	// initialize our database
	stdb.open();
	stdb.createSchema();
	
});

// code to run after the page has loaded
$( document ).ready( function() {
	var displayNests;
	
	displayNests = function( tx, rs ) {
		var nestlist;
		if ( rs.rows.length > 0 ) {
			nestlist  = '<ul data-role="listview" data-inset="true">';
			for ( i = 0; i < rs.rows.length; i++ ) {
				nestlist += '<li style="position:relative;">'
				nestlist += rs.rows.item(i).name;
				nestlist += '<span style="position:absolute;right:4px;top:-3px;" data-role="controlgroup" data-type="horizontal" data-mini="true">';
				nestlist += '<a href="#nest?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-eye ui-btn-icon-notex ui-corner-all">Edit</a>';
				nestlist += '<a href="#editnest?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-edit ui-btn-icon-notex ui-corner-all">Edit</a>';
				nestlist += '<a href="#deletenest?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-delete ui-btn-icon-notex ui-corner-all">Edit</a>;
				nestlist += '</span>';
				nestlist += '</li>';
	
			}
			nestlist += '</ul>';
			$( '#nests div[data-role="content"]' ).prepend( nestlist ).trigger( 'create' );
		} else {
			$( '#nests div[data-role="content"]' ).prepend( '<p>No nests have been added to the database yet. Click the button below to add one.</p>' );
		}
	};
	
	// handle form submissions
	$( '#plot_submit' ).on( 'click', function( e ) {
		// don't actually try to follow the link
		e.preventDefault();
		
		// get the data from the fields
		var name = $( '#plot #name' ).val(),
			lat  = $( '#plot #lat'  ).val(),
			lon  = $( '#plot #lon'  ).val(),
			disc = $( '#plot #disc' ).val(),
			pred = $( '#plot #pred' ).val(),
			act  = $( '#plot #act'  ).val();
			
		// try to add it to the database
		stdb.addNest( name, lat, lon, disc, pred, act );
		
		// go back to the list of nests page
		$.mobile.changePage( '#nests' );
	});
	
	// handle page transitions
	$( '#nests' ).on( 'pagebeforeshow', function( e ) { stdb.getNests( displayNests ); });
});
