	var SOWI = {} || SOWI;

	JA.titleIcon = '<i class="fa fa-music"></i>';
	JA.TitleText = '"The hills are alive with the sound of music"';

	SOWI.addAbout = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'View useful information';
		tab.innerHTML =
			'<a href=# onclick=JA.toggleDialogs(SOWI.about); ><p class=button >' +
				'<i class="fa fa-paw"></i> About SoundViz...' +
			'</p></a>'; 

		SOWI.about = JA.container.appendChild( document.createElement( 'div' ) );
		SOWI.about.style.cssText = 'display: none; background-color: #ccc; opacity: 0.9; padding: 20px; ' +
			'bottom: 0; left: 0; height: 400px; margin: auto; position: absolute; right: 0; top: 0; width: 500px; ';
		SOWI.about.innerHTML =
			'<h3>' + document.title + ' ' + JA.titleIcon + '</h3>' +
			'<div><i><small>The hills are alive with the sound of music</small></i></div>' +
			'<h4>Translates numerical sound data in ASCII format to 3D animations viewable in your browser</h4>' +
			'<p>Data made available via  Dr Michele Ducceschi\'s research on wave turbulence in elastic plates. See also:</p>' +
			'<ul>' +
				'<li><a href="http://www.ness-music.eu/wp-content/uploads/2013/06/ducceschi_michele.pdf" target="_blank">Numerical Simulations of Wave Turbulence in Vibrating Plates</a></li>' +
				'<li><a href="http://www.msc.univ-paris-diderot.fr/~berhanu/Ducceschi.pdf" target="_blank">Numerical Simulations of Wave Turbulence in Elastic Plates Using aFinite Difference Code</a></li>' +
			'</ul>' +

			'<small>' +
				'<a href="https://github.com/soundviz/soundviz.github.io/" target="_blank">Source code</a> ' +
				'Credits: <a href="http://threejs.org" target="_blank">three.js</a> - ' +
				'<a href="http://khronos.org/webgl/" target="_blank">WebGL</a> - ' +
				'<a href="http://soundviz.github.io" target="_blank">SoundViz</a><br>' +
				'copyright &copy; 2014 SoundViz authors ~ MIT license' +
			'</small><br><br>' +

			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleDialogs(SOWI.about); >Close</a> ' +
			'</p>';
	};

	SOWI.addMessages = function() {
		SOWI.msg = JA.menu.appendChild( document.createElement( 'div' ) );
		SOWI.msg.style.cssText = 'cursor: auto; ';
		SOWI.msg.innerHTML =
				'<div id=divLoadTime></div>' +
				'<div id=divRunTime></div>' +
				'<div id=divMsg ></div>' +
			'';
	};