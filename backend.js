const http=require("http");
const fs=require("fs");
var requests=require("request");

const home_file=fs.readFileSync("weather.html", "utf-8");

const replaceval = (tempval, org) => {
let temperature = tempval.replace("{%tempval%}",org.main.temp).replace("{%x%}",org.main.temp_min).replace("{%y%}",org.main.temp_max).replace("{%location%}",org.name).replace("{%status%}",org.weather[0].main).replace("{%humidity%}",org.main.humidity).replace("{%pressure%}",org.main.pressure).replace("{%ws%}",org.wind.speed);
return temperature; 
}

const server =http.createServer((req,res)=>{
     if(req.url=="/"){
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=bangalore&units=metric&appid=4ce8b2fbc2fe7f34a5402acf04225f85"
                     ) 
      
         .on("data", (chunk) => {
            const objdata=JSON.parse(chunk);
             console.log(objdata);
             const obj_array=[objdata];
             console.log(obj_array)

             const real_time_data = obj_array.map((val)=>  replaceval(home_file,val)).join(" ");

            //  console.log(obj_array[0].main.temp)

            // console.log(real_time_data)

             res.write(real_time_data);

             var status=obj_array[0].weather[0].main;
             console.log(status);
            if(status=="Clear"){
               
            }
            
         })
         .on("end",(err)=>{
            if(err){
                return console.log("Connection is closed due to errors",err);
            }
            
            console.log("end");
            res.end();
         })

       
    }
 })

server.listen(8000,"127.0.0.1");

