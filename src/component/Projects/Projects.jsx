import * as React from 'react';
import ToDoList from './ToDoList/ToDoList';
import styles from './Projects.module.scss';

function Projects() {
	return (
		<div className={styles.projects}>
			Projects
			<div class={styles.aboutLeft}>
				<a href='/todo'>todo</a>
				<a href='/snake'>snake</a>
			</div>
			<div class={styles.aboutRight}>middle</div>
		</div>
	);
}

export default Projects;
