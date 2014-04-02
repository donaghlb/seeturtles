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

// create functions for getting data from the tables
stdb.getNests = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM nests', [], successHandler, stdb.onError );
	});
};

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

// create functions for deleting data
stdb.deleteNest = function( id ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'DELETE FROM nests WHERE id = ?',
			[ id ],
			stdb.onSuccess,
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
				nestlist += '<li><a href="#nest?id=' + rs.rows.item(i).id + '">' + rs.rows.item(i).name + '</a></li>';
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
