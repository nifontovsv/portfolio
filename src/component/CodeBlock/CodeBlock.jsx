import React, { useEffect, useRef } from 'react';
import styles from './CodeBlock.module.scss';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const CodeBlock = ({ code, item }) => {
	const codeRef = useRef(null);

	useEffect(() => {
		if (codeRef.current) {
			// Обновляем содержимое блока с кодом
			codeRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
		}
	}, [code]);

	return (
		<pre className={styles.pre}>
			<code
				style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
				ref={codeRef}
				className='language-javascript'>
				{item}
			</code>
		</pre>
	);
};

export default CodeBlock;
