function blockListedSites() {
	chrome.storage.local.get("blockList", function( results ) {
    	var i, blockArray=results.blockList.split(";");
    	console.log( results.blockList );
    	console.log( blockArray );
    	for(i=0; i<blockArray.length; i++) {
    		if(blockArray[i] !== "" && window.location.href.match(".*"+blockArray[i]+".*")) {
    			console.log("match found");
    			window.location = chrome.extension.getURL("BlockedSite.html");
    		}
    	}
    });
}

window.onload=function(){
	chrome.storage.local.get("blockList", function( results) {
		document.getElementById("blockListField").value=results.blockList;
	});
	document.getElementById("saveListButton").onclick=function() {
		chrome.storage.local.set({"blockList": document.getElementById("blockListField").value}, function() {
			console.log('Data has been saved.');
		});
		blockListedSites();
		window.close();
	};
}
blockListedSites();