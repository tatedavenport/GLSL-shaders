// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform sampler2D other_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;

void main() {
  // blur color first
  float sOffset = .01;
  float tOffset = .01;

  vec4 diffuse_color1 = texture2D(my_texture, vertTexCoord.xy + vec2(-sOffset, tOffset));
  vec4 diffuse_color2 = texture2D(my_texture, vertTexCoord.xy + vec2(0, tOffset));
  vec4 diffuse_color3 = texture2D(my_texture, vertTexCoord.xy + vec2(sOffset, tOffset));
  vec4 diffuse_color4 = texture2D(my_texture, vertTexCoord.xy + vec2(-sOffset, 0));
  vec4 diffuse_color5 = texture2D(my_texture, vertTexCoord.xy);
  vec4 diffuse_color6 = texture2D(my_texture, vertTexCoord.xy + vec2(sOffset, 0));
  vec4 diffuse_color7 = texture2D(my_texture, vertTexCoord.xy + vec2(-sOffset, -tOffset));
  vec4 diffuse_color8 = texture2D(my_texture, vertTexCoord.xy + vec2(0, -tOffset));
  vec4 diffuse_color9 = texture2D(my_texture, vertTexCoord.xy + vec2(sOffset, -tOffset));

  vec4 sum_color = diffuse_color1 + diffuse_color2 + diffuse_color3 + diffuse_color4 + diffuse_color5 + diffuse_color6 + diffuse_color7 + diffuse_color8 + diffuse_color9;
  vec4 average_color = sum_color / 9;

  // do dog stuff
  vec4 diffuse_color;
  if (vertTexCoord.s > .5 && vertTexCoord.s < 0.75 && vertTexCoord.t < 0.75 && vertTexCoord.t > .5) {
    diffuse_color = texture2D(other_texture, vec2(vertTexCoordL.x * 4, vertTexCoordL.y * 4));
    if (diffuse_color.g < .5 || diffuse_color.r > .48 || diffuse_color.b > .48) {
      average_color = diffuse_color;
    }
  }
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * average_color.rgb, 1.0);
}

