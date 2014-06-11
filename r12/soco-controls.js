	var SOCO = {} || SOCO;

	SOCO.addControls = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.style.cssText = 'cursor: auto; ';
		tab.innerHTML =
			'<h1 style=text-align:center; title="Playback control panel" >' +
				'<a href=JavaScript:SOCO.gotoFrame(0); title="Go to first frame" ><i class="fa fa-fast-backward"></i></a> ' +
				' <a href=JavaScript:SOCO.gotoFrame(SOFR.frame-2); title="Previous frame" ><i class="fa fa-step-backward"></i></a> ' +
				' <a id=iconRun href=JavaScript:SOCO.toggleRunning(); title="Play or Pause" ><i class="fa fa-play" ></i></a>' +
				' <a href=JavaScript:SOCO.gotoFrame(SOFR.frame); title="Next Frame"><i class="fa fa-step-forward"></i></a> ' +
				' <a href=JavaScript:SOCO.gotoFrame(SOFR.heights.length-2); title="Go to last frame" ><i class="fa fa-fast-forward"></i></a> ' +
			'</h1>' +
		''; 
	};

	SOCO.toggleRunning = function() {
		if ( JA.running === false ) {
			JA.running = true;
			iconRun.innerHTML = '<i class="fa fa-pause"  ></i>';
		} else {
			JA.running = false;
			iconRun.innerHTML = '<i class="fa fa-play"  ></i>';	
		}
	};

	SOCO.gotoFrame = function( number ) {
			SOFR.startTime = new Date();
			SOFR.frame = number;
			JA.update();
	};