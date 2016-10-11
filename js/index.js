$(function() {
	//$.cookie("songs");
	var getPid;
	var flagSeach = true;
	var audio = document.getElementById("audio");
	$(".myseach").click(function() {
		if(flagSeach) {
			$(".container_center").animate({
				marginLeft: 360
			}, 300, function() {
				$(".container_hide").css("z-index", 2);
			});

			flagSeach = false;
		} else {
			$(".container_hide").css("z-index", -1);
			$(".container_center").animate({
				marginLeft: 0
			}, 300);
			flagSeach = true;
		}
	});

	/*create-musicList*/
	$.get("json/music.json", function(data) {
		//var html = "";
		$.each(data, function(i, o) {
			var str = "";
			var pid = o.id;
			var name = o.name;
			var singer = o.singer;
			var img = o.src;
			//console.log(img);
			str = pid + "#" + name + "#" + singer + "#" + img;
			var $songs = $.cookie("songs");
			if(!$songs) {
				$.cookie("songs", str, {
					expires: 28000
				});
			} else {
				var result = integration.add($songs, str);
				$.cookie("songs", result, {
					expires: 28000
				});
			}
			
		
		});
		
	});

	var update = function() {
		var songs = $.cookie("songs");
		if(songs != undefined) {
			var json = integration.change(songs);
		}
		var html = "";
		$.each(json, function(i, o) {
			html += "<li pid=\"" + o.id + "\">" +
				"<i>" + (i + 1) + "</i>" +
				"<i><a href=\"###\">" + o.name + "</a><a href=\"###\">" + o.singer + "</a></i>" +
				"<span></span>" +
				"</li>";
		});
		$(".songs>ul").html(html);
	}
    update();
	//del
	$(".songs>ul>li>span").click(function() {
		$li = $(this).parent();
		var id = $li.attr("pid");
		var result = integration.del($.cookie("songs"), id);
		$li.remove();
		$.cookie("songs", result, {
			expires: 28000
		});
		update();
	});
	
	
	//click-li
	$(".songs>ul>li").click(function(){
		getPid = $(this).attr("pid");
		var html = "";
		var result = integration.change($.cookie("songs"));
		for(var i=0;i<result.length;i++){
			if(result[i].id==getPid){
				//console.log(result[i]);
				$("audio").attr("src","music/" + result[i].img);
				$("#control").removeClass().addClass("active");
				audio.play();
				html = "<dl>"
							+"<dt><a href=\"###\"><img src=\"img/singer.jpg\"/></a></dt>"
							+"<dd>"
								+"<p>"
									+"<a href=\"###\">"+result[i].name+"</a>"
								+"</p>"
								+"<p>"
									+"<a href=\"###\">"+result[i].singer+"</a>"
								+"</p>"
							+"</dd>"
						+"</dl>";
				$(".infrom").html(html);
				break;
			}
		}
		
	});

    var control = document.getElementById("control");
	control.onclick = function(){
		if(audio.paused){
             	control.className = "active";
             	audio.play();
             }else{
             	control.className = "control";
             	audio.pause();
             }
	};
     var dot = document.querySelector(".dot");
     var line = document.getElementById("line");
	 var playIn = document.querySelector(".play"); 
	 var widths = parseInt(playIn.offsetWidth);
	 var times = audio.currentTime;
	  //给小圆点bind-event
     var container = document.querySelector(".container");
   	    dot.onclick = function(e){
   	    	var x = parseInt(e.clientX - container.offsetLeft);
   	    	line.style.width = x + "px";
   	        audio.currentTime = (x/widths)*audio.duration;
   	        audio.ontimeupdate();
   	    }
     audio.ontimeupdate  = function(){
    	          //进度条
	    var scale = audio.currentTime/audio.duration;
	    
	    line.style.width = scale*widths + "px";
    }
});