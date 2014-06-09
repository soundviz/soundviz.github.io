	SOMA = {} || SOMA;

	SOMA.addMaterials = function() {
		var fileWidgetsButton = SO.menu.appendChild( document.createElement( 'div' ) );
		fileWidgetsButton.innerHTML =
			'<a href=# onclick=SO.toggleDialogs(SOMA.WidgetsOpen); ><p class=button >' +
				'<i class="fa fa-cogs"></i> Materials...' +
			'</p></a>'; 

// remember: no spaces in the JS below or add quotes
		SOMA.Materials = SO.conSOiner.appendChild( document.createElement( 'div' ) );
		SOMA.Materials.style.cssText = 'background-color: #ccc; bottom: 0; display: none; opacity: 0.9; padding: 0 20px 20px; ' +
			'height: 550px; left: 0; margin: auto; position: absolute; right: 0; top: 0; width: 450px; ';
		SOMA.Materials.innerHTML =
			'<div id=wiMsg >Messages appear here...</div>' +
			'<p>' +
				'Zoom number: <input type=number id=inpZoom title="0 to 18: OK" min=0 max=18 step=1 ><br>' +
				'Pretty colors: <input type=checkbox id=inpPretty ><br>' +
				'Radio 1 <input type=radio name=rad /><br>' +
				'Radio 2 <input type=radio name=rad checked=true /></br>' +
				'Overlay: <select id=selList title="Select the 2D overlay" >select option<select><br>' +
				'color: <input type=color onclick=wiMsg.innerHTML=this.value /><br>' +
				'Range: <input type=range onmousemove=wiMsg.innerHTML=this.value; min=1 max=10 step=0.1 ><br>' +
				'<input type=button onclick=alert("saveIt();") value="Save as PNG" >' +
			'</p>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:SO.toggleDialogs(); >Close</a> ' +
			'</p>' +
		'';

		var list = [ 'aaa','bbb','ccc','ddd','eee' ];
		for (var option, i = 0; i < list.length; i++) {
			option = document.createElement( 'option' );
			option.innerText = list[i];
			selList.appendChild( option );
		}

		selList.onchange = function() { };
		selList.selectedIndex = 1;
	};