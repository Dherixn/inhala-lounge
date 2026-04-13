varying vec2 vUv;
uniform vec2 uMouse;
uniform float uTime;
uniform float uScrollSpeed;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Subtle vertex displacement based on mouse proximity
    float dist = distance(uv, uMouse * 0.5 + 0.5);
    pos.z += sin(dist * 8.0 - uTime * 0.8) * 0.03 * (1.0 + uScrollSpeed * 2.0);
    
    // Gentle wave motion
    pos.z += sin(pos.x * 3.0 + uTime * 0.5) * 0.02;
    pos.z += cos(pos.y * 2.0 + uTime * 0.3) * 0.015;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
