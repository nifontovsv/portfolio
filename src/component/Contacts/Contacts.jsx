import React, { useEffect, useState } from 'react';
import styles from './Contacts.module.scss';
import TabList from '../About/TabList/TabList';
import MenuList from '../About/MenuList/MenuList';
import CodeBlock from '../CodeBlock/CodeBlock';

function Contacts() {
	const [isOpen, setIsOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [openTabs, setOpenTabs] = useState([]);
	const [activeTab, setActiveTab] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [status, setStatus] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		console.log('useEffect: Загрузка reCAPTCHA начата');
		const script = document.createElement('script');
		script.src =
			'https://www.google.com/recaptcha/api.js?render=6LdekeYqAAAAALwWKOawvlP5xMBDLCTAGT7PZNUu';

		script.async = true;
		script.onload = () =>
			console.log('useEffect: reCAPTCHA скрипт успешно загружен');
		script.onerror = (e) =>
			console.error('useEffect: Ошибка загрузки reCAPTCHA:', e);
		document.body.appendChild(script);

		return () => {
			console.log('useEffect: Очистка reCAPTCHA скрипта');
			document.body.removeChild(script);
		};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('handleSubmit: Начало отправки формы');
		setStatus('Отправка...');
		setIsLoading(true);

		if (!formData.name || !formData.email || !formData.message) {
			console.log('handleSubmit: Поля формы не заполнены');
			setStatus('Пожалуйста, заполните все поля!');
			setIsLoading(false);
			return;
		}

		console.log('handleSubmit: Проверка доступности grecaptcha');
		if (typeof window.grecaptcha === 'undefined') {
			console.error('handleSubmit: reCAPTCHA не загружена');
			setStatus('Ошибка: reCAPTCHA не загружена.');
			setIsLoading(false);
			return;
		}

		try {
			console.log('handleSubmit: Ожидание готовности reCAPTCHA');
			await new Promise((resolve, reject) => {
				window.grecaptcha.ready(() => {
					console.log('handleSubmit: reCAPTCHA готова');
					resolve();
				});
				setTimeout(
					() => reject(new Error('reCAPTCHA не ответила вовремя')),
					5000
				); // Таймаут 5 секунд
			});

			console.log('handleSubmit: Выполнение grecaptcha.execute');
			const recaptchaToken = await window.grecaptcha.execute(
				'6LdekeYqAAAAALwWKOawvlP5xMBDLCTAGT7PZNUu',
				{ action: 'submit' }
			);
			console.log('handleSubmit: reCAPTCHA Token получен:', recaptchaToken);

			console.log('handleSubmit: Отправка запроса на сервер');
			const response = await fetch('http://localhost:4000/send-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...formData, recaptchaToken }),
			});

			console.log(
				'handleSubmit: Получен ответ от сервера, статус:',
				response.status
			);
			const result = await response.text(); // Используем text(), чтобы увидеть сырой ответ
			console.log('handleSubmit: Тело ответа:', result);

			if (response.ok) {
				console.log('handleSubmit: Успешная отправка');
				setStatus('Сообщение отправлено!');
				setFormData({ name: '', email: '', message: '' });
				setTimeout(() => setStatus(''), 3000);
			} else {
				console.error('handleSubmit: Ошибка сервера:', result);
				setStatus(`Ошибка: ${result || 'Что-то пошло не так.'}`);
			}
		} catch (error) {
			console.error('handleSubmit: Ошибка в процессе отправки:', error);
			setStatus(`Ошибка: ${error.message || 'Попробуйте снова.'}`);
		} finally {
			console.log('handleSubmit: Завершение процесса');
			setIsLoading(false);
		}
	};

	const menuList = [
		{ id: 'email', label: 'nifontovxv@mail.ru', title: 'email' },
		{ id: 'phone', label: '+7(911)-**-**', title: 'phone' },
	];

	const handleTabChange = (tab) => {
		setOpenTabs((prev) => (prev.includes(tab) ? prev : [...prev, tab]));
		setActiveTab(tab);
	};

	const handleTabClose = (tab) => {
		setOpenTabs((prev) => {
			const updatedTabs = prev.filter((openTab) => openTab !== tab);
			setActiveTab(
				updatedTabs.length ? updatedTabs[updatedTabs.length - 1] : ''
			);
			return updatedTabs;
		});
	};

	const date = new Date();
	const options = { weekday: 'short', month: 'short', day: '2-digit' };
	const formattedDate = date.toLocaleDateString('en-US', options);
	const code = [
		`const button = document.querySelector('#sendBtn');`,
		`${' '}`,
		`const message = {`,
		`name: "${formData.name}",`,
		`email: "${formData.email}",`,
		`message: "${formData.message}",`,
		`date: "${formattedDate}"`,
		`}`,
		`${' '}`,
		`button.addEventListener('click', () => {`,
		`form.send(message);`,
		`})`,
	];

	return (
		<div className={styles.about}>
			<div className={styles.navIcon}>
				<div>i</div>
			</div>
			<div className={styles.tabsAbout}>
				<div className={styles.navTabs}>
					<div className={styles.navTabName}>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className={styles.dropdownToggle}
						>
							{isOpen ?
								<svg
									width='9'
									height='7'
									viewBox='0 0 9 7'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z'
										fill='white'
									/>
								</svg>
							:	<svg
									width='7'
									height='10'
									viewBox='0 0 7 10'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M6.96045 4.80914L0.960449 9.05916L0.960449 0.559128L6.96045 4.80914Z'
										fill='white'
									/>
								</svg>
							}
						</button>
						<span
							className={styles.personalInfo}
							onClick={() => setIsOpen(!isOpen)}
						>
							contacts
						</span>
					</div>
					<TabList
						openTabs={openTabs}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						handleTabClose={handleTabClose}
					/>
				</div>
				<div className={styles.aboutPart}>
					<div className={`${styles.aboutLeft} ${isOpen ? styles.open : ''}`}>
						{isOpen && (
							<MenuList menuList={menuList} handleTabChange={handleTabChange} />
						)}
					</div>
					<div className={styles.aboutMiddle}>
						{isLoading ?
							<div className={styles.loading}>
								<span>Отправка сообщения...</span>
								<div className={styles.spinner}></div>
							</div>
						:	<form onSubmit={handleSubmit} className={styles.form} action=''>
								<label>
									_name:
									<input
										placeholder='enter your name'
										value={formData.name}
										onChange={handleChange}
										className={styles.formInput}
										type='text'
										name='name'
									/>
								</label>
								<label>
									_email:
									<input
										className={styles.formInput}
										type='email'
										name='email'
										placeholder='Ваш email'
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</label>
								<label>
									_message:
									<textarea
										placeholder='enter your message'
										maxLength='200'
										className={styles.formArea}
										name='message'
										value={formData.message}
										onChange={handleChange}
										required
										cols='30'
										rows='10'
									></textarea>
								</label>
								<button
									className={styles.formBtn}
									type='submit'
									disabled={
										isLoading ||
										!formData.name ||
										!formData.email ||
										!formData.message
									}
									aria-label='Submit your message'
								>
									submit-message
								</button>
								{status && <p className={styles.status}>{status}</p>}
							</form>
						}
					</div>
					<div className={styles.aboutRight}>
						<div className={styles.aboutRightPosts}>
							<div className={styles.formMessage}>
								<ol className={styles.formMessageList}>
									{code.map((item, index) => (
										<li
											key={item + index}
											className={styles.formMessageListItem}
										>
											<span className={styles.number}>{index + 1}</span>
											<CodeBlock index={index} code={item} />
										</li>
									))}
								</ol>
							</div>
						</div>
						<div className={styles.blockScroll}>
							<div className={styles.scroll}></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contacts;
