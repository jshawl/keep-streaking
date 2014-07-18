// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var logoArr = [
    //K
    [0,0], [0,1],[0,2],[0,3], [0,4],[0,5],
    [1,2],
    [2,0], [2,1],[2,3], [2,4],[2,5],
    //e
    [3.5,2],[3.5,3], [3.5,4],[3.5,5],
    [4.5,2],[4.5,3], [4.5,5],
    [5.5,2],[5.5,3], [5.5,5],
    //e
    [7,2],[7,3], [7,4],[7,5],
    [8,2],[8,3], [8,5],
    [9,2],[9,3], [9,5],
    //p
    [10.5,2],[10.5,3],[10.5,4], [10.5,5],[10.5,6],[10.5,7],
    [11.5,2],[11.5,3], [11.5,4],
    [12.5,2],[12.5,3], [12.5,4],
    //space, column 15
    //space, column 16
    //S
    [15.5,0], [15.5,1],[15.5,2],[15.5,4],[15.5,5],
    [16.5,0],[16.5,2],[16.5,5],
    [17.5,0],[17.5,2],[17.5,3],[17.5,4],[17.5,5],
    //t
    [19,2],[19,3], [19,4],[19,5],
    [20,3], [20,5],
    [21,3], [21,5],
    //r
    [22.5,2],[22.5,3], [22.5,4],[22.5,5],
    [23.5,2],
    [24.5,2],
    //e
    [26,2],[26,3], [26,4],[26,5],
    [27,2],[27,3], [27,5],
    [28,2],[28,3], [28,5],
    //a
    [29.5,2], [29.5,4],[29.5,5],
    [30.5,2],[30.5,4],[30.5,5],
    [31.5,2],[31.5,3],[31.5,4],[31.5,5],
    //k
    [33,0], [33,1],[33,2],[33,3], [33,4],[33,5],
    [34,4],
    [35,2],[35,3],[35,5],
    //i
    [36.5,2],[36.5,5],
    [37.5,0],[37.5,2],[37.5,3],[37.5,4],[37.5,5],
    [38.5,2],[38.5,5],
    //n
    [40,2],[40,3], [40,4],[40,5],
    [41,2],
    [42,2],[42,3],[42,4], [42,5],
    //g
    [43.5,2],[43.5,3],[43.5,4],[43.5,6],[43.5,7],
    [44.5,2],[44.5,3],[44.5,4],[44.5,7],
    [45.5,2],[45.5,3],[45.5,4],[45.5,5],[45.5,6],[45.5,7]




    ];

//my color choices. superior.
var colorArr = ['#6BAA5E', '#AAEA88', '#3D7232'];
// githubs real colors 
// var colorArr = ['#8cc665', '#44a340', '#1e6823'];


var draw = SVG('logo').size(700,120).attr('class','center logo').fixSubPixelOffset();

function drawLogo () {
  draw.clear();
  for (var i = 0; i < logoArr.length; i++) {
    var x = Math.floor(logoArr[i][0]*15),
        y = Math.floor(logoArr[i][1]*15),
        bgColor = colorArr[Math.floor(Math.random() * 3)];
      
      
      
     // var square = document.createElement('li');
        
       // square.style.backgroundColor = bgColor;
       // square.className = 'square';
       // document.getElementById('logo').appendChild(square);
       //

    draw.rect(14.5,14.5).fill(bgColor).x(x).y(y);
  }
}

drawLogo();

var logoInterval;
$('#logo').on('mouseenter', function(){
  console.log(logoInterval)
  if (!logoInterval) {
    logoInterval = setInterval('drawLogo()', 10);
  }
}).on('mouseleave', function(){
  clearInterval(logoInterval);
  logoInterval = undefined;
});
