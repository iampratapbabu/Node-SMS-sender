const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//init nexmo
const nexmo = new Nexmo({
	apiKey: process.env.SMS_API_KEY,
	apiSecret: process.env.API_SECRET
	  
},{debug:true});


const app=express();
app.use(express.json());

app.use(express.static('public'));

//MIDDLEWARES
if(process.env.NODE_ENV="development"){
	app.use(morgan('dev'));
};



//view engines
app.set('view engine','hbs');

app.engine('hbs',hbs({
		extname:'hbs',
	layoutDir:`${__dirname}/views/layout`,
	layoutDir:`${__dirname}/views/partials`,
	defaultLayout:'index'

}));

//HOME ROUTE
app.get('/',(req,res)=>{
  res.render("body1",{
		layout:"index",
		name:"tej"
	});
});

app.post('/',(req,res)=>{
	// res.send(req.body);
	// console.log(req.body);
	const from = "Tej Pratap";
	const number = req.body.number;
	const text = req.body.text;

	nexmo.message.sendSms(from,number,text,{type:'unicode'},(err,responseData)=>{
		if(err)
			console.log(err);
		else
		{
			console.dir(responseData);

			if(responseData.messages[0]['status'] === "0") {
				console.log("Message sent successfully.");
			} else {
				console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
			}

		}
			
	}
		
		
	);


});

//name ke through hm parameter paas kr rhe hain isse index.hbs file me jahan name variable hoga
//wahan 'tej' show hoga
//yahan agar hm body2 render krenge to body ka content show hoga



//view engine routes
app.get('/home',(req,res)=>{
	res.render('home',{
		layout:"index"
	});
});

//isi tarah alag alag route pr alag alag file render kr skte hain









module.exports = app;
