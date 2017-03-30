/**
 * TweetBeacon extends THREE.Object3D
 * A Three.js object that constructs and animates itself
 */
TweetBeacon = function(tweet) {
  
  this.tweet = tweet;
//   console.log(this.tweet);
  // Call the constructor
  THREE.Object3D.call(this);

  // An empty container oriented to make it easier to work with child objects
  this.container = new THREE.Object3D();
  this.container.rotation.y = THREE.Math.degToRad(180);
  this.add(this.container);

  // Set base color depending on sentiment score
  this.color = 0xFFFFFF;

  var material = new THREE.MeshBasicMaterial({
    color: this.color,
    transparent: true,
    opacity: 1.0
  });

  var radius = 20;
  var segments = 16 ;

  var circleGeometry = new THREE.CircleGeometry(radius, segments);        
  var circle = new THREE.Mesh(circleGeometry, material);
  if( this.getScore( tweet ) == 1 )
  {
    //purple red
    this.color = 0xFF00FF;
    mood = "trust";
  }
  else if ( this.getScore( tweet ) == 2 )
  {
    //red
    this.color = 0xFF0000;
    mood = "surprise";
  }
 else if ( this.getScore( tweet ) == 3 )
  {
    //orange
    this.color = 0xFFA500;
    mood = "joy";
  }
   else if ( this.getScore( tweet ) == 4 )
  {
    //yellow
    this.color = 0xFFFF00;
    mood = "anticipation";
  }
    else if ( this.getScore( tweet ) == -1 )
  {
    //purple
    this.color = 0x800080;
    mood = "angry";
  }
     else if ( this.getScore( tweet ) == -2 )
  {
    //dark blue
    this.color = 0x000080;
    mood = "fear";
  }
    else if ( this.getScore( tweet ) == -3 )
  {
    //light blue
    this.color = 0x00FFFF;
    mood = "disgust";
  }
    else if ( this.getScore( tweet ) == -4 )
  {
    //green
    this.color = 0x008000;
    mood = "sadness";
  }
  // if (tweet.sentiment.score < 0) {
  //   this.color = 0xFF0000;
  // }
  // else if (tweet.sentiment.score > 0) {
  //   this.color = 0xDDDD00;
  // }

  this.addBeam();

  // this.addShockwave();
};

TweetBeacon.prototype = new THREE.Object3D();
TweetBeacon.prototype.constructor = TweetBeacon;
TweetBeacon.prototype.supr = THREE.Object3D.prototype;

/**
 * The line that shoots out from the surface of the Earth
 */
TweetBeacon.prototype.addBeam = function () {

  var material = new THREE.MeshBasicMaterial({
    color: this.color,
    transparent: true,
    opacity: 1.0
  });

  var radius = 20;
  var segments = 16 ;
  
//   var circleGeometry = new THREE.CircleGeometry(radius, segments);        
//   var circleGeometry = new THREE.ConeGeometry( 5, 20, 32 );
var circleGeometry = new THREE.OctahedronGeometry(radius);
  var circle = new THREE.Mesh(circleGeometry, material);
  
//   var textGeo = new THREE.TextGeometry( "T", {
// 					size:30});
//   var textBeacon = new THREE.Mesh( textGeo, material);
  this.container.add( circle);
  // var lineGeo = new THREE.Geometry();

  // lineGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  // lineGeo.vertices.push(new THREE.Vector3(0, 0, 1));

  // var lineMat = new THREE.LineBasicMaterial({
  //   color: this.color,
  //   linewidth: 2,
  //   opacity: 0.0,
  //   transparent: true
  // });

  // this.lineMesh = new THREE.Line(lineGeo, lineMat);
  // this.container.add(this.lineMesh);
  
  // this.show();
}

/**
 * The shockwave at the base of the beacon line
 */

//getScore:
TweetBeacon.prototype.getScore = function( tweet )
{
//   if (!this.tweet || !this.tweet.place || !this.tweet.lang) return;
//   if (!this.tweet.text) return;
//   if (this.tweet === "undefined") return;
  
//   console.log( this.tweet.text );
  var positiveWords = [
     'excellent', 'amazing', 'beautiful', 'nice', 'marvelous', 'magnificent', 'fabulous', 'astonishing', 'fantastic', 'peaceful', 'fortunate', 
     'brilliant', 'glorious', 'cheerful', 'gracious', 'grateful', 'splendid', 'superb', 'honorable', 'thankful', 'inspirational',
     'ecstatic', 'victorious', 'virtuous', 'proud', 'wonderful', 'lovely', 'delightful'
  ];
  var happyWords = [
    'happy', 'lucky', 'awesome', 'excited', 'fun', 'amusing', 'amused', 'pleasant', 'pleasing', 'glad', 'enjoy',
    'jolly', 'delightful', 'joyful', 'joyous', ':-)', ':)', ':-D', ':D', '=)','☺'
  ];
  var lovelyWords = [
    'love', 'adore', 'blissful', 'heartfelt', 'loving', 'lovable', 'sweetheart', 'darling', 'kawaii', 'married', 'engaged'
  ];
  var supriseWords = [
  'surprised','amazed','marvel','wonder','cool'
  ];

  var negativeWords = [
    'unhappy', 'bad', 'sorry', 'annoyed', 'dislike', 'anxious', 'ashamed', 'cranky', 'crap', 'crappy', 'envy', 
    'awful', 'bored', 'boring', 'bothersome', 'bummed', 'burned', 'chaotic', 'defeated', 'devastated', 'stressed',
    'disconnected', 'discouraged', 'dishonest', 'doomed', 'dreadful', 'embarrassed', 'evicted', 'freaked out', 'frustrated', 'stupid',
    'guilty', 'hopeless', 'horrible', 'horrified', 'humiliated', 'ignorant', 'inhumane', 'cruel', 'insane', 'insecure',
    'nervous', 'offended', 'oppressed', 'overwhelmed', 'pathetic', 'powerless', 'poor', 'resentful', 'robbed', 'screwed'
  ];
  var sadWords = [
    'sad', 'alone', 'anxious', 'depressed', 'disappointed', 'disappointing', 'sigh', 'sobbing', 'crying', 'cried', 
    'dumped', 'heartbroken', 'helpless', 'hurt', 'miserable', 'misunderstood', 'suicidal', ':-(', ':(', '=(', ';('
  ];
  var angryWords = [
    'hate', 'damn', 'angry', 'betrayed', 'bitched','disgust', 'disturbed', 'furious', 'harassed', 'hateful', 'hostile', 'insulted',
    'irritable', 'jealous', ' rage ', 'pissed'

  ];
  var sickWords = [
    'sick', ' ill ', 'under weather', 'throw up', 'threw up', 'throwing up', 'puke', 'puking', 'pain', 'hangover', 'intoxicated'
  ];


  if (positiveWords.some(function(v) { return tweet.text.toLowerCase().indexOf(v) !== -1; })) {
      return 1;
    } else if (happyWords.some(function(v) { return tweet.text.toLowerCase().indexOf(v) !== -1; })) {
      return 2;
    } else if (lovelyWords.some(function(v) { return tweet.text.toLowerCase().indexOf(v) !== -1; })) {
      return 3;
    } else if (supriseWords.some(function(v){ return tweet.text.toLowerCase().indexOf(v) !== -1 ;})){
      return 4;
    } else if (negativeWords.some(function(v) { return tweet.text.toLowerCase().indexOf(v) !== -1; })) {
      return -1;
    } else if (sadWords.some(function(v) { return tweet.text.toLowerCase().indexOf(v) !== -1; })) {
      return -2;
    } else if (angryWords.some(function(v) { return tweet.text.toLowerCase().indexOf(v) !== -1; })) {
      return -3;
    } else if (sickWords.some(function(v) { return tweet.text.toLowerCase().indexOf(v) !== -1; })) {
      return -4;
    }
    else return 0;
}

// TweetBeacon.prototype.addShockwave = function () {

//   var self = this;

//   var material = new THREE.MeshBasicMaterial({
//     color: this.color,
//     transparent: true,
//     opacity: 1.0
//   });

//   var radius = 20;
//   var segments = 16 ;

//   var circleGeometry = new THREE.CircleGeometry(radius, segments);        
//   var circle = new THREE.Mesh(circleGeometry, material);
//   circle.position.z = 5;
//   circle.scale.x = circle.scale.y = circle.scale.x = 0.1;
//   this.container.add(circle);
  
//   var time = 2;

//   // Animates opacity of shockwave
//   TweenLite.to(circle.material, time, {
//     opacity: 0,
//     ease: Quad.easeOut
//   });

//   // Animates scale/size of shockwave
//   TweenLite.to(circle.scale, time, {
//     x: 1.0, y: 1.0, z: 1.0,
//     ease: Quart.easeOut,
//     onComplete: function () {
//       // remove when animation completes to keep number of object in scene to a minimum
//       self.container.remove(circle);
//     }
//   });
// }

// /**
//  * Animation of line emerging from beacon base
//  */
// TweetBeacon.prototype.show = function () {

//   var self = this;
//   var time = 4;

//   // Define the line height based on the sentiment score
//   this.beamHeight = 400 + Math.abs(this.tweet.sentiment.score) * 100
  
//   // Animate opacity
//   TweenLite.to(this.lineMesh.material, time, {
//     opacity: 0.75,
//     ease: Quart.easeOut
//   });

//   // Animate line length
//   TweenLite.to(this.lineMesh.geometry.vertices[1], time, {
//     z: this.beamHeight,
//     ease: Quart.easeOut,
//     onUpdate: function () {
//       // this is required for Three.js to re-render the line
//       self.lineMesh.geometry.verticesNeedUpdate = true;
//     }
//   });
  
//   // Set the life span of the beacon before it shoots into space 
//   setTimeout(function () {
//     self.hide()
//   }, time * 1000);
// };

// /**
//  *  Animation of beacon shooting into space
//  */
// TweetBeacon.prototype.hide = function () {

//   var self = this;
//   var time = 10;

//   // Animate opacity
//   TweenLite.to(this.lineMesh.material, time, {
//     opacity: 0.0,
//     ease: Quart.easeOut,
//     onComplete: function () {
//       // when animation completes callback to notify
//       if (self.onHideCallback) {
//         self.onHideCallback();
//       }
//     }
//   });
  
  // Animate length of line
//   TweenLite.to(this.lineMesh.geometry.vertices[0], time / 2, {
//     z: this.beamHeight,
//     ease: Quart.easeOut,
//     onUpdate: function () {
//       // this is required for Three.js to re-render the line
//       self.lineMesh.geometry.verticesNeedUpdate = true;
//     }
//   });
  
//   // Animate distance of line from beacon base / surface of earth
//   TweenLite.to(this.lineMesh.position, time, {
//     z: this.beamHeight + 300,
//     ease: Quart.easeOut
//   });

// }

// /**
//  * Sets a callback for aniamtion complete and beacon has expired
//  */
// TweetBeacon.prototype.onHide = function (callback) {
//   this.onHideCallback = callback;
// }

