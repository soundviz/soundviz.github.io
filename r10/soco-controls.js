	var SOCO = {} || SOCO;

	SOCO.addControls = function() {
		SOCO.panel = SO.menu.appendChild( document.createElement( 'div' ) );
		SOCO.panel.innerHTML =
			'<h1 style=text-align:center; >' +
				'<a href=JavaScript:SOCO.gotoFrame(0); ><i class="fa fa-fast-backward"></i></a> ' +
				' <a href=JavaScript:SOCO.gotoFrame(SOFR.frame-2); ><i class="fa fa-step-backward"></i></a> ' +
				' <a id=iconRun href=JavaScript:SOCO.toggleRunning(); ><i class="fa fa-play" ></i></a>' +
				' <a href=JavaScript:SOCO.gotoFrame(SOFR.frame); ><i class="fa fa-step-forward"></i></a> ' +
				' <a href=JavaScript:SOCO.gotoFrame(SOFR.heights.length-2); ><i class="fa fa-fast-forward"></i></a> ' +
			'</h1>' +
		''; 
	};

	SOCO.toggleRunning = function() {
		if ( SO.running === false ) {
			SO.running = true;
			iconRun.innerHTML = '<i class="fa fa-pause"  ></i>';
		} else {
			SO.running = false;
			iconRun.innerHTML = '<i class="fa fa-play"  ></i>';	
		}
	};

	SOCO.gotoFrame = function( number ) {
			SOFR.startTime = new Date();
			SOFR.frame = number;
			SO.update();
	};