
	var SOTH = {} || SOTH;

	var controls, renderer, stats, scene, camera;
	var geometry, material, mesh, wires;

	SOTH.addThreeJS = function() {
		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		document.body.appendChild( renderer.domElement );
		scene = new THREE.Scene();

		SOTH.getTrackballController();
		THREE.ImageUtils.crossOrigin = 'anonymous';
		stats = new Stats();
		stats.domElement.style.cssText = 'bottom: 10px; opacity: 0.5; position: absolute; right: 10px; ';
		stats.domElement.title = 'Frames per second. Click to see ms per frame';
		SO.menu.appendChild( stats.domElement );

	};

	SOTH.addThreeFooter = function() {
		var footer = SO.menu.appendChild( document.createElement( 'div' ) );
		footer.innerHTML =
			'<h2>' +
				'<a id=iconHome ><i class="fa fa-home"></i></a> ' +
			'</h2>'; 
		iconHome.title = "Reset to default view";
		iconHome.href = 'JavaScript:SOTH.resetCamera();'
	};

	SOTH.getTrackballController = function() {
		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( 200, 100, 200 );
		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.target.set( 0, 20, 0 );
	};

	SOTH.resetCamera = function() {
		SOTH.getTrackballController();
	};
