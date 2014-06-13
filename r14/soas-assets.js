	var SOAS = {} || SOAS;

	SOAS.addAssets = function() {
		SOPR.setRandomGradient();
		JATH.addDefaultObject();

		JALI.toggleLightAmbient();
		JALI.toggleLightCamera();
		JALI.toggleLightPosition( 110 );
		SOAS.updateGroundPlane( 126, 20, 1 );

	};

	SOAS.updateGroundPlane = function( segments, base, scale) {

		scene.remove( mesh );

		geometry = new THREE.PlaneGeometry( 100, 100, segments - 1, segments - 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );

		if ( JATH.selectedObject ) {
			material = JATH.selectedObject.material;
		} else {
			material = JAMA.materials.PhongPureWhite();
		}
		material.side = 2;
		mesh = new THREE.Mesh( geometry, material );
		mesh.scale.set( 1, scale, 1 );
		mesh.position.y = -base;
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );

		SOPR.setWireframe();

		JATH.selectedObject = mesh;
	}
