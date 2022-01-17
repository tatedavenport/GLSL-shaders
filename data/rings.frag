// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  vec2 distanceFromCenter = vec2(vertTexCoord.s - .5, vertTexCoord.t - .5);
  float circleRadius = .075;
  if (length(distanceFromCenter) < .5) {
    bool inCircle = false;
    for (int i = 0; i < 8; i++) {
      float radianVal = radians(i * 360/8);
      vec2 circleCenter = vec2(cos(radianVal) * .35, sin(radianVal) * .35) + vec2( .5, .5);
      vec2 distanceFromCircleCenter = vec2(vertTexCoord.s - circleCenter.s, vertTexCoord.t - circleCenter.t);
      if (length(distanceFromCircleCenter) < circleRadius) {
        inCircle = true;
      }
    }
    if (inCircle) {
      gl_FragColor = vec4(0.0, 0.7, 1.0, 0);
    } else {
      if (vertTexCoord.s > .4 && vertTexCoord.s < .6 && vertTexCoord.t > .4 && vertTexCoord.t < .6) {
        gl_FragColor = vec4(0.0, 0.7, 1.0, 0);
      } else {
        gl_FragColor = vec4(0.0, 0.7, 1.0, 1);
      }
    }
  } else {
    gl_FragColor = vec4(0.0, 0.7, 1.0, 0);
  }
}

