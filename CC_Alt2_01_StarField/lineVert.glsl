uniform mat4 transform;
uniform vec4 viewport;

attribute vec4 position;
attribute vec4 color;
attribute vec4 direction;

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

vec3 clipToWindow(vec4 clip, vec4 viewport) {
  vec3 dclip = clip.xyz / clip.w;
  vec2 xypos = (dclip.xy + vec2(1.0, 1.0)) * 0.5 * viewport.zw;
  return vec3(xypos, dclip.z * 0.5 + 0.5);
}

void main() {
  vec4 p = position;
  // float angle = noise(position.xy * 0.01);
  // p.x += cos(angle) * 30;
  // p.y += sin(angle) * 30;
  vec4 clip0 = transform * p;
  vec4 clip1 = clip0 + transform * vec4(direction.xyz, 0);
  float thickness = direction.w;

  vec3 win0 = clipToWindow(clip0, viewport);
  vec3 win1 = clipToWindow(clip1, viewport);
  vec2 tangent = win1.xy - win0.xy;

  normal = normalize(vec2(-tangent.y, tangent.x));
  vec2 offset = normal * thickness;
  gl_Position.xy = clip0.xy + offset.xy;
  gl_Position.zw = clip0.zw;
  vertColor = color;

  center = (win0.xy + win1.xy) / 2.0;
  // center = win1.xy;
}
