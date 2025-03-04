import React, { useState } from 'react';
import Button from '../common/Button/Button';
import styles from './Footer.module.scss';
import { SlSocialVkontakte } from 'react-icons/sl';
import { RiTelegram2Line } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa';
import { Tooltip, Snackbar } from '@mui/material';
import { FaRegCopy } from 'react-icons/fa';

function Footer() {
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const textToCopy = '@nifontovsv';

	const handleCopy = () => {
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setOpenSnackbar(true); // Показываем Snackbar после копирования
			})
			.catch((err) => {
				console.error('Ошибка при копировании:', err);
			});
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false); // Закрытие Snackbar
	};
	return (
		<footer className={styles.footer}>
			<div className={styles.footerTitle}>
				<p>find me in:</p>
			</div>
			<div className={styles.footerItem}>
				<Button
					href='https://vk.com/id698321460'
					title={
						<SlSocialVkontakte style={{ width: '20px', height: '20px' }} />
					}
				/>
			</div>
			<Tooltip
				title={
					<span>
						@nifontovsv{' '}
						<FaRegCopy onClick={handleCopy} style={{ cursor: 'pointer' }} />{' '}
					</span>
				}
				arrow
				placement='top'
			>
				<div className={styles.footerItem}>
					<Button
						title={
							<RiTelegram2Line style={{ width: '20px', height: '20px' }} />
						}
					/>

					<Snackbar
						style={{ position: 'absolute', top: -80, left: '100px' }}
						open={openSnackbar}
						autoHideDuration={1000} // Время отображения Snackbar
						onClose={handleCloseSnackbar}
						message='Скопировано!'
						sx={{
							'& .MuiSnackbarContent-root': {
								fontSize: '12px',
								minWidth: 'auto',
								maxWidth: 'none',
								padding: '0 10px',
							},
						}}
					/>
				</div>
			</Tooltip>
			<div className={styles.footerItem}>
				<Button
					href='https://github.com/nifontovsv'
					title={<FaGithub style={{ width: '20px', height: '20px' }} />}
				/>
			</div>
		</footer>
	);
}

export default Footer;
