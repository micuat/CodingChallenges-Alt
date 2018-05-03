#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform float weight;

varying vec2 center;
varying vec2 normal;
varying vec4 vertColor;

vec2 hash( vec2 p ) // replace this by something better
{
	p = vec2( dot(p,vec2(127.1,311.7)),
		dot(p,vec2(269.5,183.3)) );

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p )
{
  const float K1 = 0.366025404; // (sqrt(3)-1)/2;
  const float K2 = 0.211324865; // (3-sqrt(3))/6;

	vec2 i = floor( p + (p.x+p.y)*K1 );
	
  vec2 a = p - i + (i.x+i.y)*K2;
  vec2 o = step(a.yx,a.xy);    
  vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;

  vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );

	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));

    return dot( n, vec3(70.0) );
	
}

void main() {
  vec2 v = gl_FragCoord.xy - center + noise(gl_FragCoord.xy/20)*weight;
  float h = (dot(normalize(normal), vec2(v.y, -v.x)));
  float w = abs(dot(normalize(normal), v));
  float r = 1-vertColor.r;
  float g = vertColor.g;
  float rfrag = length(gl_FragCoord.xy - vec2(400));
  float rcenter = length(center.xy - vec2(400));
  // float alpha = 1.0 - abs(2.0 * h / 20 / (vertColor.r));
  // float alpha = 1.0 - abs(2.0 * w / 20 / (vertColor.r));
  // float alpha = 1.0 - abs(2.0 * length(v*vec2(0.1, 1)) / 20 / (vertColor.r));
  // alpha *= vertColor.r;
  if(rfrag>rcenter) {
    gl_FragColor = vec4(1, 1, 1, 1 - (0 + w / 5 * r/r)) * vertColor.r;
  }
  else {
    gl_FragColor = vec4(1, 1, 1, 1 - (h/100 / g + w / 5 * r/r)) * vertColor.r;
  }
  // gl_FragColor = vec4(w/10 * r, h/100 / g, 1, 1);
}