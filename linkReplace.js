(function(){

	var v = "1.3.2"; //this is the version of jquery we want to use

	if (window.jQuery === undefined || window.jQuery.fn.jquery < v)	{
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initMyBookmarklet();
			} 
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} 
	else {
		initMyBookmarklet();
	}
		
			// ^^If jQuery isn't loaded on the page or if jQuery isnt the latest version, set a done variable to false which we will update when jQuery is loaded. Then create an html script element on the page with the source linking to the jQuery library with the version number we want. and appened the script to the html head. When the script is apppended and called, we check to see if the done variable doesnt exist and if one of three conditions are true (the readystate doesnt exist, or the ready state is loaded or complete, then we set the done variable to true and call the initialize bookmarklet)
		
	
	
	function initMyBookmarklet() {
		(window.myBookmarklet = function() {
			function getSelText() {
				var s = '';
				if (window.getSelection) {
					s = window.getSelection();
				} else if (document.getSelection) {
					s = document.getSelection();
				} else if (document.selection) {
					s = document.selection.createRange().text;
				}
				return s;
			}
			if ($("#youtubeframe").length == 0) {
				var s = "";
				s = getSelText();
				if (s == "") {
					var s = prompt("Forget something?");
				}
				if ((s != "") && (s != null)) {
					$("body").append("
					<div id='youtubeframe'>
					
						<div id='youtubeframe_veil' style=''>
					
							<p>Loading...</p>
					
						</div>
					
						<iframe src='https://www.youtube.com/results?search_query="+s+"' 
						onload="$('#youtubeframe iframe').slideDown(500);">Enable iFrames.</iframe>
						
						<style type='text/css'>
							#youtubeframe_veil { 
								display: none; 
								position: fixed; 
								width: 100%; 
								height: 100%; 
								top: 0; 
								left: 0; 
								background-color: rgba(255,255,255,.25); 
								cursor: pointer; z-index: 900; 
							}
								
							#youtubeframe_veil p { 
								color: black; 
								font: normal normal bold 20px/20px Helvetica, sans-serif;
								position: absolute; 
								top: 50%; 
								left: 50%; 
								width: 10em; 
								margin: -10px auto 0 -5em; 
								text-align: center; 
							}
								
							#youtubeframe iframe { 
								display: none; 
								position: fixed; 
								top: 10%; 
								left: 10%; 
								width: 80%; 
								height: 80%; 
								z-index: 999; 
								border: 10px solid rgba(0,0,0,.5); 
								margin: -5px 0 0 -5px; 
							}
						</style>
							
					</div>");
					$("#youtubeframe_veil").fadeIn(750);
				}
			} else {
				$("#youtubeframe_veil").fadeOut(750);
				$("#youtubeframe iframe").slideUp(500);
				setTimeout("$('#youtubeframe').remove()", 750);
			}
			$("#youtubeframe_veil").click(function(event){
				$("#youtubeframe_veil").fadeOut(750);
				$("#youtubeframe iframe").slideUp(500);
				setTimeout("$('#youtubeframe').remove()", 750);
			});
		})();
	}

})();
