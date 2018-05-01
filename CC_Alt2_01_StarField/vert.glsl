// Toon shader using per-pixel lighting. Based on the glsl 
// tutorial from lighthouse 3D:
// http://www.lighthouse3d.com/tutorials/glsl-tutorial/toon-shader-version-ii/

#define PROCESSING_LIGHT_SHADER

uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 transform;
uniform mat3 normalMatrix;

uniform vec3 lightNormal[8];
uniform vec4 lightPosition;

attribute vec4 vertex;
attribute vec3 normal;
attribute vec4 color;
attribute vec4 direction;
attribute vec2 offset;

varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertColor;
varying vec3 vpos;
varying vec2 texCoord;
varying vec3 ecNormal;
varying vec3 lightDir;

uniform sampler2D tex;

void main() {

  // vpos = vertex.xyz;
  
  // // Normal vector in eye coordinates is passed
  // // to the fragment shader
  // vertNormal = normalize(normalMatrix * normal);
  
  // // Assuming that there is only one directional light.
  // // Its normal vector is passed to the fragment shader
  // // in order to perform per-pixel lighting calculation.  
  // vertLightDir = -lightNormal[0]; 

  // vertColor = color;
  // texCoord = offset*100 + vec2(0.5);
  // vec3 displace = texture2D(tex, texCoord).rgb;

  // // Vertex in clip coordinates
  // gl_Position = transform * (vertex + vec4(displace * 100, 0));

  vec4 pos = modelview * vertex;
  vec4 clip = projection * pos;

  texCoord = (vec2(0.5) + offset / (0.1+color.r) / 1000);

  vec4 col = texture2D(tex, texCoord);
  gl_Position = clip;// + projection * vec4(col.rg * 100, 0, 0);

  vec3 ecPosition = vec3(modelview * vertex);

  vertColor = vec4(1,1,1,1);//color;
  ecNormal = normalize(normalMatrix * normal);
  lightDir = normalize(lightPosition.xyz - ecPosition);
}