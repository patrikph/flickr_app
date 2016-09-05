var list = [];
var arr = [];
var obj = {
	imagess : function(photos, cb){
		var x = 0;
		var container = add_container(document.getElementById("images"));
		for(var i = 0; i < photos.length; i++){
					
					var img = document.createElement("IMG");
					img.src = "https://farm"+photos[i].farm+".staticflickr.com/"+photos[i].server+"/"+photos[i].id+"_"+photos[i].secret+"_t.jpg";
					img.addEventListener("click", full);
					img.id = photos[i].id;
					var div = add_div(img);
					container.appendChild(div);
				
					var check = document.createElement("INPUT");
					check.type = "checkbox";
					check.id = i;
					check.addEventListener("click", add);
					div.appendChild(check);
					++x;
					//new row
					if(x == 4){
						container = add_container(document.getElementById("images"));
						x = 0;
					}
				
					if(i == photos.length-1){
						cb();
					}
				}
		
	}
	
}

function full(event){
	var src = event.target.src;
	var img = document.createElement("IMG");
	src = src.substr(0, src.length -5);
	img.src = src+"c.jpg";
	var full = document.getElementById("full");
	img.style.display = "block";
	img.id = "fullImg";
	img.className = "full";
	img.addEventListener("click", hide);
	

	full.appendChild(img);
	
}

 function hide(event){
	 
	 var img = document.getElementById(event.target.id);
	 var full = document.getElementById("full");
	 full.removeChild(img);
	 img.style.display = "none";
 }

function search(){
	
	document.getElementById("images").innerHTML = "";
	var val = document.getElementById("search").value;
	document.getElementById("gallery").style.display = "none";
	
	var http = new XMLHttpRequest();
	http.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
		
			var rsp = JSON.parse(this.responseText);
			var photos = rsp.photos.photo;
			list = photos;
			var div = document.getElementById("images");
			
			obj.imagess(photos, function(){
					
					document.getElementById("images").style.display = "block";
					
			});
		}
	}
	
	http.open("POST", "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=017915ee3b3a899d4e8ecc31125dbb69&nojsoncallback=1&format=json&text="+val );
	http.send();
}
//adds to gallery
function add(event){
		
	var id = event.target.id;
	arr.push("https://farm"+list[id].farm+".staticflickr.com/"+list[id].server+"/"+list[id].id+"_"+list[id].secret+"_t.jpg");
	
}

function showGallery(){
	document.getElementById("gallery").innerHTML = "";
	document.getElementById("images").style.display = "none";
	var img;
	var container = add_container(document.getElementById("gallery"));
	var gallery = document.getElementById("gallery");
	var x = 0;
	for(var i = 0; i < arr.length ; ++i){
		img = document.createElement("IMG");
		img.src = arr[i];
		img.addEventListener("click", full);
		
		var div = add_div(img);
		container.appendChild(div);
		
		var input = document.createElement("INPUT");
		input.type = "button";
		input.addEventListener("click", delete_image);
		input.param = i;
		input.className = "delete";
		input.value = "X";
		
		div.appendChild(input);
		x++;
		if(x == 4){
			container = add_container(document.getElementById("gallery"))
			x =0;
		}
		
	}
	gallery.style.display = "block";
}

function add_container(div){
	
	var container = document.createElement("DIV");
	container.className = "container";
	div.appendChild(container);
	
	return container;
	
}

function add_div(img){
	
	var div = document.createElement("DIV");
	div.className = "image";
	div.appendChild(img);
	return div;
}

//delete from gallery
function delete_image(event){
	
	arr.splice(event.target.param, 1);
	showGallery();
}
