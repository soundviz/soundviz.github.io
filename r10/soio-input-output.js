	var SOIO = {} || SOIO;

	SOIO.addInputOutput = function() {
		SOIO.msg = SO.menu.appendChild( document.createElement( 'div' ) );
		SOIO.msg.innerHTML =
				'<div id=divLoadTime></div>' +
				'<div id=divRunTime></div>' +
				'<div id=divMsg ></div>' +
			'';
	};