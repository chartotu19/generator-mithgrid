var http = require("http"),
	fs = require("fs"),
	url= require("url"),
	file,temp,type;

http.createServer(function(req,res){
	temp = url.parse(req.url,true);
	console.log(temp.path);
	temp.path = temp.path.split("?")[0]
	req.url = req.url.split("/");
	try{
		if(temp.path !== "/"){
			file=fs.readFileSync(temp.path.slice(1));
			type=temp.path.split(".")[1];
		}
		else{
			file=fs.readFileSync("index.html");
			type="html"
		}
		var t = "text"
		if(type === "png" || type === "jepg"){
			t = "image"
		}	
		res.writeHead(200,{'Content-Type':t+'/'+type});
		res.end(file);
	}
	catch(e){
		console.log(e.message);
	}
}).listen(8000);
console.log("server running at http://localhost:8000")
