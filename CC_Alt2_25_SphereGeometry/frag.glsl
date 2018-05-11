// https://www.shadertoy.com/view/4llGWM

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

//SuperShape 3d by eiffie based on mickdermack's 2d formula
uniform vec3 cameraPosition;
uniform float iteration;
uniform float phiGlitch;
uniform float dGlitch;

uniform vec4 S1, S2;//m,n1,n2,n3

//from mickdermack https://www.shadertoy.com/view/MdXXDB
float SuperFormula(float phi, float a, float b, float m, float n1, float n2, float n3){
	return pow((pow(abs(cos(m*phi/4.0)/a),n2) + pow(abs(sin(m*phi/4.0)/b), n3)), -(1.0/n1));
}

// Maximum/minumum elements of a vector
float vmax(vec2 v) {
	return max(v.x, v.y);
}

float vmax(vec3 v) {
	return max(max(v.x, v.y), v.z);
}

float vmax(vec4 v) {
	return max(max(v.x, v.y), max(v.z, v.w));
}

float fBox(vec3 p, vec3 b) {
	vec3 d = abs(p) - b;
	return length(max(d, vec3(0))) + vmax(min(d, vec3(0)));
}

float SE(in vec3 p){
	float d=length(p);//the distance to the center of the shape
	float sn=p.z/d;//the sine of rho (the angle between z and xy)
	float phi=atan(p.y,p.x),rho=asin(sn)+phiGlitch*p.z;//the angles to feed the formula
	// float r1=SuperFormula(phi,1.0,1.0,S1.x,S1.y,S1.z,S1.w);
	// float r2=SuperFormula(rho,1.0,1.0,S2.x,S2.y,S2.z,S2.w);//the radii
	//vec3 np=r2*vec3(r1*cos(rho)*vec2(cos(phi),sin(phi)),sin(rho));//reconstituted point
	//d-=length(np);//the distance to this point
	d-=sqrt((1.0-sn*sn)+sn*sn);//same as above but optimized a bit

	d = mix(d, fBox(p, vec3(0.5)), sin(iTime*3.1415*0.125) * sin(iTime*3.1415*0.125));
	return d;

}
float DDE(in vec3 p, in vec3 rd){
	float d=SE(p),s=d*0.5;
	float dr=(d-SE(p+rd*s))/s;
	return d/(1.0+max(dr,0.0));
}

float rnd(vec2 c){return fract(sin(dot(vec2(1.317,19.753),c))*413.7972);}
float rndStart(vec2 fragCoord){
	return 0.5+0.5*rnd(fragCoord.xy+vec2(iTime*217.0));
}
float shadao(vec3 ro, vec3 rd, float px,vec2 fragCoord){//pretty much IQ's SoftShadow
	float res=1.0,d,t=2.0*px*rndStart(fragCoord);
	for(int i=0;i<12;i++){
		d=max(px,DDE(ro+rd*t,rd)*1.5);
		t+=d;
		res=min(res,d/t+t*0.1);
	}
	return res;
}

vec3 L;

vec3 Color(vec3 ro, vec3 rd, float t){
	ro+=rd*t;
	float d=SE(ro);
	vec2 e=vec2(t,0.0);
	vec3 dn=vec3(SE(ro-e.xyy),SE(ro-e.yxy),SE(ro-e.yyx));
	vec3 dp=vec3(SE(ro+e.xyy),SE(ro+e.yxy),SE(ro+e.yyx));
	vec3 N=(dp-dn)/(length(dp-vec3(d))+length(vec3(d)-dn));
	float sh=clamp(shadao(ro,L,t,vec2(0))+0.2,0.0,1.0);
	sh=sh*(0.5+0.5*dot(N,L))*exp(-t*0.125);
	vec3 scol=vec3(sh);


	float dd=length(ro);//the distance to the center of the shape
	float sn=ro.z/dd;//the sine of rho (the angle between z and xy)
	float phi=atan(ro.y,ro.x),rho=asin(sn)+phiGlitch*ro.z;//the angles to feed the formula
	scol = vec3(1, fract(phi / 3.1415*5), abs(rho / 3.1415));

	return scol;
}
mat3 lookat(vec3 fw){
	fw=normalize(fw);vec3 rt=normalize(cross(fw,vec3(0.0,1.0,0.0)));return mat3(rt,cross(rt,fw),fw);
}

void main() {
    vec2 iResolution = vec2(1);
    vec2 fragCoord = vertTexCoord.st;

	L=normalize(vec3(0.4,0.8,-0.6));
	
	vec3 ro=cameraPosition;
	vec3 rd=lookat(vec3(-0.1)-ro)*normalize(vec3(fragCoord.xy - vec2(0.5),1.0));

	float t=DDE(ro,rd)*rndStart(fragCoord),d=0.0,od=10.0;
	vec2 edge=vec2(-1.0);
	bool bGrab=false;
	vec3 col=vec3(0);
	for(int i=0;i<iteration;i++){
		t+=d;
		d=DDE(ro+rd*t,rd);
		if(d>od){
			if(bGrab && od<t && edge.x<0.0){
				edge=vec2(edge.y,t-od);
				bGrab=false;
			}
		}else bGrab=true;
		od=d * 20 * dGlitch;
		if(t>1000.0 || d<0.00001)break;
	}
	d*=0.02;
	if(d<t && t<1000.0){
		if(edge.x>0.0)edge=edge.yx;
		edge=vec2(edge.y,t);
	}
	for(int i=0;i<2;i++){
		if(edge.y>0.0)col=Color(ro,rd,edge.y);
		edge=edge.yx;
	}
  //   float spec = 4.5;
  //   float grey = pow(col.x, spec) * 30;
	// gl_FragColor = vec4(vec3(grey),1.0);
	gl_FragColor = vec4(col, 1);
    // if(col.x > 0) {
    // float spec = 4.5;
    // float grey = pow(col.x, spec) * 30;
	// gl_FragColor = vec4(grey+0.5,1-grey,0,1.0);
    // }
    // else {
	// gl_FragColor = vec4(0,0,0,1.0);
    // }
}
