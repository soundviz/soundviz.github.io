	var SOLI = {} || SOLI;

	SOLI.addLightsBox = function() {
		var LightsBoxButton = SO.menu.appendChild( document.createElement( 'div' ) );
		LightsBoxButton.innerHTML =
			'<a id=tabLight ><p class=button >' +
				'<i class="fa fa-lightbulb-o"></i> Lights...' +
			'</p></a>'; 

		tabLight.href = 'JavaScript:SO.toggleTab(SOLI.lightsBox); '; 

// remember: no spaces in the JS below or add quotes
		SOLI.lightsBox = SO.menu.appendChild( document.createElement( 'div' ) );
		SOLI.lightsBox.style.cssText = 'display: none;' ;
		SOLI.lightsBox.innerHTML =
			'<div id=wiMsg >Work in progress...</div>' +
			'<p>' +
				'<input type=checkbox id=inpLightAmbient onclick=SOLI.toggleLightAmbient(); checked /> Ambient Light ' +
				'<input type=color id=inpAmbientColor value=#333333 > <output id=outAmbient >#33333</output><br>' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=inpLightPositionCamera onclick=SOLI.toggleLightPositionCamera(); checked />Light at camera position<br>' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=inpLightDirectional onclick=SOLI.toggleLightDirectional(); checked /> Directional Light<br>' +
			'</p>' +
			'<p>' +
				'Directional light latitude<br><input type=range id=rngLightLat min=-90 max=90 step=1 value=60 /> ' +
				'<output id=outpLightLat >60</output><br>' +
			'</p>' +
			'<p>' +
				'Directional light longitude<br><input type=range id=rngLightLon min=-180 max=180 step=1 value=90 /> ' +
				'<output id=outpLightLon >90</output><br>' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=chkLightHelper /> Display light helper ' +
			'</p>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:SO.toggleTab(SOLI.lightsBox); >Close</a> ' +
			'</p>' +
		'';

		inpAmbientColor.onchange = function() { SOLI.lightAmbient.color.setHex( this.value.replace("#", "0x") ); outAmbient.value=this.value; };

		rngLightLat.onmousemove = function() { outpLightLat.value=this.value; SOLI.updateLightPosition( rngLightLat.value, rngLightLon.value ); };
		rngLightLon.onmousemove = function() { outpLightLon.value=this.value;  SOLI.updateLightPosition( rngLightLat.value, rngLightLon.value ); };

		chkLightHelper.onchange = function() { SOLI.lightDirectional.shadowCameraVisible = chkLightHelper.checked === true ? true : false; };
	};

	SOLI.toggleLightAmbient = function() {
		if ( inpLightAmbient.checked === true ) {
			SOLI.lightAmbient = new THREE.AmbientLight( 0x333333);
			scene.add( SOLI.lightAmbient );
			SOLI.updateMaterials( scene.children );
		} else {
			scene.remove( SOLI.lightAmbient );
		}
	};

	SOLI.toggleLightPositionCamera = function() {
		if ( inpLightPositionCamera.checked === true ) {
			SOLI.lightCameraPosition = new THREE.DirectionalLight( 0xffffff, 1 );
			SOLI.lightCameraPosition.position = camera.position;
			scene.add( SOLI.lightCameraPosition );

			SOLI.updateMaterials( scene.children );

		} else {
			scene.remove( SOLI.lightCameraPosition );
		}
	};



/*
http://mrdoob.github.io/three.js/docs/#Reference/Lights/DirectionalLight

*/

	SOLI.toggleLightDirectional = function() {
		if ( inpLightDirectional.checked === true ) {
			SOLI.lightDirectional = new THREE.DirectionalLight( 0xffffff, 0.5 );
//			SOLI.lightDirectional = new THREE.SpotLight( 0xffffff, 1 );

			SOLI.updateLightPosition( rngLightLat.value, rngLightLon.value );
//			SOLI.lightDirectional.position.set( -50, 50, -50 );

			SOLI.lightDirectional.castShadow = true;
			var d = 130;
			SOLI.lightDirectional.shadowCameraLeft = -d;
			SOLI.lightDirectional.shadowCameraRight = d;
			SOLI.lightDirectional.shadowCameraTop = d;
			SOLI.lightDirectional.shadowCameraBottom = -d;

			SOLI.lightDirectional.shadowCameraNear = 200;
			SOLI.lightDirectional.shadowCameraFar = 400;
	
//			SOLI.lightDirectional.angle = 1; // spotlight only

// can help stop appearance of gridlines in objects with opacity < 1
			SOLI.lightDirectional.shadowBias = -0.005; // default 0 ~ distance fron corners?
//			SOLI.lightDirectional.shadowDarkness = 0.9; // default 0.5
			SOLI.lightDirectional.shadowMapWidth = 1024;  // default 512
			SOLI.lightDirectional.shadowMapHeight = 1024;
//			SOLI.lightDirectional.shadowCameraVisible;

			scene.add( SOLI.lightDirectional );
			SOLI.updateMaterials( scene.children );
		} else {
			scene.remove( SOLI.lightDirectional );
		}
	}

	SOLI.updateMaterials = function( children ) {
		for (var i = 0, len = children.length; i < len; i++) {
			if ( children[i].material ) {
				children[i].material.needsUpdate = true;
			}
		}
	}

	SOLI.updateLightPosition = function ( lat, lon ) {
		var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
		var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians
		function cos(a) {return Math.cos(a);}
		function sin(a) {return Math.sin(a);}
		var theta = lat * d2r;
		var phi = lon * d2r;
		var radius = 300;
		SOLI.lightDirectional.position.x = radius * cos( theta ) * sin( phi );
		SOLI.lightDirectional.position.y = radius * sin( theta );
		SOLI.lightDirectional.position.z = radius * cos( theta ) * cos( phi );
	};