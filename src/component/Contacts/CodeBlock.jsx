import React, { useEffect, useRef } from 'react';
import styles from './Contacts.module.scss';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const CodeBlock = ({ code, item, index }) => {
	const codeRef = useRef(null);

	useEffect(() => {
		if (codeRef.current) {
			// Обновляем содержимое блока с кодом
			codeRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
		}
	}, [code]);

	return (
		<li key={index} className={styles.formMessageListItem}>
			<span class={styles.number}>{index + 1}</span>
			<pre>
				<code ref={codeRef} className='language-javascript'>
					{item}
				</code>
			</pre>
		</li>
	);
};

export default CodeBlock;
