// https://www.shadertoy.com/view/4sX3Rn
// The MIT License
// Copyright © 2013 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// http://www.iquilezles.org/www/articles/menger/menger.htm

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertColor;
// varying vec3 vpos;
// varying vec2 texCoord;
// varying vec3 ecNormal;
// varying vec3 lightDir;
varying vec4 vertTexCoord;

uniform float iTime;
uniform vec2 iMouse;//, iResolution;

uniform float mscale;
uniform float mtween;

uniform sampler2D texture;

// ray computation vars
const float PI = 3.14159265359;
const float fov = 50.0;

// epsilon-type values
const float S = 0.01;
const float EPSILON = 0.01;

// const delta vectors for normal calculation
const vec3 deltax = vec3(S ,0, 0);
const vec3 deltay = vec3(0 ,S, 0);
const vec3 deltaz = vec3(0 ,0, S);

float distanceToNearestSurface(vec3 p){
	float s = 3;
  vec3 q = p;
  p.x = cos(iTime) * q.x + sin(iTime) * q.z;
  p.z = -sin(iTime) * q.x + cos(iTime) * q.z;
    vec3 d = abs(p) - vec3(s);
    float cube = min(max(d.x, max(d.y,d.z)), 0.0)
        + length(max(d,0.0));
    float sphere = max(length(p-vec3(0)) - s, 0);
    return mix(cube, sphere, max(min(sin(iTime*PI/4)*0.6 + 0.6, 1.0), 0.0));
}


// better normal implementation with half the sample points
// used in the blog post method
vec3 computeSurfaceNormal(vec3 p){
    float d = distanceToNearestSurface(p);
  // vec3 q = p;
  // p.x = cos(iTime) * q.x + sin(iTime) * q.z;
  // p.z = -sin(iTime) * q.x + cos(iTime) * q.z;
    vec3 cube = normalize(vec3(
        distanceToNearestSurface(p+deltax)-d,
        distanceToNearestSurface(p+deltay)-d,
        distanceToNearestSurface(p+deltaz)-d
    ));
    vec3 sphere = normalize(p);
    return mix(cube, sphere, max(min(sin(iTime*PI/4)*0.6 + 0.6, 1.0), 0.0));
}


vec3 computeLambert(vec3 p, vec3 n, vec3 l){
    return vec3(dot(normalize(l-p), n));
}

vec3 intersectWithWorld(vec3 p, vec3 dir){
    float dist = 0.0;
    float nearest = 0.0;
    vec3 result = texture2D(texture, vertTexCoord.st).rgb;//vec3(0.0);
    for(int i = 0; i < 20; i++){
        nearest = distanceToNearestSurface(p + dir*dist);
        if(nearest < EPSILON){
            vec3 hit = p+dir*dist;
            vec3 light = vec3(100*sin(0.5),100,100*cos(0.5));
            // vec3 light = vec3(100.0*sin(iTime), 30.0*cos(iTime), 50.0*cos(iTime));
            vec3 normal = computeSurfaceNormal(hit);
            result = computeLambert(hit, normal, light);
            float t = -hit.z / (normal.z+0.01);
            // if(t<0) t = hit.z / normal.z;
            if(mod(iTime+0.5, 2) < 1.7) {
            vec2 mirrorTexCoord = ((t * normal + hit).xy)/10 + vec2(0.5);
            result = texture2D(texture, mirrorTexCoord).rgb;
            }
            break;
        }
        dist += nearest;
    }
    return result;
}

void main()
{
  vec4 iResolution = vec4(1);
    vec2 uv = vertTexCoord.st/iResolution.xy;
    
    float cameraDistance = 10.0;
    vec3 cameraPosition = vec3(0.0, 0.0, 10.0);
	vec3 cameraDirection = vec3(0.0, 0.0, -1.0);
	vec3 cameraUp = vec3(0.0, 1.0, 0.0);
  
    // generate the ray for this pixel
    const float fovx = PI * fov / 360.0;
    float fovy = fovx * iResolution.y/iResolution.x;
    float ulen = tan(fovx);
    float vlen = tan(fovy);
    
    vec2 camUV = uv*2.0 - vec2(1.0, 1.0);
    vec3 nright = normalize(cross(cameraUp, cameraDirection));
    vec3 pixel = cameraPosition + cameraDirection + nright*camUV.x*ulen + cameraUp*camUV.y*vlen;
    vec3 rayDirection = normalize(pixel - cameraPosition);
    
    vec3 pixelColour = intersectWithWorld(cameraPosition, rayDirection);
    gl_FragColor = vec4(pixelColour, 1.0);
}