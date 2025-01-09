import React, { useState } from 'react';
import styles from './Contacts.module.scss';
import TabList from '../About/TabList/TabList';
import TabContent from '../About/TabContent/TabContent';
import MenuList from '../About/MenuList/MenuList';
import CodeBlock from '../CodeBlock/CodeBlock';

function Contacts() {
	const [isOpen, setIsOpen] = useState(true);
	const [openTabs, setOpenTabs] = useState([]);
	const [activeTab, setActiveTab] = useState('');
	const [formArea, setFormArea] = useState('');
	const [formInputName, setFormInputName] = useState('');

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
			setActiveTab(updatedTabs.length ? updatedTabs[updatedTabs.length - 1] : '');
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
		`name: "${formInputName}",`,
		`email: "nifontovxv@gmail.com",`,
		`message: "${formArea}",`,
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
						<button onClick={() => setIsOpen(!isOpen)} className={styles.dropdownToggle}>
							{isOpen ?
								<svg
									width='9'
									height='7'
									viewBox='0 0 9 7'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
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
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M6.96045 4.80914L0.960449 9.05916L0.960449 0.559128L6.96045 4.80914Z'
										fill='white'
									/>
								</svg>
							}
						</button>
						<span className={styles.personalInfo} onClick={() => setIsOpen(!isOpen)}>
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
						{isOpen && <MenuList menuList={menuList} handleTabChange={handleTabChange} />}
					</div>
					<div className={styles.aboutMiddle}>
						{/* <TabContent activeTab={activeTab} aboutArr={aboutArr} /> */}
						<form className={styles.form} action=''>
							<label>
								_name:
								<input
									placeholder='enter your name'
									value={formInputName}
									onChange={(e) => setFormInputName(e.target.value)}
									className={styles.formInput}
									type='text'
								/>
							</label>
							<label>
								_email:
								<input className={styles.formInput} type='email' value='nifontovxv@gmail.com' />
							</label>
							<label>
								_message:
								<textarea
									placeholder='enter your message'
									maxlength='200'
									className={styles.formArea}
									name='message'
									value={formArea}
									onChange={(e) => setFormArea(e.target.value)}
									id=''
									cols='30'
									rows='10'></textarea>
							</label>
							<button className={styles.formBtn} type='button'>
								submit-message
							</button>
						</form>
					</div>
					<div className={styles.aboutRight}>
						<div className={styles.aboutRightPosts}>
							<div className={styles.formMessage}>
								<ol className={styles.formMessageList}>
									{code.map((item, index) => (
										<li key={index} className={styles.formMessageListItem}>
											<span className={styles.number}>{index + 1}</span>
											<CodeBlock index={index} key={index} code={item} />
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
