#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertColor;
varying vec3 vpos;
varying vec2 texCoord;
varying vec3 ecNormal;
varying vec3 lightDir;

uniform sampler2D tex;

void main() {  
  // float intensity;
  // vec4 color;
  // intensity = max(0.0, dot(vertLightDir, vertNormal));
  // intensity *= (vpos.z*0.0000125+1);

  // float alpha;
  // if(vertColor.r < 0.5) alpha = 0.5;
  // else alpha = 1.0;
  // color = vec4(intensity, intensity+alpha, 1.0, alpha);
  // color.rgb = texture2D(tex, texCoord).rgb;
  // gl_FragColor = color;  

  // gl_FragColor = texture2D(tex, texCoord) * vertColor;
  vec3 direction = normalize(lightDir);
  vec3 normal = normalize(ecNormal);
  float intensity = max(0.0, dot(direction, normal));
  intensity = intensity + 0.1;
  // intensity *= 2;
  gl_FragColor = vec4(intensity, intensity, intensity, 1) * vertColor;

}