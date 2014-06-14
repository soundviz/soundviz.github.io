	var SOSA = {} || SOSA;

	SOSA.sample1 = '../data-samples-online/plate_coordinates_13x13.csv';
	SOSA.sample2 = '../data-samples-online/film_int_signed_150-450.csv';
	SOSA.sample3 = '../data-samples-online/film_int_signed_3470-3670.csv';

	SOSA.sample4 = '../data-samples-online/film_int_signed_vel_first-part.csv';
	SOSA.sample5 = '../data-samples-online/film_int_signed_vel_last-part.csv';
	SOSA.sample6 = '../data-samples-online/film_tensor_first_part.csv';
	SOSA.sample7 = '../data-samples-online/film_tensor_last_part.csv';

	SOSA.addOnlineSamples = function() {
		var OnlineSamplesButton = JA.menu.appendChild( document.createElement( 'div' ) );
		OnlineSamplesButton.innerHTML =
			'<a href=# onclick=divMsg.innerHTML="";JA.toggleDialogs(SOSA.onlineSamples); title="Start here!" ><p class=button >' +
				'<i class="fa fa-cogs"></i> Online Samples...' +
			'</p></a>'; 

	// remember: no spaces in the JS below or add quotes
			SOSA.onlineSamples = JA.container.appendChild( document.createElement( 'div' ) );
			SOSA.onlineSamples.style.cssText = 'display: none; background-color: #ccc; opacity: 0.9; padding: 20px; ' +
			'bottom: 0; left: 0; height: 480px; margin: auto; position: absolute; right: 0; top: 0; width: 500px; ';
			SOSA.onlineSamples.innerHTML =
				'<h3 style=margin:0;padding:0; >Online Samples</h3>' +
				'<p style=margin:0;padding:0; ><i><small>These links give you access to sample files with limited amounts of data. ' +
					'You may catch a glimpse of what the app does and how it works. ' +
					'If you like what you see, you may download larger files off <a href="https://github.com/soundviz/soundviz.github.io/tree/master/data-samples-downloadable" target="_blank">this page</a> and open them using the File Reader tab.' +
					' If you really like what you see, contact Michele Ducceschi who can provide you access to the original data.' +
				'</small></i></p>' +
				'<p><button onclick=SOSA.runFile(SOSA.sample1); >plate_coordinates_13x13.csv</button> 1.4 MB. 5 seconds to load. ' +
					'The first file that worked. </p>' +
				'<p><button onclick=SOSA.runFile(SOSA.sample2); >film_int_signed_150-450.csv</button> 12 MB.</p>' +
				'<p><button onclick=SOSA.runFile(SOSA.sample3); >film_int_signed_3470-3670.csv</button> 11 MB.</p>' +

				'<p><button onclick=SOSA.runFile(SOSA.sample4); >film_int_signed_vel_first_part.csv</button> 8 MB.</p>' +
				'<p><button onclick=SOSA.runFile(SOSA.sample5); >film_int_signed_vel_last_part.csv</button> 7 MB.</p>' +

				'<p><button onclick=SOSA.runFile(SOSA.sample6); >film_tensor_first_part.csv</button> 10 MB.</p>' +
				'<p><button onclick=SOSA.runFile(SOSA.sample7); >film_tensor_last_part.csv</button> 14 MB.</p>' +

//				'<div id=lineReads ></div>' +
//				'<div id=fileReads ></div>' +
//				'<div id=msg ></div>' +
				'<p style=text-align:right; >' +
					'<a class=button href=JavaScript:JA.toggleDialogs(SOSA.onlineSamples); >Close</a> ' +
				'</p>' +
				'';
	};

	SOSA.runFile = function( fname ) {
		divMsg.innerHTML = 'Loading<br>' + fname.substr( fname.lastIndexOf('/') + 1 );
		SOSA.requestFile( fname );
		SOFR.startTime = new Date();
		JA.toggleDialogs( SOSA.onlineSamples );
	};

	SOSA.requestFile = function ( fname ) {
		SOSA.xmlhttp = new XMLHttpRequest();
		SOSA.xmlhttp.crossOrigin = "Anonymous"; 
		SOSA.xmlhttp.open( 'GET', fname, true );
		SOSA.xmlhttp.onreadystatechange = callback;
		SOSA.xmlhttp.send( null );
	};

	function callback() {
		if ( SOSA.xmlhttp.readyState == 4  ) {
			data = SOSA.xmlhttp.responseText;
			SOFR.processCSVData( data );

		} else {
//			msg.innerHTML = 'waiting '; // + new Date() + '<br>' +  
				SOSA.xmlhttp.readyState + '<br>' + 
//				xmlhttp.response + '<br>' +  
				SOSA.xmlhttp.status + '<br>' + 
				SOSA.xmlhttp.statusText;
			'';
		}
	};
