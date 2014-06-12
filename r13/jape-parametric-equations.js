//Jaanga Parametric Equations ~ Theo Armour~ 2014-06-09 ~ MIT License

	JAPE = {} || JAPE;

	JAPE.addParametricEquationsBox = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabParametricEquations ><p class=button >' +
				'<i class="fa fa-wrench"></i> Parametric Equations...' +
			'</p></a>'; 
		tabParametricEquations.href = 'JavaScript:JA.toggleTab( JAPE.ParametricEquations );';

		JAPE.ParametricEquations = tab.appendChild( document.createElement( 'div' ) );
		JAPE.ParametricEquations.style.cssText = 'display: none; cursor: auto;' ;
		JAPE.ParametricEquations.innerHTML =
			'<h3 >Simple</h3>' +
			'<p>' +
				'<a href="JavaScript:JAPE.addMesh( JAPE.simplePlane, 40, 30 ); " >Simple Plane</a><br>' +
				'<a href="JavaScript:JAPE.addMesh( JAPE.radialWave, 40, 30 ); " >Radial Wave</a><br>' +
				'<a href="JavaScript:JAPE.addMesh( JAPE.curve1, 40, 30 ); " >Curve 1</a><br>' +
				'<a href="JavaScript:JAPE.addMesh( JAPE.curve2, 40, 30 ); " >Curve 2</a>' +
			'</p>' +
			'<h3 >xxx</h3>' +
			'<p>' +
				'<a href="JavaScript:JAPE.addMesh( JAPE.bohemianDome, 40, 30 ); " >bohemianDome</a><br>' +
				'<a href="JavaScript:JAPE.addMesh( JAPE.boysSurface, 40, 30 ); " >boysSurface</a><br>' +
				'<a href="JavaScript:JAPE.addMesh( JAPE.simplePlane, 40, 30 ); " >Simple Plane</a><br>' +
			'</p>' +
		'';
	};

	JAPE.bohemianDome = function( u, v ) {
// http://en.wikipedia.org/wiki/Boy's_surface
// http://www.3d-meier.de/tut3/Seite5.html
// http://mathworld.wolfram.com/BohemianDome.html

		u *= 20;
		v *= 20;
		var x = 0.5 * Math.cos(u) 
		var y = 1.5 * Math.cos(v) + 0.5 * Math.sin(u)
		var z = 1 * Math.sin(v)
		return new THREE.Vector3( x, y, z );
	}

	JAPE.boysSurface = function( u, v ) {
// http://www.3d-meier.de/tut3/Seite6.html
// http://mathworld.wolfram.com/BohemianDome.html

		u *= 5;
		v *= 6;
		var a = Math.sqrt (2);
		var b = 2 - a * Math.sin (3 * u) * Math.sin (2 * v );

		var x = a * Math.cos (v) * Math.cos(v) * Math.cos (2 * u) + Math.cos(u) * Math.sin (2 * v) / b
		var y = 3 * Math.cos (v) * Math.cos(v) / b
		var z = a * Math.cos (v) * Math.cos(v) * Math.sin (2 * u) + Math.cos(u) * Math.sin (2 * v) / b
		return new THREE.Vector3( x, y, z );

	}

	JAPE.simplePlane = function( u, v ) {
		var width = 50;
		var depth = 80;

		var x = u * width;
		var y = 0;
		var z = v * depth;
		return new THREE.Vector3( x, y, z );
	};

	JAPE.radialWave = function( u, v ) {
		var r = 50;

		var x = Math.sin( u ) * r;
		var z = Math.sin( v / 2 ) * 2 * r;
		var y = ( Math.sin( 4 * Math.PI * u ) + 2.8 * Math.cos( 2 * Math.PI * v) );
		return new THREE.Vector3( x, y, z );
	}

	JAPE.curve1 = function( u, v ) {
		u *= 1.5;
		v *= 1.5;

		x = u - ( (Math.pow( u, 3 ) / 3 ) + u * v * v );
		y = v - ( (Math.pow( v, 3 ) / 3 ) + u * u * v );
		z = u * u - v * v;
		return new THREE.Vector3( 50 * x, 50 * y, 50 * z );
	};

	JAPE.curve2 = function( u, v ) {
		u *= 30;
		v *= 30;

		x = 10 * Math.sqrt( u ) * Math.cos( u );
		y = 1 * v;
		z = 10 * Math.sqrt(u) * Math.sin( u );

		return new THREE.Vector3( x, y, z );
	};

	JAPE.addMesh = function( equation, u, v ) {
		geometry = new THREE.ParametricGeometry( equation, u, v );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI ) );
		JATH.material.side = 2;
		var mesh = new THREE.Mesh( geometry, JATH.material );
		mesh.castShadow = true;
		mesh.receiveShadow = true;

		mesh.geometry.verticesNeedUpdate = true;
		mesh.geometry.computeFaceNormals();
		mesh.geometry.computeVertexNormals();

		scene.add( mesh );
		JATH.selectedObject = mesh;
	}
