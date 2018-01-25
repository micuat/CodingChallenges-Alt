#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
uniform vec2 texOffset;

uniform float ca;
uniform float cb;
uniform float width;
uniform float height;

varying vec4 vertColor;
varying vec4 vertTexCoord;

void main(void) {
  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  //float w = abs(sin(angle))*5;
  float w = 2.5;
  float h = 2.5;//(w * height) / width;

  // Start at negative half the width and height
  float xmin = -w/2;
  float ymin = -h/2;

  // Maximum number of iterations for each point on the complex plane
  float maxiterations = 100;

  // x goes from xmin to xmax
  float xmax = xmin + w;
  // y goes from ymin to ymax
  float ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  float dx = (xmax - xmin);
  float dy = (ymax - ymin);

  // Start y
  float y = ymin + vertTexCoord.t * dy;

  // Start x
  float x = xmin + vertTexCoord.s * dx;

  // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
  float a = y;
  float b = x;
  float n = 0;
  // gl_FragColor = vec4(x,y,1, 1.0) * vertColor;
  // return;

  while (n < maxiterations) {
    float aa = a * a;
    float bb = b * b;
    // Infinity in our finite world is simple, let's just consider it 16
    if (aa + bb > 4.0) {
      break;  // Bail
    }
    float twoab = 2.0 * a * b;
    a = aa - bb + ca;
    b = twoab + cb;
    n++;
  }

  vec4 hu = vec4(0,0,0,1);

  // We color each pixel based on how long it takes to get to infinity
  // If we never got there, let's pick the color black
  if (n == maxiterations) {
  } else {
    // Gosh, we could make fancy colors here if we wanted
    float f = sqrt(n / maxiterations);
    if(f < 0.2) f = 0;
    hu = vec4(f,f,f,1);
  }

  gl_FragColor = hu * vertColor;
}
