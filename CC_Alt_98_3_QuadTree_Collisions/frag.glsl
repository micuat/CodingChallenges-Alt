#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
vec2 texOffset = vec2(0.001, 0.001);

varying vec4 vertColor;
varying vec4 vertTexCoord;

void main(void) {
  // Grouping texcoord variables in order to make it work in the GMA 950. See post #13
  // in this thread:
  // http://www.idevgames.com/forums/thread-3467.html
  vec2 tc0 = vertTexCoord.st + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = vertTexCoord.st + vec2(         0.0, -texOffset.t);
  vec2 tc2 = vertTexCoord.st + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = vertTexCoord.st + vec2(-texOffset.s,          0.0);
  vec2 tc4 = vertTexCoord.st + vec2(         0.0,          0.0);
  vec2 tc5 = vertTexCoord.st + vec2(+texOffset.s,          0.0);
  vec2 tc6 = vertTexCoord.st + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = vertTexCoord.st + vec2(         0.0, +texOffset.t);
  vec2 tc8 = vertTexCoord.st + vec2(+texOffset.s, +texOffset.t);

  vec4 col0 = texture2D(texture, tc0);
  vec4 col1 = texture2D(texture, tc1);
  vec4 col2 = texture2D(texture, tc2);
  vec4 col3 = texture2D(texture, tc3);
  vec4 col4 = texture2D(texture, tc4);
  vec4 col5 = texture2D(texture, tc5);
  vec4 col6 = texture2D(texture, tc6);
  vec4 col7 = texture2D(texture, tc7);
  vec4 col8 = texture2D(texture, tc8);

  vec4 sum = (1.0 * col0 + 2.0 * col1 + 1.0 * col2 +  
              2.0 * col3 + 4.0 * col4 + 2.0 * col5 +
              1.0 * col6 + 2.0 * col7 + 1.0 * col8) / 16.0;
  vec3 normal = vec3((col3 - col5).r*1, (col1 - col7).r*1, 0.2);
  float n = length(normal);
  normal = normal / n;

  vec3 vCam = vec3(texOffset*100, 10);
  vec3 vLight = vec3(10, 0, 10);
  vec3 vHalf = normalize(vCam + vLight);
  float spec = pow(max(dot(vHalf, normal), 0), 2);
  float ceff = col4.r * 7.5;
  if(ceff > 1) ceff = 1;
  spec *= ceff;

  gl_FragColor = vec4(spec, spec, spec, 1.0) * vertColor;  
  // gl_FragColor = vec4(sum.rgb, 1.0) * vertColor;  
}
