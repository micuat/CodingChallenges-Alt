#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
uniform vec2 texOffset;

uniform float blobs[45];

uniform float width;
uniform float height;

varying vec4 vertColor;
varying vec4 vertTexCoord;

void main(void) {
  float x = vertTexCoord.s * width;
  float y = vertTexCoord.t * height;

  float sum = 0;
  for (int i = 0; i < 15; i++) {
      float xdif = x - blobs[i * 3 + 0];
      float ydif = y - blobs[i * 3 + 1];
      float d = sqrt((xdif * xdif) + (ydif * ydif));
      sum += 10 * blobs[i * 3 + 2] / d;
  }
  sum /= 255.0;
  sum *= 0.75;
  sum *= sum;

  gl_FragColor = vec4(sum, sum, sum, 1) * vertColor;
}
