// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

vec2 iteration(vec2 z, int iterationNum) {
  vec2 new_z = vec2(z.x,z.y);
  for (int i = 0; i < iterationNum; i++) {
    // return z * z * z + c
    float a = new_z.x;
    float b = new_z.y;

    float new_a = a * a * a - 3 * a * b * b;
    float new_b = 3 * a * a * b - b * b * b;

    new_z = vec2(new_a, new_b) + vec2(cx, cy);
  }
  return new_z;
}

void main() {

  vec2 z = vec2((vertTexCoord.x - .5)*3, (vertTexCoord.y- .5)*3);
  vec2 new_z = iteration(z, 20);
  if (length(vec2(new_z.x,new_z.y)) <= 4) {
    //white
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    //red
    gl_FragColor = vec4(1.0, 0, 0, 1.0);
  }
}