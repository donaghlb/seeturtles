// global variables and functions
// create a variable to hold database related stuff
var stdb = {}, areYouSure; stdb.db = null;

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
stdb.addNest = function( name, discovery, predicted, actual, lat, lon ) {
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
stdb.addTurtles = function( id, dob, gen, speciesid, birthlat, birthlon, deceased ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'INSERT INTO turtles ( id, dob, gender, species_id, birth_lat, birth_lon, deceased ) VALUES ( ?, ?, ?, ?, ?, ?, ? )',
			[ id, dob, gen, speciesid, birthlat, birthlon, deceased ],
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
stdb.updateTurtles = function( id, dob, gen, speciesid, birthlat, birthlon, deceased ) {
	stdb.db.transaction( function( tx ) {
		tx.executeSql( 'UPDATE nests SET name = ?, dob = ?, gender = ?, species_id = ?, birth_lat = ?, birth_lon = ?, deceased = ? WHERE id = ?',
			[ id, dob, gen, speciesid, birthlat, birthlon, deceased ],
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
	});
};

stdb.deleteTurtle = function( id ) {
	stdb.db.transaction( function( tx ) {
		// first get rid of the nest
		tx.executeSql( 'DELETE FROM turtles WHERE id = ?',
			[ id ],
			null,
			stdb.onError
		
		);
	});
};

stdb.deleteSpecies = function( id ) {
	stdb.db.transaction( function( tx ) {
		// get rid of any turtles of this species
		/*
		//get rid of any associated turtles
		tx.executeSql( 'DELETE FROM turtles WHERE species_id = ?',
			[ id ],
			stdb.onSuccess,
			stdb.onError
		);
		*/
		//get rid of any associated species
		tx.executeSql( 'DELETE FROM species WHERE id = ?',
			[ id ],
			null,
			stdb.onError
		);
	});
}

// function to handle "Are you sure?" instances
areYouSure = function( msg, btxt, sureHandler ) {
	$( '#areYouSureDialog p'      ).text( msg  );
	$( '#areYouSureDialog a.sure' ).text( btxt ).on( 'click.sure', function() {
		sureHandler(); // this is what it does if they click the OK button
		$( this ).off( "click.sure" );
	});
	$.mobile.changePage( '#areYouSureDialog', 'pop', true, true );
};


// initialize the app
$( document ).on( 'mobileinit', function() {

	// initialize our database
	stdb.open();
	stdb.createSchema();

});

// code to run after the page has loaded

// TURTLE code
$( document ).ready( function() {

	var displayTurtles, updateSpeciesSelect, displayTurtle, displayTurtleEditor, deleteButtonClick;

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
				turtlelist += '<a href="#areYouSureDialog" data-turtlesid="' + rs.rows.item(i).id + '" class="delete-turtles ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</a>';
				turtlelist += '</span>';
				turtlelist += '</li>';
			}
			turtlelist += '</ul>';
			$( '#track #turtlelist' ).html( turtlelist ).trigger( 'create' );
			 //handle species deletion
			$( '.delete-turtles' ).on( 'click', deleteButtonClick );
		} else {
			$( '#track #turtlelist' ).html( '<p>Add a Turtle!</p>' );
		}
	};

	// display an individual turtle
	displayTurtle = function( tx, rs ) {
		var d = rs.rows.item(0).deceased ? "yes" : "no" ;
		$( '#turtle h1'   ).html( 'Turtle: ' + rs.rows.item(0).id );
		$( '#tage'        ).html( rs.rows.item(0).dob );
		$( '#tgender'     ).html( rs.rows.item(0).gender );
		$( '#tspecies_id' ).html( rs.rows.item(0).species_id );
		$( '#tbirth_lat'  ).html( rs.rows.item(0).birth_lat );
		$( '#tbirth_lon'  ).html( rs.rows.item(0).birth_lon );
		$( '#tdeceased'   ).html( d );

	};

	displayTurtleEditor = function( tx, rs ) {
		var t = rs.rows.item(0);
		$( '#editturtle #tid'         ).val( t.id );
		$( '#editturtle #tdob'        ).val( t.dob );
		$( '#editturtle #tgender'     ).val( t.gender );
		$( '#editturtle #tspecies_id' ).val( t.species_id );
		$( '#editturtle #tbirth_lat'  ).val( t.birth_lat );
		$( '#editturtle #tbirth_lon'  ).val( t.birth_lon );
		$( '#editturtle #tdeceased'   ).prop( "checked", t.deceased);

	};

	// handle form submissions
	$( '#turtles_submit' ).on( 'click', function( e ) {
		// don't actually try to follow the link
		e.preventDefault();

		// get the data from the fields
		var id         = $( '#turtles #id'         ).val(),
			dob        = $( '#turtles #dob'        ).val(),
			gen        = $( '#turtles #gender'     ).val(),
			speciesid  = $( '#turtles #species_id' ).val(),
			birthlat   = $( '#turtles #birth_lat'  ).val(),
			birthlon   = $( '#turtles #birth_lon'  ).val(),
			deceased   = $( '#turtles #deceased'   ).prop( 'checked' ) ? 1 : 0;

		// try to add it to the database
		stdb.addTurtles( id, dob, gen, speciesid, birthlat, birthlon, deceased );

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

	deleteButtonClick = function( e ) {
		// DON'T try to follow the link
		e.preventDefault();

		var sid = $( this ).attr( 'data-turtlesid' );

		// make sure it's not an accident
		areYouSure( 'Deleting a Turtle is permanent!', 'Delete', function() {
			// if they say yes
			// delete the nest
			stdb.deleteTurtle( sid );
			// get the remaining species and redraw the species list
			stdb.getTurtles( displayTurtles );
		});
	};

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

// NEST code
$( document ).ready( function() {
	var displayNests, displayNest, displayNestEditor, deleteButtonClick;

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
				nestlist += '<a href="#areYouSureDialog" data-nestsid="' + rs.rows.item(i).id + '" class="delete-nests ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</a>';
				nestlist += '</span>';
				nestlist += '</li>';
			}
			nestlist += '</ul>';
			$( '#nests #nestlist' ).html( nestlist ).trigger( 'create' );
			 //handle species deletion
			$( '.delete-nests' ).on( 'click', deleteButtonClick );
		} else {
			$( '#nests #nestlist' ).html( '<p>Add a nest already, you fool!</p>' );
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

	};

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

	// set up parameter passing between pages
	$.mobile.paramsHandler.addPage( 'nest', [ 'id' ], [], function( t ) { stdb.getNest( t.id, displayNest ); } );
	$.mobile.paramsHandler.addPage( 'editnest', [ 'id' ], [], function( t ) {
		stdb.getNest( t.id, displayNestEditor );
	} );
	$.mobile.paramsHandler.init();

	deleteButtonClick = function( e ) {
		// DON'T try to follow the link
		e.preventDefault();

		var sid = $( this ).attr( 'data-nestsid' );
		console.log( sid );

		// make sure it's not an accident
		areYouSure( 'Deleting a Nest is permanent!', 'Delete', function() {
			// if they say yes
			// delete the nest
			stdb.deleteNest( sid );
			// get the remaining species and redraw the species list
			stdb.getNests( displayNests );
		});
	};

	// handle page transitions
	$( '#nests' ).on( 'pagebeforeshow', function( e ) { stdb.getNests( displayNests ); });
});

// SPECIES code
$( document ).ready( function() {
	var displaySpecies, deleteButtonClick;

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
				specieslist += '<a href="#areYouSureDialog" data-speciesid="' + rs.rows.item(i).id + '" class="delete-species ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</a>';
				specieslist += '</span>';
				specieslist += '</li>';
			}
			specieslist += '</ul>';
			$( '#species #specieslist' ).html( specieslist ).trigger( 'create' );
			// handle species deletion
			$( '.delete-species' ).on( 'click', deleteButtonClick );
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

		// clear the form fields
		$(':input','#addspecies')
			.not(':button, :submit, :reset, :hidden')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');

		// go back to the list of nests page
		$.mobile.changePage( '#species' );
	});

	deleteButtonClick = function( e ) {
		// DON'T try to follow the link
		e.preventDefault();

		var sid = $( this ).attr( 'data-speciesid' );

		// make sure it's not an accident
		areYouSure( 'Deleting species is permanent!', 'Delete', function() {
			// if they say yes
			// delete the species
			stdb.deleteSpecies( sid );
			// get the remaining species and redraw the species list
			stdb.getSpecies( displaySpecies );
		});
	};

	// handle page transitions
	$( '#species' ).on( 'pagebeforeshow', function( e ) { stdb.getSpecies( displaySpecies ); });
});
