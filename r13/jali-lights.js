	var JALI = [] || JALI;

	JALI.addLightsBox = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabLight ><p class=button >' +
				'<i class="fa fa-lightbulb-o"></i> Lights...' +
			'</p></a>'; 
		tabLight.href = 'JavaScript:JA.toggleTab( JALI.lightsBox ); '; 

		JALI.lightsBox = tab.appendChild( document.createElement( 'div' ) );
		JALI.lightsBox.style.cssText = 'cursor: auto; display: none; ' ;
		JALI.lightsBox.innerHTML =
			'<div id=wiMsg >Work in progress...</div>' +
			'<p>' +
				'<input type=checkbox id=inpLightAmbient onclick=JALI.toggleLightAmbient(); checked /> Ambient Light ' +
				'<input type=color id=inpAmbientColor value=#333333 > <output id=outAmbient >#33333</output><br>' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=inpLightPositionCamera onclick=JALI.toggleLightPositionCamera(); checked /> Light at camera position<br>' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=inpLightDirectional onclick=JALI.toggleLightDirectional( 110 ); checked /> Directional Light<br>' +
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
				'<input type=checkbox id=chkLightHelper /> Displaylight helper ' +
			'</p>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(JALI.lightsBox); >Close</a> ' +
			'</p>' +
		'';
		inpAmbientColor.onchange = function() { JALI.lightAmbient.color.setHex( this.value.replace("#", "0x") ); outAmbient.value=this.value; };

		rngLightLat.onmousemove = function() { outpLightLat.value=this.value; JALI.updateLightPosition( rngLightLat.value, rngLightLon.value ); };
		rngLightLon.onmousemove = function() { outpLightLon.value=this.value;  JALI.updateLightPosition( rngLightLat.value, rngLightLon.value ); };

		chkLightHelper.onchange = function() { JALI.lightDirectional.shadowCameraVisible = chkLightHelper.checked === true ? true : false; };
	};

	JALI.toggleLightAmbient = function() {
		if ( inpLightAmbient.checked === true ) {
			JALI.lightAmbient = new THREE.AmbientLight( 0x333333 );
			scene.add( JALI.lightAmbient );
			JALI.updateMaterials( scene.children );
		} else {
			scene.remove( JALI.lightAmbient );
		}
	};

	JALI.toggleLightPositionCamera = function() {
		if ( inpLightPositionCamera.checked === true ) {
			JALI.lightCameraPosition = new THREE.DirectionalLight( 0xffffff, 1 );
			JALI.lightCameraPosition.position = camera.position;
			scene.add( JALI.lightCameraPosition );

			JALI.updateMaterials( scene.children );

		} else {
			scene.remove( JALI.lightCameraPosition );
		}
	};

/*
http://mrdoob.github.io/three.js/docs/#Reference/Lights/DirectionalLight

*/

	JALI.toggleLightDirectional = function( d ) {
		if ( inpLightDirectional.checked === true ) {
			JALI.lightDirectional = new THREE.DirectionalLight( 0x888888, 0.25 );  // 0xffffff 1.0
//			JALI.lightDirectional = new THREE.SpotLight( 0xffffff, 1 );

			JALI.updateLightPosition( rngLightLat.value, rngLightLon.value );

			JALI.lightDirectional.castShadow = true;
			d = d ? d : 80;
			JALI.lightDirectional.shadowCameraLeft = -d;
			JALI.lightDirectional.shadowCameraRight = d;
			JALI.lightDirectional.shadowCameraTop = d;
			JALI.lightDirectional.shadowCameraBottom = -d;

			JALI.lightDirectional.shadowCameraNear = 100;
			JALI.lightDirectional.shadowCameraFar = 400;

//			JALI.lightDirectional.angle = 1; // spotlight only

// can help stop appearance of gridlines in objects with opacity < 1
			JALI.lightDirectional.shadowBias = -0.005; // default 0 ~ distance fron corners?
//			JALI.lightDirectional.shadowDarkness = 0.9; // default 0.5
			JALI.lightDirectional.shadowMapWidth = 1024;  // default 512
			JALI.lightDirectional.shadowMapHeight = 1024;
//			JALI.lightDirectional.shadowCameraVisible;
	
			scene.add( JALI.lightDirectional );
			JALI.updateMaterials( scene.children );
		} else {
			scene.remove( JALI.lightDirectional );
		}
	};

	JALI.updateMaterials = function( children ) {
		for (var i = 0, len = children.length; i < len; i++) {
			if ( children[i].material ) {
				children[i].material.needsUpdate = true;
			}
		}
	};

	JALI.updateLightPosition = function ( lat, lon ) {
		var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
		var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians
		function cos(a) {return Math.cos(a);}
		function sin(a) {return Math.sin(a);}
		var theta = lat * d2r;
		var phi = lon * d2r;
		var radius = 300;
		JALI.lightDirectional.position.x = radius * cos( theta ) * sin( phi );
		JALI.lightDirectional.position.y = radius * sin( theta );
		JALI.lightDirectional.position.z = radius * cos( theta ) * cos( phi );
	};