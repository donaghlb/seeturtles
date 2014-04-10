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
		tx.executeSql( "CREATE TABLE IF NOT EXISTS turtles ( id INTEGER PRIMARY KEY AUTOINCREMENT, dob TEXT, gender TEXT DEFAULT F, species_id INTEGER, birth_lat REAL, birth_lon REAL, deceased INTEGER DEFAULT 0 )", [] );
		// create the sitings table
		tx.executeSql( "CREATE TABLE IF NOT EXISTS sitings ( id INTEGER PRIMARY KEY AUTOINCREMENT, turtle_id INTEGER, condition TEXT, is_injured INTEGER DEFAULT 0, sited_on TEXT, lat REAL, lon REAL )", [] );
	}, function( e ) { console.log( e ); } );
};

// create functions for adding NEW data to tables
stdb.addNests = function( name, discovery, predicted, actual, lat, lon ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'INSERT INTO nests ( name, discovery_date, predicted_delivery, actual_delivery, nest_lat, nest_lon ) VALUES ( ?, ?, ?, ?, ?, ? )',
			[ name, discovery, predicted, actual, lat, lon ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};

stdb.addObservations = function( nest_id, osbserved, temp, cond ) {
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
		tx.executeSql( 'INSERT INTO turtles ( id, dob, gender, species_id, birth_lat, birth_lon, deceased ) VALUES ( ?, ?, ?, ?, ?, ?, ? )',
			[ id, dob, gender, species_id, birth_lat, birth_lon, deceased ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.addSitings = function( turtle_id, condition, is_injured, sited_on, lat, lon ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'INSERT INTO observations ( turtle_id, condition, is_injured, sited_on, lat, lon ) VALUES ( ?, ?, ?, ?, ?, ? )',
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
stdb.getNest = function( id, successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM nests WHERE id = ?', [ id ], successHandler, stdb.onError );
	});
};
stdb.getObservations = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM observations', [], successHandler, stdb.onError );
	});
};
stdb.getObservation = function( id, successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM observations WHERE id = ?', [ id ], successHandler, stdb.onError );
	});
};
stdb.getSpecies = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM species', [], successHandler, stdb.onError );
	});
};
stdb.getSpecie = function( id, successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM species WHERE id = ?', [ id ], successHandler, stdb.onError );
	});
};
stdb.getTurtles = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM turtles', [], successHandler, stdb.onError );
	});
};
stdb.getTurtle = function( id, successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM turtles WHERE id = ?', [ id ], successHandler, stdb.onError );
	});
};
stdb.getSitings = function( successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM sitings', [], successHandler, stdb.onError );
	});
};
stdb.getSiting = function( id, successHandler ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'SELECT * FROM sitings WHERE id = ?', [ id ], successHandler, stdb.onError );
	});
};


// create functions for updating data
stdb.updateNests = function( name, discovery, predicted, actual, lat, lon ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET name = ?, discovery_date = ?, predicted_delivery = ?, actual_delivery = ?, nest_lat = ?, nest_lon = ? WHERE id = ?',
			[ name, discovery, predicted, actual, lat, lon ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.updateObservation = function( nest_id, observed, temp, cond ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET nest_id = ?, observed_on = ?, temperature = ?, condition = ? WHERE id = ?',
			[ nest_id, observed, temp, cond ],
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
stdb.updateTurtles = function( id, dob, gender, sepcies_id, birth_lat, birth_lon, deceased ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET name = ?, dob = ?, gender = ?, species_id = ?, birth_lat = ?, birth_lon = ?, deceased = ? WHERE id = ?',
			[ id, dob, gender, sepcies_id, birth_lat, birth_lon, deceased ],
			stdb.onSuccess,
			stdb.onError
		);
	});
};
stdb.updateSitings = function( turtle_id, condition, is_injured, sited_on, lat, lon ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET turtle_id = ?, condition = ?, is_injured = ?, sited_on = ?, at = ?, lon = ? WHERE id = ?',
			[ turtle_id, condition, is_injured, sited_on, lat, lon],
			stdb.onSuccess,
			stdb.onError
		);
	});
};

// create functions for deleting data
stdb.deleteNest = function( id ) {
	stdb.db.transaction( function( tx ) {
		// first get rid of the nest
		tx.executeSql( 'DELETE FROM nests WHERE id = ?',
			[ id ],
			null,
			stdb.onError
		);
		// next get rid of any associated observations
		tx.executeSql( 'DELETE FROM observations WHERE nest_id = ?',
			[ id ],
			stdb.onSuccess,
			stdb.onError
		);
		//get rid of any associated species
		tx.executeSql( 'DELETE FROM species WHERE nest_id = ?',
			[ id ],
			stdb.onSuccess,
			stdb.onError
		);
		//get rid of any associated turtles
		tx.executeSql( 'DELETE FROM turtles WHERE nest_id = ?',
			[ id ],
			stdb.onSuccess,
			stdb.onError
		);
		//get rid of any assocociated sitings 
		tx.executeSql( 'DELETE FROM sitings WHERE nest_id = ?',
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
	var displayTurtles, updateSpeciesSelect, displayTurtle, displayTurtleEditor;

	// display a list of turtles
	displayTurtles = function( tx, rs ) {
		var turtlelist;
		if ( rs.rows.length > 0 ) {
			turtlelist  = '<ul data-role="listview" data-inset="true">';
			for ( i = 0; i < rs.rows.length; i++ ) {
				turtlelist += '<li style="position:relative;">';
				turtlelist += rs.rows.item(i).id;
				turtlelist += '<span style="position:absolute;right:4px;top:-3px;" data-role="controlgroup" data-type="horizontal" data-mini="true">';
				turtlelist += '<a href="#turtle?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-eye ui-btn-icon-notext ui-corner-all">View</a>';
				turtlelist += '<a href="#editturtle?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all">Edit</a>';
				turtlelist += '<a href="#deleteturtle?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</a>';
				turtlelist += '</span>';
				turtlelist += '</li>';
			}
			turtlelist += '</ul>';
			$( '#track #turtlelist' ).html( turtlelist ).trigger( 'create' );
		} else {
			$( '#track #turtlelist' ).html( '<p>No turtles have been added to the database yet. Click the button below to add one.</p>' );
		}
	};

	// display an individual turtle
	displayTurtle = function( tx, rs ) {
		$( '#turtle h1'   ).html( 'Turtle: ' + rs.rows.item(0).id );
		$( '#tage'        ).html( rs.rows.item(0).dob );
		$( '#tgender'     ).html( rs.rows.item(0).gender );
		$( '#tspecies_id' ).html( rs.rows.item(0).species_id );
		$( '#tbirth_lat'  ).html( rs.rows.item(0).birth_lat );
		$( '#tbirth_lon'  ).html( rs.rows.item(0).birth_lon );

	};

	displayTurtleEditor = function( tx, rs ) {
		var t = rs.rows.item(0);
		$( '#editturtle #id'         ).val( t.id );
		$( '#editturtle #dob'        ).val( t.dob );
		$( '#editturtle #gender'     ).val( t.gender );
		$( '#editturtle #species_id' ).val( t.species_id );
		$( '#editturtle #birth_lat'  ).val( t.birth_lat );
		$( '#editturtle #birth_lon'  ).val( t.birth_lon );
		$( '#editturtle #deceased'   ).prop( "checked", t.deceased);

	}
// handle form submissions
	$( '#turtles_submit' ).on( 'click', function( e ) {
		// don't actually try to follow the link
		e.preventDefault();
		
		// get the data from the fields 
		var id   = $( '#turtles #id'         ).val(),
			dob  = $( '#turtles #dob'        ).val(),
			gen  = $( '#turtles #gender'     ).val(),
			spec = $( '#turtles #species_id' ).val(),
			lat  = $( '#turtles #birth_lat'  ).val(),
			lon  = $( '#turtles #birth_lon'  ).val(),
			dec  = $( '#turtles #deceased'   ).prop( 'checked' ) ? 1 : 0;

		// try to add it to the database
		stdb.addTurtles( id, dob, gen, spec, lat, lon, dec );
		
		// go back to the list of turtles page
		$.mobile.changePage( '#track' );
	});

	updateSpeciesSelect = function( tx, rs ) {
		if ( rs.rows.length > 0 ) {
			var options;
			for ( i = 0; i < rs.rows.length; i++ ) {
				options += '<option value="' + rs.rows.item(i).id + '">' + rs.rows.item(i).name + '</option>';
			}
			$( '#species_id' ).html( options );
		} else {
			// uh-oh! no species in the DB!!!
			$( '#nospeciesDialog' ).popup( "open" );
		}
	};
	
	// store the object id in localStorage when people click a link that's got a data-objectid attribute
	$( 'a' ).on( 'click', function() {
		console.log( $( this ).prop( 'data-objectid' ) );
		localStorage.objectid = $( this ).prop( 'data-objectid' );
	});

	// set up parameter passing between pages
	$.mobile.paramsHandler.addPage( 'turtle', [ 'id' ], [], function( t ) { stdb.getTurtle( t.id, displayTurtle ); } );
	$.mobile.paramsHandler.addPage( 'editturtle', [ 'id' ], [], function( t ) {
		stdb.getSpecies( updateSpeciesSelect );
		stdb.getTurtle( t.id, displayTurtleEditor ); 
	} );
	$.mobile.paramsHandler.init();
	// handle page transitions
	$( '#track'   ).on( 'pagebeforeshow', function( e ) { stdb.getTurtles( displayTurtles      ); } );
	$( '#turtles' ).on( 'pagebeforeshow', function( e ) { stdb.getSpecies( updateSpeciesSelect ); } );
});

	//possible deletion


$( document ).ready( function() {
	var displayNests;
	
	displayNests = function( tx, rs ) {
		var nestlist;
		if ( rs.rows.length > 0 ) {
			nestlist  = '<ul data-role="listview" data-inset="true">';
			for ( i = 0; i < rs.rows.length; i++ ) {
				nestlist += '<li style="position:relative;">';
				nestlist += rs.rows.item(i).name;
				nestlist += '<span style="position:absolute;right:4px;top:-3px;" data-role="controlgroup" data-type="horizontal" data-mini="true">';
				nestlist += '<a href="#nest?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-eye ui-btn-icon-notext ui-corner-all">View</a>';
				nestlist += '<a href="#editnest?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all">Edit</a>';
				nestlist += '<a href="#deletenest?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</a>';
				nestlist += '</span>';
				nestlist += '</li>';
			}
			nestlist += '</ul>';
			$( '#nests #nestlist' ).html( nestlist ).trigger( 'create' );
		} else {
			$( '#nests #nestlist' ).html( '<p>No nests have been added to the database yet. Click the button below to add one.</p>' );
		}
	};

		// display an individual turtle
	displayNest = function( tx, rs ) {
		$( '#nest h1' ).html( 'Nest: ' + rs.rows.item(0).name );
		$( '#ndis'    ).html( rs.rows.item(0).date_discovery );
		$( '#npre'    ).html( rs.rows.item(0).predicted_delivery );
		$( '#nact'    ).html( rs.rows.item(0).actual_delivery );
		$( '#nlat'    ).html( rs.rows.item(0).nest_lat );
		$( '#nlon'    ).html( rs.rows.item(0).nest_lon );
		
	};

	displayNestEditor = function( tx, rs ) {
		var t = rs.rows.item(0);
		$( '#editnest #name'                     ).val( t.name );
		$( '#editnest #date_discovery'           ).val( t.date_discovery );
		$( '#editnest #predicted_delivery'       ).val( t.predicted_delivery );
		$( '#editnest #actual_delivery'          ).val( t.actual_delivery  );
		$( '#editnest #nest_lat'                 ).val( t.nest_lat  );
		$( '#editnest #nest_lon'                 ).val( t.nest_lon  );

	}
	
	// handle form submissions
	$( '#plot_submit' ).on( 'click', function( e ) {
		// don't actually try to follow the link
		e.preventDefault();
		
		// get the data from the fields
		var name      = $(   '#plot #name'                    ).val(),
			discovery = $(   '#plot #date_discovery'          ).val(),
			predicted = $(   '#plot #predicted_delivery'      ).val(),
			actual    = $(   '#plot #actual_delivery'         ).val(),
			lat       = $(   '#plot #nest_lat'                ).val(),
			lon       = $(   '#plot #nest_lon'                ).val();
			
		// try to add it to the database
		stdb.addNest( name, discovery, predicted, actual, lat, lon );

		// go back to the list of nests page
		$.mobile.changePage( '#nests' );
	});

	// store the object id in localStorage when people click a link that's got a data-objectid attribute
	$( 'a' ).on( 'click', function() {
		console.log( $( this ).prop( 'data-objectid' ) );
		localStorage.objectnid = $( this ).prop( 'data-objectid' );
	});

	// set up parameter passing between pages
	$.mobile.paramsHandler.addPage( 'nest', [ 'id' ], [], function( t ) { stdb.getNest( t.id, displayNest ); } );
	$.mobile.paramsHandler.addPage( 'editnest', [ 'id' ], [], function( t ) {
		stdb.getNest( t.id, displayNestEditor ); 
	} );
	$.mobile.paramsHandler.init();

	// handle page transitions
	$( '#nests' ).on( 'pagebeforeshow', function( e ) { stdb.getNests( displayNests ); });
});

$( document ).ready( function() {
	var displaySpecies;
	
	displaySpecies = function( tx, rs ) {
		var specieslist;
		if ( rs.rows.length > 0 ) {
			specieslist  = '<ul data-role="listview" data-inset="true">';
			for ( i = 0; i < rs.rows.length; i++ ) {
				specieslist += '<li style="position:relative;">';
				specieslist += rs.rows.item(i).name;
				specieslist += '<span style="position:absolute;right:4px;top:-3px;" data-role="controlgroup" data-type="horizontal" data-mini="true">';
				specieslist += '<a href="#specie?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-eye ui-btn-icon-notext ui-corner-all">View</a>';
				specieslist += '<a href="#editspecies?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all">Edit</a>';
				specieslist += '<a href="#deletespecies?id=' + rs.rows.item(i).id + '" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</a>';
				specieslist += '</span>';
				specieslist += '</li>';
			}
			specieslist += '</ul>';
			$( '#species #specieslist' ).html( specieslist ).trigger( 'create' );
		} else {
			$( '#species #specieslist' ).html( '<p>No species have been added to the database yet. Click the button below to add one.</p>' );
		}
	};
	
	// handle form submissions
	$( '#species_submit' ).on( 'click', function( e ) {
		// don't actually try to follow the link
		e.preventDefault();
		
		// get the data from the fields
		var name         = $( '#addspecies #name' ).val(),
			description  = $( '#addspecies #description'  ).val();
			
		// try to add it to the database
		stdb.addSpecies( name, description );
		
		// go back to the list of nests page
		$.mobile.changePage( '#species' );
	});
	
	// handle page transitions
	$( '#species' ).on( 'pagebeforeshow', function( e ) { stdb.getSpecies( displaySpecies ); });
});
