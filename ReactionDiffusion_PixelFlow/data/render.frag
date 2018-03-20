// file: render.frag
// author: diewald

#version 150

out vec4 fragColor;

uniform vec2 wh_rcp;
uniform sampler2D tex;

void main () {
  vec2 val = texture(tex, gl_FragCoord.xy * wh_rcp).rg;
  fragColor = vec4(vec3(1.0 - val.g), 1);

  // vec2 off = wh_rcp * 1;
  // vec2 coln = texture(tex, gl_FragCoord.xy * wh_rcp + vec2(0, -1) * off).rg * 2 - 1;
  // vec2 cols = texture(tex, gl_FragCoord.xy * wh_rcp + vec2(0, 1) * off).rg * 2 - 1;
  // vec2 colw = texture(tex, gl_FragCoord.xy * wh_rcp + vec2(-1, 0) * off).rg * 2 - 1;
  // vec2 cole = texture(tex, gl_FragCoord.xy * wh_rcp + vec2(1, 0) * off).rg * 2 - 1;

  // vec3 normal = vec3(1-(colw - cole).r, 1-(coln - cols).r, -0.01);
  // float n = length(normal);
  // normal = normal / n;

  // vec3 vCam = normalize(vec3((gl_FragCoord.st-vec2(0.5, 0.5))*100, 100));
  // vec3 vLight = normalize(vec3(10, 3, 1));
  // vec3 vHalf = normalize(vCam + vLight);
  // float spec = pow(max(dot(vHalf, normal), 0), 2) * 2 - 1;

  // gl_FragColor = vec4(spec, spec, spec, 1.0);  
  // gl_FragColor = vec4(sum.rgb, 1.0) * vertColor;  
}
