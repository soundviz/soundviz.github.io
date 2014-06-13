	SOPR = {} || SOPR;

	SOPR.addPreferencesBox = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Change the ways things are viewed';
		tab.innerHTML =
			'<a href=# id=tabPreferences ><p class=button >' +
				'<i class="fa fa-wrench"></i> Preferences...' +
			'</p></a>';
		tabPreferences.onclick = function() {JA.toggleTab( SOPR.PreferencesBox ); };

		SOPR.PreferencesBox = tab.appendChild( document.createElement( 'div' ) );
		SOPR.PreferencesBox.style.cssText = 'cursor: auto; display: none; ' ;
		SOPR.PreferencesBox.innerHTML =
			'<h3 >Helpers</h3>' +
			'<p>' +
				'<input type=checkbox id=chkWires /> Wireframe<br>' +
				'Vertical scale<br><input type=range id=rngVerticalScale min=1 max=100 step=1 value=50 >' +

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
		randomGradient.onchange = function() { SOPR.updateBackground( this.id ); };
		randomColor.onchange = function() { SOPR.updateBackground( this.id ); };
		selectColor.onchange = function() { SOPR.updateBackground( this.id ); };
		selColor.onchange = function() { outBackColor.value = this.value; };

		chkWires.checked = true;
		chkWires.onchange = function() {
			if ( chkWires.checked === true ) {
				SOPR.setWireframe();
			} else {
				scene.remove( wires );
			}
		}

		rngVerticalScale.onchange = function() {
			JATH.selectedObject.scale.y = rngVerticalScale.value * 0.02 * JATH.selectedObject.scale.y; 
			if ( wires ) { wires.scale.y = JATH.selectedObject.scale.y ; }
		};
	};

	SOPR.setWireframe = function() {
		scene.remove( wires );
		wires = mesh.clone();
		wires.material = new THREE.MeshBasicMaterial( { wireframe: true } );
		scene.add( wires );
	}

	SOPR.updateBackground = function( id ) {
		if ( SOPR.cssBackround ) { document.body.removeChild( SOPR.cssBackround ); }
		if ( id === 'randomGradient' ) {
			SOPR.setRandomGradient();
		} else if ( id === 'randomColor' ) {
			SOPR.randomColor();
		} else {
			SOPR.selectColor();;
		}
	};

	SOPR.setRandomGradient = function() {
		SOPR.cssBackround = document.body.appendChild( document.createElement('style') );
		var col1 = "#" + Math.random().toString(16).slice(2, 8);
		var col2 = "#" + Math.random().toString(16).slice(2, 8);
		var col3 = "#" + Math.random().toString(16).slice(2, 8);
		var X = ( Math.random() * window.innerWidth ).toFixed(0);
		var Y = ( Math.random() * window.innerHeight ).toFixed(0);
		var center =  20 + ( Math.random() * 60 ).toFixed(0);
		SOPR.cssBackround.innerHTML += 'body { ' +
			'background: -webkit-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: -moz-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); }' +
		'';
	};

	SOPR.randomColor = function() {
		SOPR.cssBackround = document.body.appendChild( document.createElement('style') );
		SOPR.cssBackround.innerHTML += 'body { background-color: #' + Math.random().toString(16).slice(2, 8) + '; }';
	};

	SOPR.selectColor = function() {
		SOPR.cssBackround = document.body.appendChild( document.createElement('style') );
		SOPR.cssBackround.innerHTML += 'body { background-color: ' + selColor.value + '; }';
	}
