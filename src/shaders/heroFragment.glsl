uniform float uTime;
uniform vec2 uMouse;
uniform float uScrollSpeed;
uniform float uScrollProgress;
uniform vec2 uResolution;
varying vec2 vUv;

//
// GLSL Simplex Noise (3D) — Stefan Gustavson
//
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x_4 = x_ * ns.x + ns.yyyy;
    vec4 y_4 = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x_4) - abs(y_4);
    
    vec4 b0 = vec4(x_4.xy, y_4.xy);
    vec4 b1 = vec4(x_4.zw, y_4.zw);
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    
    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Fractional Brownian Motion for layered noise
float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
        value += amplitude * snoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

void main() {
    vec2 uv = vUv;
    float time = uTime * 0.15;
    
    // -- Layered organic noise ---
    float noise1 = fbm(vec3(uv * 2.5 + time * 0.3, time * 0.2 + uScrollProgress * 0.5));
    float noise2 = fbm(vec3(uv * 4.0 - time * 0.2, time * 0.15));
    float noise3 = snoise(vec3(uv * 6.0, time * 0.4 + uScrollProgress));
    
    // Smoke flow distortion
    vec2 distortedUv = uv + vec2(noise1, noise2) * 0.08;
    float mainNoise = fbm(vec3(distortedUv * 3.0, time * 0.25));
    
    // -- Color palette: Black / Gold / Amber ---
    vec3 deepBlack   = vec3(0.02, 0.01, 0.01);
    vec3 warmBlack   = vec3(0.06, 0.03, 0.02);
    vec3 darkAmber   = vec3(0.25, 0.12, 0.04);
    vec3 richGold    = vec3(0.85, 0.65, 0.20);
    vec3 brightGold  = vec3(1.0, 0.85, 0.40);
    vec3 smokeGray   = vec3(0.15, 0.12, 0.10);
    
    // Build color from noise layers
    vec3 color = deepBlack;
    color = mix(color, warmBlack, smoothstep(-0.3, 0.3, mainNoise));
    color = mix(color, darkAmber, smoothstep(0.1, 0.6, mainNoise) * 0.4);
    color = mix(color, smokeGray, smoothstep(0.2, 0.8, noise2) * 0.2);
    
    // Gold highlights in noise peaks
    float goldMask = smoothstep(0.35, 0.65, mainNoise) * smoothstep(0.2, 0.5, noise3);
    color = mix(color, richGold, goldMask * 0.25);
    
    // Bright gold specks
    float specks = smoothstep(0.6, 0.8, noise3) * smoothstep(0.5, 0.7, mainNoise);
    color += brightGold * specks * 0.1;
    
    // -- Mouse interaction: warm glow following cursor ---
    vec2 mouseUv = uMouse * 0.5 + 0.5;
    float mouseDist = distance(uv, mouseUv);
    float mouseGlow = smoothstep(0.5, 0.0, mouseDist);
    color += richGold * mouseGlow * 0.12;
    color += brightGold * smoothstep(0.15, 0.0, mouseDist) * 0.08;
    
    // -- Scroll speed: intensify on fast scroll ---
    float speedFactor = clamp(uScrollSpeed, 0.0, 1.0);
    color += darkAmber * speedFactor * 0.15;
    // Chromatic shift on speed
    color.r += speedFactor * 0.05;
    
    // -- Scroll progress: shift palette over journey ---
    color = mix(color, color * vec3(1.0, 0.9, 0.8), uScrollProgress * 0.3);
    
    // -- Vignette ---
    float vignette = 1.0 - smoothstep(0.3, 0.9, length(uv - 0.5) * 1.4);
    color *= vignette;
    
    // -- Film grain ---
    float grain = (fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
    color += grain;
    
    // Final output
    float alpha = 0.92 - uScrollProgress * 0.15;
    gl_FragColor = vec4(color, alpha);
}
