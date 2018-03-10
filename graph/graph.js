export default {
  data() {
    return {
      canvas:'',
      context: '',
      stepY:'',
      stepX:'',
      maxY: '',
      points:{},
      canvasHistory: ''
    };
  },
  methods:{
  	draw(data){
  		this.init(data);
  		let oldX = 0;
  		let	oldY = 0;
  		let	mX = 0;
  		let	mY = 0;
  		data.map((item, i) => {
  			let x = ((item.month - 1) * 30 + item.date + 3) * this.stepX;
  			let y = (this.maxY - item.value + 40) * this.stepY;
  			this.setPoints(oldX, x, y, item);
  			if(i === 0){
  				oldX = x;
  				oldY = y;
  				mX = oldX;
  				mY = oldY;
  				this.context.beginPath();
  				this.context.moveTo(oldX,oldY);
  			};
  			if(Math.abs( mY - y) > 15 && Math.abs( x - mX) > 8){
 			let a = Math.sqrt(Math.pow(oldX - mX, 2) + Math.pow(oldY - mY, 2));
 			let	b = Math.sqrt(Math.pow(x - oldX, 2) + Math.pow(y - oldX, 2));
 			let	c = Math.sqrt(Math.pow(x - mX, 2) + Math.pow(y - mY, 2));
 			let	p = (a + b + c)/2;
 			let	r = Math.sqrt(((p-a) * (p-b) * (p-c))/p);
 			if(isNaN(r)){
 				r = 5;
 				 			console.log(item);

 			}
  			this.context.arcTo(oldX, oldY, x, y, r);
  			}else{
  				this.context.lineTo(oldX, oldY,x, y);
  			}
  		
  			if(i === data.length - 1){
  				console.log('last');
  				this.context.lineTo(x+15, oldY, x, y);
			}
			mX = oldX;
			mY  = oldY;
  			oldX = x;
  			oldY = y;
  		});
  		this.context.stroke();
  		let canvasPic = new Image();
        canvasPic.src = this.canvas.toDataURL("image/jpeg");
        this.canvasHistory = canvasPic;
  	},
  	init(data){
  		let max = data[0].value;
  		let min = data[0].value;
  	  		data.map(item => {
  			let value = item.value;
  			if(value > max){
  				max = value;
  			}
  			if(value < min){
  				min = value;
  			}
  		});
  		this.maxY = max;
  		this.stepX = this.canvas.offsetWidth / 90;
  		this.stepY = this.canvas.offsetHeight / max;
  		let grd = this.context.createLinearGradient(280,
  			(min + 40) * this.stepY,
  			295,
  			(min + 40) * this.stepY);
		grd.addColorStop(0,"#3678da");
		grd.addColorStop(0.5,"white");
		this.context.strokeStyle = grd;
		// let grde = this.context.createLinearGradient(15.2,
  // 		(min + 40) * this.stepY,
  // 		0,
  // 		(min + 40) * this.stepY);
		// grde.addColorStop(0,"#3678da");
		// grde.addColorStop(0.6,"white");
		// this.context.strokeStyle = grde;
  	},
  	setPoints(oldX, x, y, item){
		for(let j = Math.round(oldX); j < x; j++){
	  		this.points[j] = {
	  			value:item.value,
	  			date: item.date,
	  			y: y,
	  			x: x
	  		};
	  	}
  	},
  	mousemove(e){
        this.context.drawImage(this.canvasHistory, 0, 0);
  		if(typeof this.points[e.offsetX] !== 'undefined' && e.path[0].id === 'graph_account'){
  		 	console.log(this.points[e.offsetX]);
  		 	console.log(e.offsetX);
  		 	this.context.beginPath();
			this.context.arc(this.points[e.offsetX].x, this.points[e.offsetX].y, 5, 0, 2 * Math.PI);
			this.context.fillStyle = '#3678da';
			this.context.fill();
			this.context.stroke();	
			this.context.beginPath();
			this.context.lineWidth = 0.5;
			this.context.arc(this.points[e.offsetX].x, this.points[e.offsetX].y, 7, 0, 2 * Math.PI);
			this.context.moveTo(this.points[e.offsetX].x, 0)
			this.context.lineTo(this.points[e.offsetX].x, this.canvas.height);
			this.context.stroke();	
  		}
  	}
  },
  mounted(){
  	this.canvas = document.getElementById('graph_account');
  	this.context = this.canvas.getContext('2d');
  	this.context.fillStyle ='#fff';
  	this.context.fillRect(0, 0, 300, 150);
  	this.context.strokeStyle = "#3678da";
  	this.context.lineJoin = "round";
  	this.context.lineWidth = 2.5;
  
  	document.addEventListener('mousemove', this.mousemove);
  	let data = [
  		{
  			value: 400,
  			date:  2,
  			month: 1
  		},
  		{
  			value: 300,
  			date:  5,
  			month: 1
  		},
  		{
  			value: 250,
  			date:  7,
  			month: 1
  		},
  		{
  			value: 200,
  			date:  9,
  			month: 1
  		},
  		{
  			value: 150,
  			date:  11,
  			month: 1
  		},
  		{
  			value: 100,
  			date:  13,
  			month: 1
  		},
  		{
  			value: 50,
  			date:  15,
  			month: 1
  		},
  		{
  			value: 50,
  			date:  18,
  			month: 1
  		},
  		{
  			value: 50,
  			date:  20,
  			month: 1
  		},
  		{
  			value: 250,
  			date:  3,
  			month: 2
  		},
  		{
  			value: 350,
  			date:  5,
  			month: 2
  		},
  		{
  			value: 350,
  			date:  7,
  			month: 2
  		},
  		{
  			value: 350,
  			date:  11,
  			month: 2
  		},
  		{
  			value: 350,
  			date:  13,
  			month: 2
  		},
  		{
  			value: 350,
  			date:  15,
  			month: 2
  		},
  		{
  			value: 150,
  			date:  17,
  			month: 2
  		},
  		{
  			value: 100,
  			date:  19,
  			month: 2
  		},
  		{
  			value: 100,
  			date:  21,
  			month: 2
  		},
  		{
  			value: 70,
  			date:  23,
  			month: 2
  		},
  		{
  			value: 90,
  			date:  25,
  			month: 2
  		},
  		{
  			value: 490,
  			date:  27,
  			month: 2
  		},
  		{
  			value: 490,
  			date:  29,
  			month: 2
  		},
  		{
  			value: 500,
  			date:  1,
  			month: 3
  		},
  		{
  			value: 500,
  			date:  3,
  			month: 3
  		},
  		{
  			value: 500,
  			date:  5,
  			month: 3
  		},
  		{
  			value: 500,
  			date:  10,
  			month: 3
  		},
  		{
  			value: 500,
  			date:  12,
  			month: 3
  		},
  		{
  			value: 350,
  			date:  13,
  			month: 3
  		},
  		{
  			value: 350,
  			date:  14,
  			month: 3
  		},
  		{
  			value: 250,
  			date:  16,
  			month: 3
  		},
  		{
  			value: 250,
  			date:  18,
  			month: 3
  		},
  		{
  			value: 250,
  			date:  20,
  			month: 3
  		},
	];
  	this.draw(data);
  },
  destroyed(){
  	document.removeEventListener('mousemove', this.mousemove);
  }
}
