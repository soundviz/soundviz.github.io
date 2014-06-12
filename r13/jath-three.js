
	var JATH = {} || JATH;

	var controls, renderer, stats, scene, camera;
	var geometry, material, mesh, wires;

	JATH.addThreeJS = function() {
		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		document.body.appendChild( renderer.domElement );
		scene = new THREE.Scene();

		JATH.getTrackballController();

		THREE.ImageUtils.crossOrigin = 'anonymous';

		stats = new Stats();
		stats.domElement.style.cssText = 'bottom: 10px; cursor: auto; opacity: 0.5; position: absolute; right: 10px; ';
		stats.domElement.title = 'Frames per second. Click to see ms per frame';
		JA.menu.appendChild( stats.domElement );

	};

	JATH.addDefaultObject = function() {
		geometry = new THREE.BoxGeometry( 1, 1, 1 );
		JATH.material = JAMA.materials.PhongPureWhite();
		JATH.selectedObject = JATH.defaultObject = new THREE.Mesh( geometry, JATH.material );
	};

	JATH.getTrackballController = function() {
		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );
		camera.position.set( JA.camX, JA.camY, JA.camZ );
		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.target.set( JA.tarX, JA.tarY, JA.tarZ );
	};

	JATH.resetCamera = function() {
		JATH.getTrackballController();
	};
