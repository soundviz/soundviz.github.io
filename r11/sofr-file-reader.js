
	var SOFR = {} || SOFR;

	SOFR.addFileReader = function() {
		var fileReaderButton = SO.menu.appendChild( document.createElement( 'div' ) );
		fileReaderButton.innerHTML =
			'<a href=# onclick=SO.toggleDialogs(SOFR.FileReader); ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> File Reader...' +
			'</p></a>'; 

		SOFR.FileReader = SO.container.appendChild( document.createElement( 'div' ) );
		SOFR.FileReader.className = 'movable';
		SOFR.FileReader.addEventListener( 'mousedown', SO.mouseMove, false );
		SOFR.FileReader.style.cssText = 'display: none; background-color: #ccc; opacity: 0.9; padding: 20px; ' +
			'bottom: 0; height: 390px; left: 0; margin: auto; position: absolute; right: 0; top: 0; width: 250px; ';
		SOFR.FileReader.innerHTML =
			'<h3>File Open</h3>' +
				'<div><i><small>' +
					'Open text or binary files that are available on your local hard disk or network.' +
				'</small></i></div>' +
			'<p>Wireframe Helper <input type=checkbox id=inpWireFrame ></p>' +
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
				'<a class=button href=JavaScript:SO.toggleDialogs(); >Close</a> ' +
			'</p>' +
		'';

		inpCSVFile.onchange = function() { SOFR.readCSVFile( this ); };
		inpBinaryFile.onchange = function() { SOFR.readBinaryFile( this ); };
	};

	SOFR.readCSVFile = function( that ) {
		if ( that.files && that.files[0]){
			var reader = new FileReader();
			divData.innerHTML = 'Loading...';
			reader.onload = function ( event ) { 
				SOFR.processCSVData( event.target.result );
				SO.toggleDialogs();
				SOFR.startTime = new Date();
			};
			reader.readAsText( that.files[0] );
		}
	};

	SOFR.processCSVData = function( data ) {
		SOFR.frame = 0;
		SOFR.heights = [];

		var lines, length;
		var base, min = 0, max = 0;
		var txt = '';
//		var txt = '<div style=height:50px;overflow:scroll;width:250px; >' + data.substr( 1000, 1000 ) + '</div><br>';
		
		lines = data.split(/\n/);
		length = lines.length;
		var sep = ',';
		for ( var i = 0; i < length; i++ ) {
			SOFR.heights.push( lines[i].split( sep ) );
		}
		txt += 'Frames Read: ' + length + '<br>';
		testFrame = lines.length < 200 ? lines.length - 2 : 200;
		testFrame -= 5;  // wtf
		length = SOFR.heights[ testFrame ].length;
		txt += 'Elevations/frame: ' + length + '<br>';
		txt += 'Segments/side: ' + Math.sqrt( length ) + '<br>';
		base = SOFR.heights[ testFrame ][0];
		txt += 'First height: ' + base + '<br>';
		for (var i = 0; i < length; i++ ) {
			min = min < parseFloat( SOFR.heights[ testFrame ][ i ] ) ? min : parseFloat( SOFR.heights[ testFrame ][ i ] );
			max = max < parseFloat( SOFR.heights[ testFrame ][ i ] ) ? parseFloat( SOFR.heights[ testFrame ][ i ] ) : max;
		} 
		txt += 'Min: ' + min + '<br>';
		txt += 'Max: ' + max + '<br>';
		scale = 100 / ( max + Math.abs( min) );
		txt += 'Vertical scale: ' + scale.toFixed(3) + '<br>';
		divLoadTime.innerHTML = txt;

		SOTH.updateGroundPlane( Math.sqrt( length ), base, scale );
		SO.running = true;
		SO.update();
	}

	SOFR.readBinaryFile = function( that ) {
		var reader = new FileReader();
		divData.innerHTML = 'Loading...';
		reader.onload = function ( event ) { 
			var arrayBuffer = reader.result;
			var int8View = new Int8Array( arrayBuffer );
			SOFR.processBinaryData( int8View );
			SO.toggleDialogs();
			SOFR.startTime = new Date();
		};
		reader.readAsArrayBuffer( that.files[0] );
	};

	SOFR.processBinaryData = function( data ) {
		SOFR.frame = 0;
		SOFR.heights = [];
// console.log( data[1000] );
		length = data.length / 15876;

		var index = 0
		for ( var i = 0; i < length; i++ ) {
			line = [];
			for ( var j = 0; j < 15876; j++ ) {
				line.push( data[ index++ ] );
			}
			SOFR.heights.push( line );
		}
//console.log( SOFR.heights );
	};
