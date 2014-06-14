	JAPR = {} || JAPR;

	JAPR.addPreferencesBox = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Change the ways things are viewed';
		tab.innerHTML =
			'<a href=# id=tabPreferences ><p class=button >' +
				'<i class="fa fa-wrench"></i> Preferences...' +
			'</p></a>';
		tabPreferences.onclick = function() {JA.toggleTab( JAPR.PreferencesBox ); };

		JAPR.PreferencesBox = tab.appendChild( document.createElement( 'div' ) );
		JAPR.PreferencesBox.style.cssText = 'cursor: auto; display: none; ' ;
		JAPR.PreferencesBox.innerHTML =
			'<h3 >Helpers</h3>' +
			'<p>' +
				'<input type=checkbox id=chkWires /> Wireframe<br>' +
				'Vertical scale<br><input type=range id=rngVerticalScale min=1 max=100 step=1 value=50 >' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=chkMarker /> Marker<br>' +
				'X <input type=range id=rngXCoordinate min=1 max=126 step=1 value=50 ><br>' +
				'Y <input type=range id=rngYCoordinate min=1 max=126 step=1 value=50 >' +
			'</p>' +
			'<h3 >Background</h3>' +
			'<p>' +
				'<input type=radio name=background id=randomGradient /> Random gradient<br>' +
				'<input type=radio name=background id=randomColor /> Random color<br>' +
				'<input type=radio name=background id=selectColor /> Select color ' +
					'<input type=color id=selColor value=#aaaaaa />' +
					'<output id=outBackColor >#aaaaaa</output>' +
			'</p>' +
		'';

		randomGradient.checked = true;
		randomGradient.onchange = function() { JAPR.updateBackground( this.id ); };
		randomColor.onchange = function() { JAPR.updateBackground( this.id ); };
		selectColor.onchange = function() { JAPR.updateBackground( this.id ); };
		selColor.onchange = function() { outBackColor.value = this.value; };

		chkWires.checked = true;
		chkWires.onchange = function() {
			if ( chkWires.checked === true ) {
				JAPR.setWireframe();
			} else {
				scene.remove( wires );
			}
		}

		rngVerticalScale.onchange = function() {
			JATH.selectedObject.scale.y = rngVerticalScale.value * 0.02 * JATH.selectedObject.scale.y; 
			if ( wires ) { wires.scale.y = JATH.selectedObject.scale.y ; }
		};

//		chkMarker.checked = true;
		chkMarker.onchange = function() {
			if ( chkMarker.checked === true ) {
				JAPR.setMarker();
			} else {
				scene.remove( marker );
			}
		}

	};

	JAPR.setMarker = function() {
		scene.remove( marker );
		geometry = new THREE.SphereGeometry( 2 );
		material = new THREE.MeshPhongMaterial( { color: 0xffff00, emissive: 0x333333 } );
		marker = new THREE.Mesh( geometry, material );
		marker.castShadow = true;
		marker.receiveShadow = true;
		marker.position.set( 0, JATH.selectedObject.position.y , 0 );
		scene.add( marker );
	}

	JAPR.setWireframe = function() {
		scene.remove( wires );
		wires = mesh.clone();
		wires.material = new THREE.MeshBasicMaterial( { wireframe: true } );
		scene.add( wires );
	}

	JAPR.updateBackground = function( id ) {
		if ( JAPR.cssBackround ) { document.body.removeChild( JAPR.cssBackround ); }
		if ( id === 'randomGradient' ) {
			JAPR.setRandomGradient();
		} else if ( id === 'randomColor' ) {
			JAPR.randomColor();
		} else {
			JAPR.selectColor();;
		}
	};

	JAPR.setRandomGradient = function() {
		JAPR.cssBackround = document.body.appendChild( document.createElement('style') );
		var col1 = "#" + Math.random().toString(16).slice(2, 8);
		var col2 = "#" + Math.random().toString(16).slice(2, 8);
		var col3 = "#" + Math.random().toString(16).slice(2, 8);
		var X = ( Math.random() * window.innerWidth ).toFixed(0);
		var Y = ( Math.random() * window.innerHeight ).toFixed(0);
		var center =  20 + ( Math.random() * 60 ).toFixed(0);
		JAPR.cssBackround.innerHTML += 'body { ' +
			'background: -webkit-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: -moz-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); }' +
		'';
	};

	JAPR.randomColor = function() {
		JAPR.cssBackround = document.body.appendChild( document.createElement('style') );
		JAPR.cssBackround.innerHTML += 'body { background-color: #' + Math.random().toString(16).slice(2, 8) + '; }';
	};

	JAPR.selectColor = function() {
		JAPR.cssBackround = document.body.appendChild( document.createElement('style') );
		JAPR.cssBackround.innerHTML += 'body { background-color: ' + selColor.value + '; }';
	}
