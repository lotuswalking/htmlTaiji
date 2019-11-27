/**
 * @file 一个绘制太极图的工具类
 * @description 支持同时绘制多个太极,并且每一个都有自己的旋转函数
 * @author dailc
 */
{
	/**
	 * @description 匿名函数方法得到一个函数对象
	 * 这个对象就是一个工厂,用来管理太极类
	 * 这种写法是定义一个匿名函数并执行(可以有返回值)
	 */
	var TaijiUtil = (function() {
		var FactoryObj = {};
		/**
		 * @description 生成一个太极图
		 * @param {Object} radius 半径 默认为画布的1/4
		 * @param {Object} canvas 所在画布
		 * @param {Object} xPosition 生成的x位置 默认为画布的中心
		 * @param {Object} yPosition 生成的y位置 默认为画布的中心
		 */
		function TaiJi(radius, canvas, xPosition, yPosition) {
			//默认值处理
			if (canvas == null ||
				!(canvas instanceof HTMLCanvasElement)) {
				window.alert('错误,没有传入画布对象!');
				return null;
			}
			if (radius == null || typeof(radius) != 'number' || radius == 0) {
				radius = canvas.clientWidth / 4;
			}
			if (xPosition == null || typeof(xPosition) != 'number') {
				xPosition = canvas.clientWidth / 2;
			}
			if (yPosition == null || typeof(yPosition) != 'number') {
				yPosition = canvas.clientHeight / 2;
			}
			//处理默认值,太极所在位置不能够超出显示范围
			if (parseInt(xPosition) < 0 - radius || parseInt(xPosition) > canvas.clientWidth + radius) {
				window.alert('x位置超出可见范围,重置为默认值');
				xPosition = canvas.clientWidth / 2;
			}
			if (parseInt(yPosition) < 0 - radius || parseInt(yPosition) > canvas.clientHeight + radius) {
				window.alert('y位置超出可见范围,重置为默认值');
				yPosition = canvas.clientHeight / 2;
			}
			this.radius = radius;
			this.xPos = xPosition;
			this.yPos = yPosition;
			//定时器id
			this.rotateIntervalId = null;
			//默认的角度
			this.degree = 0;
			//是否顺时针,默认为是
			this.clockWise = true;
			//console.log(canvas.backgroundColor);
			this.contextScreen = canvas.getContext('2d');

			var width = canvas.clientWidth;
			var height = canvas.clientHeight;
		};
		/**
		 * @description 清除以前的绘制
		 */
		TaiJi.prototype.clearDraw = function() {
			var contextScreen = this.contextScreen;
			//清除的背景色
			contextScreen.fillStyle = '#ffffff';
			//先清空
			var radius = this.radius;
			var xPos = this.xPos;
			var yPos = this.yPos;
			//1.绘制整个圆
			contextScreen.beginPath();
			//参数为 中心点,半径,起始角度,结束角度
			contextScreen.arc(xPos, yPos, radius, 0, 2 * Math.PI);
			contextScreen.fill();
		};
		/**
		 * @description 设置是否顺时针 
		 * @param {Object} isClockWise 是否顺时针,默认为是
		 */
		TaiJi.prototype.setClockWise = function(isClockWise){
			isClockWise = (isClockWise==false)?false:true;
			this.clockWise = isClockWise;
		};
		/**
		 * @description 将绘制的方法直接赋给原型
		 * 也就是说每一个太极对象都会有绘制方法
		 */
		TaiJi.prototype.draw = function() {
			var contextScreen = this.contextScreen;
			//先清空
			var radius = this.radius;
			var xPos = this.xPos;
			var yPos = this.yPos;
			var degree = this.degree;
			//1.绘制上边半个白圈
			contextScreen.beginPath();
			//参数为 中心点,半径,起始角度,结束角度
			contextScreen.arc(xPos, yPos, radius, degree + 0, degree + 1 * Math.PI);
			contextScreen.fillStyle = '#fff';
			contextScreen.fill();

			//2.下边半个黑圈
			contextScreen.beginPath();
			contextScreen.arc(xPos, yPos, radius, degree + 1 * Math.PI, degree + 2 * Math.PI);
			contextScreen.fillStyle = '#000';
			contextScreen.fill();

			//以半径的一半为例,在中心线上下1/4处各自绘制两个半圈
			var radius2 = radius / 2;

			//3.右边小半圆-白
			contextScreen.beginPath();
			//理论上只要半圆就,不过如果实际只画半圆的话
			//由于精度问题,会有一道不明显的细缝,所以干脆画了整个圆
			contextScreen.arc(xPos + radius2 * Math.cos(degree), yPos + radius2 * Math.sin(degree), radius2, degree + 0, degree + 2 * Math.PI);
			contextScreen.fillStyle = '#fff';
			contextScreen.fill();


			//4.左边小半圆-黑
			contextScreen.beginPath();
			//理论上只要半圆就,不过如果实际只画半圆的话
			//由于精度问题,会有一道不明显的细缝,所以干脆画了整个圆
			contextScreen.arc(xPos - radius2 * Math.cos(degree), yPos - radius2 * Math.sin(degree), radius2, degree + 0 * Math.PI, degree + 2 * Math.PI);
			contextScreen.fillStyle = '#000';
			contextScreen.fill();

			//绘制两个眼睛
			//这里将长度定位半径的1/5
			//圆心是上面3,4部、步中半圆的圆心
			var radius3 = radius / 5;

			//5.右方黑色眼睛
			contextScreen.beginPath();
			contextScreen.arc(xPos + radius2 * Math.cos(degree), yPos + radius2 * Math.sin(degree), radius3, degree + 0, degree + 2 * Math.PI);
			contextScreen.fillStyle = '#000';
			contextScreen.fill();

			//6.左方白色眼睛
			contextScreen.beginPath();
			contextScreen.arc(xPos - radius2 * Math.cos(degree), yPos - radius2 * Math.sin(degree), radius3, degree + 0, degree + 2 * Math.PI);
			contextScreen.fillStyle = '#fff';
			contextScreen.fill();

			//console.log('下半白圈的中心:('+xPos+radius2*Math.cos(degree)+','+yPos+radius2*Math.sin(degree)+'),半径:'+radius2+',起始角度:'+degree +0+',终止角度:'+degree +2 * Math.PI);
			//console.log('degree:'+degree+',Math.cos(degree):'+Math.cos(degree)+',Math.sin(degree):'+Math.sin(degree));
		};
		/**
		 * @description 原型中的旋转方法
		 */
		TaiJi.prototype.rotate = function(interval) {
			//默认为:30ms旋转角度 0.5 * Math.PI/180
			interval = (interval != null && typeof(interval) == 'number' && parseInt(interval) > 0) ? interval : 30;
			var self = this;
			if (self.rotateIntervalId != null) {
				clearInterval(self.rotateIntervalId);
			}
			self.rotateIntervalId = setInterval(function() {			
				if(self.clockWise==true){
					self.degree += 0.5 * Math.PI / 180;
				}else{
					self.degree -= 0.5 * Math.PI / 180;
				}
				if (self.degree > 2 * Math.PI) {
					self.degree -= 2 * Math.PI;
				}
				if (self.degree < -2 * Math.PI) {
					self.degree += 2 * Math.PI;
				}
				//console.log('degree:'+self.degree);
				//清除以前的绘制
				self.clearDraw();
				self.draw();
			}, interval);
		};
		/**
		 * @description 释放内存 手动释放对象
		 * 手动将一些引用赋为空值
		 */
		TaiJi.prototype.dispose = function() {
			//首要的是清除定时装置
			if (this.rotateIntervalId != null) {
				clearInterval(this.rotateIntervalId);
				this.rotateIntervalId = null;
			}
			this.contextScreen = null;
		};
		/**
		 * 以下是外部调用方法
		 */
		{
			/**
			 * 定义一个太极数组,来管理所有已经产生的太极
			 * 防止产生野生引用
			 */
			var AllTaijis = [];
			/**
			 * @description 释放以前的太极
			 */
			FactoryObj.disposeAllTaijis = function() {
				//遍历太极数组,对所有的对象进行手动释放
				if (AllTaijis != null && AllTaijis.length > 0) {
					for (var i = 0; i < AllTaijis.length; i++) {
						AllTaijis[i].dispose();
						AllTaijis[i] = null;
					}
				}
				AllTaijis = [];
			};
			/**
			 * @description 生成一个太极图
			 * @param {Object} radius 半径 默认为画布的1/4
			 * @param {Object} canvas 所在画布
			 * @param {Object} xPosition 生成的x位置 默认为画布的中心
			 * @param {Object} yPosition 生成的y位置 默认为画布的中心
			 */
			FactoryObj.generateTaiji = function(radius, canvas, xPosition, yPosition) {
				//通过构造方法,产生一个函数对象-拥有所有的原型方法
				var taiji = new TaiJi(radius, canvas, xPosition, yPosition);
				AllTaijis.push(taiji);
				return taiji;
			};
		}
		return FactoryObj;
	})();
}