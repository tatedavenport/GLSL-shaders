// Vertex shader
// The vertex shader is run once for every vertex
// It can change the (x,y,z) of the vertex, as well as its normal for lighting.

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;

// Come from the geometry/material of the object
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;



void main() {

  // provided
  vertColor = color;
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);

  float sin_freq_scale = 35;
  float sin_amp_scale = 25;

  float sOffset = .05;
  float tOffset = .05;
  float offset = sin(length(vec2(vertTexCoord.s - .5, vertTexCoord.t - .5)) * sin_freq_scale) * sin_amp_scale;

  float offset1 = sin(length(vec2((vertTexCoord.s - sOffset) - .5, (vertTexCoord.t) - .5)) * sin_freq_scale);
  float offset2 = sin(length(vec2((vertTexCoord.s + sOffset) - .5, (vertTexCoord.t) - .5)) * sin_freq_scale);
  float offset3 = sin(length(vec2((vertTexCoord.s) - .5, (vertTexCoord.t - tOffset) - .5)) * sin_freq_scale);
  float offset4 = sin(length(vec2((vertTexCoord.s) - .5, (vertTexCoord.t + tOffset) - .5)) * sin_freq_scale);


  vec3 new_normal = normal.xyz;
  new_normal.x = new_normal.x - (offset1 - offset2);
  new_normal.y = new_normal.y - (offset3 - offset4);

  vertNormal = normalize(normalMatrix * new_normal);
  vec3 vertex_holder = vertex.xyz;
  vertex_holder = vertex.xyz + normalize(normal) * offset * -1;

  gl_Position = transform * vec4(vertex_holder.x,vertex_holder.y,vertex_holder.z,1); 
  vertLightDir = normalize(-lightNormal);

}
