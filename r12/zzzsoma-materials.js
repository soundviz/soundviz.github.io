	SOMA = {} || SOMA;

	SOMA.Materials = {} || SOMA.Materials;

	SOMA.addMaterialEditorBox = function() {
		var addMaterialEditorButton = SO.menu.appendChild( document.createElement( 'div' ) );
		addMaterialEditorButton.innerHTML =
			'<a id=tabMaterialEditor ><p class=button >' +
				'<i class="fa fa-cogs"></i> Material Editor...' +
			'</p></a>';

		tabMaterialEditor.href = 'JavaScript:SO.toggleTab(SOMA.MaterialEditorBox);SOMA.updateMaterialEditorBox( SOTH.selectedObject );' ;

		SOMA.MaterialEditorBox = SO.menu.appendChild( document.createElement( 'div' ) );
		SOMA.MaterialEditorBox.style.cssText = 'display: none;' ;
	};

	SOMA.updateMaterialEditorBox = function() {
		var m = SOTH.selectedObject.material;
		var txt = 
			'<p>Selected id: ' + SOTH.selectedObject.id + '</p>' +
			'<p>' +

				'Material: <select id=selMaterial title="Select type" >' +
					'<option>Normal</option>' +
					'<option>Basic</option>' +
					'<option>Lambert</option>' +
					'<option>Phong</option>' +
				'<select><br>' +
				'Shading: &nbsp;<select id=selShading title="Select type" >' +
					'<option>None</option>' +
					'<option>Flat</option>' +
					'<option selected>Smooth</option>' +
				'<select><br>' +
				'Side: &nbsp; &nbsp;&nbsp;<select id=selSide title="Select sides" >' +
					'<option>Front</option>' +
					'<option>Back</option>' +
					'<option selected>Both</option>' +
				'<select><br>'; 

				if ( m.ambient ) txt += 'Ambient: &nbsp;<input type=color id=inpAmbient value=#' + m.ambient.getHexString() + ' > <output id=outAmbient >#' + m.ambient.getHexString() + '</output><br>';
				if ( m.color ) txt += 'Color: &nbsp; &nbsp;<input type=color id=inpColor value=#' + m.color.getHexString() + '> <output id=outColor >#' + m.color.getHexString() + '</output><br>';
				if ( m.emissive ) txt += 'Emissive: <input type=color id=inpEmissive value=#' + m.emissive.getHexString() + '> <output id=outEmissive >#' + m.emissive.getHexString() + '</output><br>';
				if ( m.specular ) txt += 'Specular: <input type=color id=inpSpecular value=#' + m.specular.getHexString() + '> <output id=outSpecular >#' + m.specular.getHexString() + '</output><br>';

				txt +=
				'Metal: &nbsp; &nbsp;<input type=checkbox id=inpMetal ><br>' +
				'Wireframe:<input type=checkbox id=inpWireframe value=' + m.wireframe + ' ><br>' +

				'Opacity: &nbsp;<input type=range id=inpOpacity title="0 to 1" min=0 max=1 step=0.01 value=' + m.opacity + ' >' +
					'<output id=outOpacity >' + m.opacity + '</output><br>' +
				'Shininess:<input type=range id=inpShininess title="0 to 300" min=0 max=300 step=5 value=' + m.shininess + ' >' +
					'<output id=outShininess >' + m.shininess + '</output><br>' +
			'</p>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:SO.toggleTab(SOMA.MaterialEditorBox); >Close</a> ' +
			'</p>' +

		'';
		SOMA.MaterialEditorBox.innerHTML = txt;

		selMaterial.selectedIndex = m.type;
		selMaterial.onchange = function() {
			if ( selMaterial.selectedIndex === 0 ) {
				SOTH.selectedObject.material = new THREE.MeshNormalMaterial();
				SOTH.selectedObject.material.type = 0;
			} else if ( selMaterial.selectedIndex === 1 ) {
				SOTH.selectedObject.material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
				SOTH.selectedObject.material.type = 1;
			} else if ( selMaterial.selectedIndex === 2 ) {
				SOTH.selectedObject.material = new THREE.MeshLambertMaterial( { color: 0x000000 } );
				SOTH.selectedObject.material.type = 2;
			} else {
				SOTH.selectedObject.material = new THREE.MeshPhongMaterial( { color: 0x000000 } );
				SOTH.selectedObject.material.type = 3;
			}
			SOMA.updateMaterialEditorBox();
		};
// console.log( SOTH.selectedObject.material, SOTH.selectedObject.material.type );
		selShading.selectedIndex = m.shading;
		selShading.onchange = function() { m.shading = selShading.selectedIndex; SOMA.updateMaterialEditorBox(); };

		selSide.selectedIndex = m.side;
		selSide.onchange = function() { m.side = selSide.selectedIndex; SOMA.updateMaterialEditorBox(); };

		if ( m.ambient ) inpAmbient.onchange = function() { m.ambient.setHex( this.value.replace("#", "0x") ); SOMA.updateMaterialEditorBox(); };
		if ( m.color ) inpColor.onchange = function() { m.color.setHex( this.value.replace("#", "0x") ); SOMA.updateMaterialEditorBox(); };
		if ( m.emissive ) inpEmissive.onchange = function() { m.emissive.setHex( this.value.replace("#", "0x") ); SOMA.updateMaterialEditorBox(); };
		if ( m.specular ) inpSpecular.onchange = function() { m.specular.setHex( this.value.replace("#", "0x") ); SOMA.updateMaterialEditorBox(); };

		inpMetal.checked = m.metal;
		inpMetal.onchange = function() { m.metal = this.checked; SOMA.updateMaterialEditorBox(); };
		inpWireframe.checked = m.wireframe;
		inpWireframe.onchange = function() { m.wireframe = inpWireframe.checked; SOMA.updateMaterialEditorBox(); };

		inpOpacity.onchange = function() { m.opacity = this.value; SOMA.updateMaterialEditorBox(); };
		inpShininess.onchange = function() { m.shininess = this.value; SOMA.updateMaterialEditorBox(); };
	};

/*
http://mrdoob.github.io/three.js/docs/#Reference/Materials/MeshPhongMaterial
materials.push( new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ) );


*/

	SOMA.addMaterialSelectBox = function() {
		var addMaterialSelectButton = SO.menu.appendChild( document.createElement( 'div' ) );
		addMaterialSelectButton.innerHTML =
			'<a id=tabMaterialSelect ><p class=button >' +
				'<i class="fa fa-cogs"></i> Material Select...' +
			'</p></a>';

		tabMaterialSelect.href = 'JavaScript:SO.toggleTab(SOMA.MaterialSelectBox); ' ;

		SOMA.MaterialSelectBox = SO.menu.appendChild( document.createElement( 'div' ) );
		SOMA.MaterialSelectBox.style.cssText = 'display: none;' ;

		SOMA.MaterialSelectBox.innerHTML =

			'<h3 style=margin-bottom:0; >Materials - Basic</h3>' +
			'<div>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongRandom(); >Phong Random (Default)</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.NormalSmooth(); >Normal Smooth</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.BasicFlatRed(); >Basic Flat Red</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.LambertSmoothRandom(); >Lambert Smooth Random</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongPlastic(); >Phong Plastic</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongFlat(); >Phong Flat</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongFlat2(); >Phong Flat2</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongSmooth(); >Phong Smooth</a><br>' +
			'</div>' +
			'<h3 style=margin-bottom:0; >Materials - Vertex Colors</h3>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongVertexColors(); >Phong Vertex Colors</a><br>' +

			'<h3 style=margin-bottom:0; >Materials - Textured</h3>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongGridded(); >Phong Gridded</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongUVGrid(); >Phong UVGrid</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongLavatile(); >Phong LaveTile</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongDisturb(); >Phong Disturb</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongCar(); >Phong Car</a><br>' +

			'<h3 style=margin-bottom:0; >Materials - Reflections</h3>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongChrome(); >Phong Chrome</a><br>' +
				'<a href=JavaScript:SOTH.selectedObject.material=SOMA.Materials.PhongShiny(); >Phong Shiny</a><br>' +
		'';
	};

	SOMA.Materials.PhongRandom = function() {
		var material = new THREE.MeshPhongMaterial( { ambient: 0x000000, color: 0xffffff, emissive: 0xffffff, specular: 0xffffff } );

		material.ambient.setHex( 0xffffff * Math.random() );
		material.color.setHex( 0xffffff * Math.random() );
		material.emissive.setHex( 0xffffff * Math.random() );
		material.metal = Math.floor( 2 * Math.random() );
		material.opacity = Math.random().toFixed(2);
		material.side = 2;
		material.shininess = (300 * Math.random()).toFixed(0);
		material.specular.setHex( 0xffffff * Math.random() );
		material.wireframe = Math.floor( 1.3 * Math.random() );

		material.type = 3;
		return material;
	};

	SOMA.Materials.NormalSmooth = function() {
		var material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } );
		material.type = 0;
		return material;
	}

	SOMA.Materials.BasicFlatRed = function() {
		material = new THREE.MeshBasicMaterial( { color: 0xff0000, shading: THREE.FlatShading, side: THREE.DoubleSide });
		material.type = 1;
		return material;
	}

	SOMA.Materials.LambertSmoothRandom = function() {
		material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff, shading: THREE.SmoothShading, side: THREE.DoubleSide });
		material.type = 2;
		return material;
	}

	SOMA.Materials.PhongPlastic = function() {
		var material = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0x888888, ambient: 0xff0000, shininess: 250, side: THREE.DoubleSide } );
		material.type = 3;
		return material;
	}

	SOMA.Materials.PhongFlat = function() {
		var material = new THREE.MeshPhongMaterial( { color: 0x0000ff, specular: 0x111111, shininess: 1, shading: THREE.FlatShading, side: THREE.DoubleSide  } );
		material.type = 3;
		return material;
	}

	SOMA.Materials.PhongFlat2 = function() {
		var material =  new THREE.MeshPhongMaterial( { ambient: 0x888800, color: 0xdd00ff, specular: 0x009900, shininess: 30, shading: THREE.FlatShading, side: THREE.DoubleSide })
		material.type = 3;
		return material;
	}

	SOMA.Materials.PhongSmooth = function() {
		var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, side: THREE.DoubleSide });
		material.type = 3;
		return material;
	}

// vertex colors

	SOMA.Materials.PhongVertexColors = function() {  // broken....
		var geom = SOTH.selectedObject.geometry;
		//geom.computeBoundingBox();
		//yMin = geom.boundingBox.min.y;
		//yMax = geom.boundingBox.max.y;
		yRange = scale; // yMax - yMin;
		var color, point, face, numberOfSides, vertexIndex;

		for ( var i = 0; i < geom.vertices.length; i++ ) {
			point = geom.vertices[ i ];
			color = new THREE.Color( 0x0000ff );
			color.setHSL( 0.7 * (scale - point.y) / scale, 1, 0.5 );
			geom.colors[i] = color; // use this array for convenience
		}

		var faceIndices = [ 'a', 'b', 'c', 'd' ];
		for ( var i = 0; i < geom.faces.length; i++ ) {
			face = geom.faces[ i ];
			numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
			for ( var j = 0; j < numberOfSides; j++ ) {
				vertexIndex = face[ faceIndices[ j ] ];
				face.vertexColors[ j ] = geom.colors[ vertexIndex ];
			}
		}

		var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide, vertexColors: THREE.VertexColors  } );
		material.type = 3;
		return material;
	};

// Textures

	SOMA.Materials.PhongGridded = function() {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/square.png' );
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 30, 30 );
		var material = material = new THREE.MeshPhongMaterial( {map: texture, color: 0xffaaaa, ambient: 0xffaaaa, shading: THREE.SmoothShading, shininess: 50, side: THREE.DoubleSide, specular: 0x333333 } );
		material.type = 3;
		return material;
	}

	SOMA.Materials.PhongUVGrid = function() {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/ash_uvgrid01.jpg' );
		var material = material = new THREE.MeshPhongMaterial( {map: texture, color: 0xffaaaa, ambient: 0xaaaaaa, shading: THREE.SmoothShading, shininess: 50, side: THREE.DoubleSide, specular: 0x333333 } );
		material.type = 3;
		return material;
	}

	SOMA.Materials.PhongLavatile = function() {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/lavatile.jpg' );
		var material = material = new THREE.MeshPhongMaterial( {map: texture, color: 0xffaaaa, ambient: 0xaaaaaa, shading: THREE.SmoothShading, shininess: 50, side: THREE.DoubleSide, specular: 0x333333 } );
		material.type = 3;
		return material;
	};

	SOMA.Materials.PhongDisturb = function() {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/disturb.jpg' );
		var material = material = new THREE.MeshPhongMaterial( {map: texture, color: 0xffaaaa, ambient: 0xaaaaaa, shading: THREE.SmoothShading, shininess: 50, side: THREE.DoubleSide, specular: 0x333333 } );
		material.type = 3;
		return material;
	};

	SOMA.Materials.PhongCar = function() {
		var texture = new THREE.ImageUtils.loadTexture( '../textures/im5.jpg' );
		var material = material = new THREE.MeshPhongMaterial( {map: texture, color: 0xffaaaa, ambient: 0xaaaaaa, shading: THREE.SmoothShading, shininess: 50, side: THREE.DoubleSide, specular: 0x333333 } );
		material.type = 3;
		return material;
	}

// Reflections

	SOMA.Materials.PhongChrome = function() {
		var path = '../textures/cube/SwedishRoyalCastle/';
		var format = '.jpg';
		var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];
		var texture = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );
		var material = material = new THREE.MeshPhongMaterial( { color: 0xccddff, envMap: texture, refractionRatio: 0.98, reflectivity:0.9, side: THREE.DoubleSide } );
		material.type = 3;
		return material;
	}

	SOMA.Materials.PhongShiny = function() {
		var path = '../textures/cube/pisa/';
		var format = '.png';
		var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];
		var texture = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: texture, refractionRatio: 0.95, side: THREE.DoubleSide } );
		material.type = 3;
		return material;
	}
/*
	SOMA.Materials. = function() {
		var material = 
		material.type = 3;
		return material;
	}

*/
