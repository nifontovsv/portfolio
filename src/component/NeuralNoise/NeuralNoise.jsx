import React, { useEffect, useRef } from 'react';

const NeuralNoise = () => {
	const canvasRef = useRef(null);
	const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
	const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
	let gl, uniforms;

	const initShader = (canvas) => {
		const vsSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;

      void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

		const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.0);
        vec2 res = vec2(0.0);
        float scale = 8.0;

        for (int j = 0; j < 13; j++) {
          uv = rotate(uv, 1.0);
          sine_acc = rotate(sine_acc, 1.0);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer);
          res += (0.5 + 0.5 * cos(layer)) / scale;
          scale *= (1.2 - 0.07 * p);
					
        }
        return res.x + res.y;
      }

      void main() {
        vec2 uv = 0.5 * vUv;
        uv.x *= u_ratio;

        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0.0, 1.0);
        p = 0.5 * pow(1.0 - p, 2.0);

        // float t = 0.001 * u_time;
				float t = .0005 * u_time; // В два раза медленнее
        vec3 color = vec3(0.0);

        float noise = neuro_shape(uv, t, p);

        // noise = 1.2 * pow(noise, 3.0);
        // noise += pow(noise, 10.0);
				// noise = 1.2 * pow(noise, 2.5); // Плавнее
				noise = pow(noise, 4.); // Увеличьте степень
				noise += pow(noise, 8.);
        noise = max(0.0, noise - 0.5);
        noise *= (1.0 - length(vUv - 0.5));

        color = normalize(vec3(0.2, 0.5 + 0.4 * cos(3.0 * u_scroll_progress), 0.5 + 0.5 * sin(3.0 * u_scroll_progress)));

        color = color * noise;

        gl_FragColor = vec4(color, noise);
      }
    `;

		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

		if (!gl) {
			alert('WebGL is not supported by your browser.');
			return;
		}

		const createShader = (source, type) => {
			const shader = gl.createShader(type);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error('Shader error: ', gl.getShaderInfoLog(shader));
				gl.deleteShader(shader);
				return null;
			}

			return shader;
		};

		const vertexShader = createShader(vsSource, gl.VERTEX_SHADER);
		const fragmentShader = createShader(fsSource, gl.FRAGMENT_SHADER);

		const program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('Program error: ', gl.getProgramInfoLog(program));
			return;
		}

		gl.useProgram(program);

		const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
		const vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		const positionLocation = gl.getAttribLocation(program, 'a_position');
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		uniforms = {
			u_time: gl.getUniformLocation(program, 'u_time'),
			u_ratio: gl.getUniformLocation(program, 'u_ratio'),
			u_pointer_position: gl.getUniformLocation(program, 'u_pointer_position'),
			u_scroll_progress: gl.getUniformLocation(program, 'u_scroll_progress'),
		};

		return gl;
	};

	const resizeCanvas = () => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth * devicePixelRatio;
		canvas.height = window.innerHeight * devicePixelRatio;
		gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
		gl.viewport(0, 0, canvas.width, canvas.height);
	};

	let lastTime = 0;
	const fps = 60;

	const render = (currentTime) => {
		const deltaTime = currentTime - lastTime;
		if (deltaTime < 1000 / fps) {
			requestAnimationFrame(render);
			return;
		}
		lastTime = currentTime;

		// Остальной код рендера
		pointer.x += (pointer.tX - pointer.x) * 0.1;
		pointer.y += (pointer.tY - pointer.y) * 0.1;

		gl.uniform1f(uniforms.u_time, currentTime);
		gl.uniform2f(
			uniforms.u_pointer_position,
			pointer.x / window.innerWidth,
			1 - pointer.y / window.innerHeight
		);
		gl.uniform1f(
			uniforms.u_scroll_progress,
			window.pageYOffset / (2 * window.innerHeight)
		);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		requestAnimationFrame(render);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const glContext = initShader(canvas);
		resizeCanvas();
		render();

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: '-100',
			}}
		/>
	);
};

export default NeuralNoise;
