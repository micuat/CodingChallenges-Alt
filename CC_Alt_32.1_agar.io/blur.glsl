#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
uniform float blobx;
uniform float bloby;
uniform float blobr;
// uniform vec2 texOffset;

varying vec4 vertColor;
varying vec4 vertTexCoord;

float rand(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p, float freq ){
	float unit = 1/freq;
	vec2 ij = floor(p/unit);
	vec2 xy = mod(p,unit)/unit;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(3.14159265359*xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

float pNoise(vec2 p, int res){
	float persistance = .5;
	float n = 0.;
	float normK = 0.;
	float f = 4.;
	float amp = 1.;
	int iCount = 0;
	for (int i = 0; i<50; i++){
		n+=amp*noise(p, f);
		f*=2.;
		normK+=amp;
		amp*=persistance;
		if (iCount == res) break;
		iCount++;
	}
	float nf = n/normK;
	return nf*nf*nf*nf;
}

void main(void) {
  vec2 texOffset = vec2(1.0 / 800 * 0.5, 1.0 / 800 * 0.5);
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

  vec2 tc1s = vertTexCoord.st + vec2(         0.0, -texOffset.t)*4;
  vec2 tc3s = vertTexCoord.st + vec2(-texOffset.s,          0.0)*4;
  vec2 tc5s = vertTexCoord.st + vec2(+texOffset.s,          0.0)*4;
  vec2 tc7s = vertTexCoord.st + vec2(         0.0, +texOffset.t)*4;

  vec2 tc1p = vertTexCoord.st + vec2(         0.0, -texOffset.t)*blobr;
  vec2 tc3p = vertTexCoord.st + vec2(-texOffset.s,          0.0)*blobr;
  vec2 tc5p = vertTexCoord.st + vec2(+texOffset.s,          0.0)*blobr;
  vec2 tc7p = vertTexCoord.st + vec2(         0.0, +texOffset.t)*blobr;

  vec4 col0 = texture2D(texture, tc0);
  vec4 col1 = texture2D(texture, tc1);
  vec4 col2 = texture2D(texture, tc2);
  vec4 col3 = texture2D(texture, tc3);
  vec4 col4 = texture2D(texture, tc4);
  vec4 col5 = texture2D(texture, tc5);
  vec4 col6 = texture2D(texture, tc6);
  vec4 col7 = texture2D(texture, tc7);
  vec4 col8 = texture2D(texture, tc8);

  vec4 col1s = texture2D(texture, tc1s);
  vec4 col3s = texture2D(texture, tc3s);
  vec4 col5s = texture2D(texture, tc5s);
  vec4 col7s = texture2D(texture, tc7s);

  vec3 normal = vec3(col1.r - col7.r, col3.r - col5.r, rand(tc4) * 100);
  normal = normalize(normal);

  int res = 2;//int(1000 / blobr);
  float r = 1 * col4.r;
  vec2 bv = -vec2(blobx, bloby) / blobr / 64;
  vec3 normals = vec3(col1s.r - col7s.r + pNoise(tc1p+bv, res)*r - pNoise(tc7p+bv, res)*r,
  col3s.r - col5s.r + pNoise(tc3p+bv, res)*r - pNoise(tc5p+bv, res)*r, 0.2);
  normals = normalize(normals);

  vec3 vCam = vec3(texOffset*100, 1);
  vec3 vLight = vec3(1, 0, 0.2);
  vec3 vHalf = normalize(vCam + vLight);
  float spec = pow(max(dot(vHalf, normals), 0), 2);

  spec *= 1.5 * col4.r;
  //spec += col1s.r + col3s.r + col5s.r + col7s.r - 4 * col4.r;
  gl_FragColor = vec4(spec, spec, spec, 1.0) * vertColor;
}
