function blockListedSites() {
	var i, blockList = getCookie("blockList"),
		blockArray = blockList.split(",");
	console.log(blockList);
	for(i=0; i<blockArray.length;i++) {
		if(blockArray[i] !== "" && window.location.href.match(".*"+blockArray[i]+".*")) {
			console.log("match found");
			window.location = chrome.extension.getURL("BlockedSite.html");
		}
	}
}

function getCookie(cname) {
    var i, c, name = cname + "=", clist = document.cookie.split(';');
    for(i = 0; i<clist.length; i++) {
        c = clist[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

window.onload=function(){
	document.getElementById("blockListField").value=getCookie("blockList");
	document.getElementById("saveListButton").onclick=function() {
		var expires,
			d = new Date(),
			value = document.getElementById("blockListField").value;
		d.setTime(d.getTime()  + (10*365*24*60*60));
		expires = "expires="+ d.toUTCString();
		document.cookie = "blockList" + "=" + value + "; " + expires + "; path=/";
	};
}
blockListedSites();