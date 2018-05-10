#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
uniform vec2 texOffset;

uniform float t;
uniform float t2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

// float snoise(vec2 v){
//   const vec4 C = vec4(0.211324865405187, 0.366025403784439,
//            -0.577350269189626, 0.024390243902439);
//   vec2 i  = floor(v + dot(v, C.yy) );
//   vec2 x0 = v -   i + dot(i, C.xx);
//   vec2 i1;
//   i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
//   vec4 x12 = x0.xyxy + C.xxzz;
//   x12.xy -= i1;
//   i = mod(i, 289.0);
//   vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
//   + i.x + vec3(0.0, i1.x, 1.0 ));
//   vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
//     dot(x12.zw,x12.zw)), 0.0);
//   m = m*m ;
//   m = m*m ;
//   vec3 x = 2.0 * fract(p * C.www) - 1.0;
//   vec3 h = abs(x) - 0.5;
//   vec3 ox = floor(x + 0.5);
//   vec3 a0 = x - ox;
//   m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
//   vec3 g;
//   g.x  = a0.x  * x0.x  + h.x  * x0.y;
//   g.yz = a0.yz * x12.xz + h.yz * x12.yw;
//   return 130.0 * dot(m, g);
// }

void main(void) {
  float maxiterations = 200;

  float minValue = -.5;//sketch.map(sketch.mouseX, 0, sketch.width, -2.5, 0);
  float maxValue = .5;//sketch.map(sketch.mouseY, 0, sketch.height, 0, 2.5);
  float x = vertTexCoord.x-0.5;
  float y = vertTexCoord.y-0.5;
  float xx = x;
  float yy = y;
  float td = t2;
  x = xx * cos(td) + yy * sin(td);
  y = -xx * sin(td) + yy * cos(td);
  // float angle = atan(y, x);
  // float r = sqrt(x*x + y*y);
  // float an = snoise(vec2(angle, t2));
  // float bn = snoise(vec2(r, t2));
  // x = (r + bn * 0.01) * cos(angle + an * 0.03);
  // y = (r + bn * 0.01) * sin(angle + an * 0.03);
  // var a = sketch.map(x, 0, sketch.width, minValue, maxValue);
  // var b = sketch.map(y, 0, sketch.height, minValue, maxValue);

  float a = (x)*(0.00005+t*1)+0.3851;//sketch.map(x, 0, sketch.width, minValue, maxValue);
  float b = (y)*(0.00005+t*1)+0.251;//sketch.map(y, 0, sketch.height, 1, 0);

  float th = 16;

  float ca = a;
  float cb = b;

  float n = 0;

  while (n < maxiterations) {
    float aa = a * a - b * b;
    float bb = 2 * a * b;
    a = aa + ca;
    b = bb + cb;
    if (a * a + b * b > th) {
      break;
    }
    n++;
  }

  float bright = n / maxiterations;
  // bright = sqrt(bright);
  bright = pow(bright, 0.75);

  if (n == maxiterations) {
    // bright = 0;
  }

  gl_FragColor = vec4(bright, bright, bright, 1.0) * vertColor;  
}
