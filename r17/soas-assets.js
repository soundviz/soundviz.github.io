	var SOAS = {} || SOAS;

	SOAS.addAssets = function() {
		JAPR.setRandomGradient();
		JATH.addDefaults();

		JALI.toggleLightAmbient();
		JALI.toggleLightCamera();
		JALI.toggleLightPosition( 110 );
		SOAS.updateGroundPlane( 126, 20, 1 );

	};

	SOAS.updateGroundPlane = function( segments, base, scale) {

		JATH.scene.remove( mesh );

		geometry = new THREE.PlaneGeometry( 100, 100, segments - 1, segments - 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );

/*
		var texture = new THREE.ImageUtils.loadTexture( '../textures/im5.jpg' );
		material = new THREE.MeshPhongMaterial( {
			color: 0xffffff, map: texture, opacity: 1, transparent: true 
		} );
/*/


//		material = new THREE.MeshNormalMaterial();
//		material = JAMA.materials.PhongRedPlastic;
//JAMA.updateMaterial( 'PhongRedPlastic' );

		material = new THREE.MeshPhongMaterial( {
				ambient: 0xff0000,
				color: 0xff0000,
				emissive: 0x330000,
				metal: true,
				opacity: 1,
				shading: THREE.SmoothShading,
				shininess: 250,
				side: 2,
				specular: 0xff5555,
				transparent: false,
				wireframe: false
		} );

//		material = JAMA.materials[ 'NormalSmooth' ].set();
		material.side = 2;
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.y = -base * scale;
		mesh.scale.set( 1, scale, 1 );

		mesh.castShadow = true;
		mesh.receiveShadow = true;
		JATH.scene.add( mesh );

		if ( chkWires.checked === true ) { JAPR.setWireframe(); }

		JATH.selectedObject = mesh;
	}
