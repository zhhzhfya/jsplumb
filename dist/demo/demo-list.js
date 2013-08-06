//
// this script is used to dynamically insert links from each demo to its previous and next,
// as well as write the drop down.  
//
;(function() {

	var entries = [
		{ id:"home", name:"jsPlumb Home", about:"Main jsPlumb demo page.  Contains a bit of everything" },
		{ id:"flowchart", name:"Flowchart", about:"Demonstration of the Flowchart connectors" },
		{ id:"draggableConnectors", name:"Draggable Connections", about:"Demonstration of drag and drop connections" },
		{ id:"perimeterAnchors", name:"Perimeter Anchors", about:"Demonstration of perimeter anchors" },
		{ id:"statemachine", name:"State Machine", about:"Demonstration of the State Machine Connectors and Continuous Anchors" },
		{ id:"chart", name:"Chart Demonstration", about:"Simple Chart Demo" },
		{ id:"sourcesAndTargets", name:"Sources and Targets", about:"Demonstration of how to make whole elements Connection sources and targets" },
		{ id:"dynamicAnchors", name:"Dynamic Anchors", about:"Demonstration of Dynamic Anchors" },
		{ id:"animation", name:"Animation", about:"Drag/drop demo with animation" }
	],
	libraries = [
		{id:"jquery", name:"jQuery"},
		{id:"mootools", name:"MooTools"},
		{id:"yui", name:"YUI3"}
	],
	prepareOtherLibraryString = function(demoId, library) {
		var s = "", demoInfo = jsPlumb.DemoList.find(demoId);
		for (var i = 0; i < libraries.length; i++) {
			var c = libraries[i].id == library ? "selected" : "";
			s += '<a class="' + c + '" href="' + libraries[i].id + '.html" title="Use ' + libraries[i].name + ' as the support library">' + libraries[i].name + '</a>&nbsp;';
		}
		return s;
	},
	demoSelectorString = function(library){
		var s = '&nbsp;<select id="demoSelector" class="demoSelector" title="Select a demo">';
		for (var i = 0; i < entries.length; i++) {
			s += '<option value="../' + entries[i].id + '/' + library +  '.html">' + entries[i].name + '</option>';
		}
		s += '</select>';
		return s;
	};
	
	
	jsPlumb.DemoList = {
		find:function(id) {
			for (var i = 0; i < entries.length; i++) {
				if (entries[i].id === id) {
					var next = i < entries.length - 1 ? i + 1 : 0,
						prev = i > 0 ? i - 1 : entries.length - 1;
						
					return {
						current:entries[i],
						prev:entries[prev],
						next:entries[next],
						idx:i
					};
				}
			}
		},
		init : function() {
			var bod = document.body,
				demoId = bod.getAttribute("data-demo-id"),
				library = bod.getAttribute("data-library"),
				libraryString = prepareOtherLibraryString(demoId, library),
				demoInfo = jsPlumb.DemoList.find(demoId);
				
			if (demoInfo) {
				var prevString = '|&nbsp;<a href="../' + demoInfo.prev.id + '/' + library + '.html" title="View previous demo">' + demoInfo.prev.name + '</a><h5>&#8592;</h5>',
					nextString = '&nbsp;<h5>&#8594;</h5><a href="../' + demoInfo.next.id +'/' + library + '.html" title="View next demo">' + demoInfo.next.name + '</a>';				
			
				document.getElementById("render").innerHTML = libraryString + prevString  + demoSelectorString(library) + nextString;				
			
				var ds = document.getElementById("demoSelector");
				ds.selectedIndex = demoInfo.idx;
				ds.onchange = function() {
					window.location.href = ds.options[ds.selectedIndex].value;
				};
			}	
		}
	};

	window.jsPlumbDemo.loadTest = function(count) {
		count = count || 10;
		for (var i = 0; i < count; i++) {
			jsPlumb.deleteEveryEndpoint();
			jsPlumbDemo.init();
		}
	};
})();