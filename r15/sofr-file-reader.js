
	var SOFR = {} || SOFR;

	SOFR.addFileReader = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a href=# id=tabFileReader ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> File Reader...' +
			'</p></a>'; 
		tabFileReader.onclick = function() {JA.toggleDialogs(SOFR.FileReader); };

		SOFR.FileReader = JA.container.appendChild( document.createElement( 'div' ) );
		SOFR.FileReader.className = 'movable';
		SOFR.FileReader.addEventListener( 'mousedown', JA.mouseMove, false );
		SOFR.FileReader.style.cssText = 'display: none; background-color: #ccc; opacity: 0.9; padding: 20px; ' +
			'bottom: 0; height: 390px; left: 0; margin: auto; position: absolute; right: 0; top: 0; width: 250px; ';
		SOFR.FileReader.innerHTML =
			'<h3>File Open</h3>' +
			'<div><i><small>' +
				'Open text or binary files that are available on your local hard disk or network.' +
			'</small></i></div>' +
			'<h3>CSV Files</h3>' +
			'<p>' +
				'<input type=file id=inpCSVFile ><br>' +
			'</p>' +
			'<h3>Binary Files</h3>' +
			'<p>' +
				'<input type=file id=inpBinaryFile ><br>' +
			'</p>' +
			'<div id=divData></div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleDialogs(SOFR.FileReader); >Close</a> ' +
			'</p>' +
		'';

		inpCSVFile.onchange = function() { SOFR.readCSVFile( this ); };
		inpBinaryFile.onchange = function() { SOFR.readBinaryFile( this ); };
	};

	SOFR.readCSVFile = function( that ) {
		var reader = new FileReader();
		divData.innerHTML = 'Loading...';
		reader.onload = function ( event ) { 
			SOFR.processCSVData( event.target.result );
			JA.toggleDialogs(SOFR.FileReader );
			SOFR.startTime = new Date();
		};
		reader.readAsText( that.files[0] );
	};

	SOFR.processCSVData = function( data ) {
		SOFR.frame = 0;
		SOFR.heights = [];
		var lines, length, sep = ',';
		var base, min = 0, max = 0;

		lines = data.split(/\n/);
		length = lines.length;
		for ( var i = 0; i < length; i++ ) {
			SOFR.heights.push( lines[i].split( sep ) );
		}

		testFrame = lines.length < 200 ? lines.length - 2 : 200;
		testFrame -= 5;  // wtf
		length = SOFR.heights[ testFrame ].length;
		base = SOFR.heights[ testFrame ][0];

		for (var i = 0; i < length; i++ ) {
			min = min < parseFloat( SOFR.heights[ testFrame ][ i ] ) ? min : parseFloat( SOFR.heights[ testFrame ][ i ] );
			max = max < parseFloat( SOFR.heights[ testFrame ][ i ] ) ? parseFloat( SOFR.heights[ testFrame ][ i ] ) : max;
		} 
		scale = 100 / ( max + Math.abs( min) );
		SOAS.updateGroundPlane( Math.sqrt( length ), base, scale );
		JA.running = true;
		JA.update();

		var txt =
			'Frames Read: ' + length + '<br>' +
			'Elevations/frame: ' + length + '<br>' +
			'Segments/side: ' + Math.sqrt( length ) + '<br>' +
			'First height: ' + base + '<br>' +
			'Min: ' + min + '<br>' +
			'Max: ' + max + '<br>' +
			'Vertical scale: ' + scale.toFixed(3) + '<br>';
		divLoadTime.innerHTML = txt;
	}

	SOFR.readBinaryFile = function( that ) {
		var reader = new FileReader();
		divData.innerHTML = 'Loading...';
		reader.onload = function ( event ) { 
			var arrayBuffer = reader.result;
			var int8View = new Int8Array( arrayBuffer );
			SOFR.processBinaryData( int8View );
			JA.toggleDialogs(SOFR.FileReader);
			SOFR.startTime = new Date();
		};
		reader.readAsArrayBuffer( that.files[0] );
	};

	SOFR.processBinaryData = function( data ) {
		SOFR.frame = 0;
		SOFR.heights = [];
		length = data.length / 15876;
		var index = 0
		for ( var i = 0; i < length; i++ ) {
			line = [];
			for ( var j = 0; j < 15876; j++ ) {
				line.push( data[ index++ ] );
			}
			SOFR.heights.push( line );
		}
	};
