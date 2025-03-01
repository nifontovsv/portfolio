require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['POST'],
	})
);

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT || 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

if (
	!process.env.SMTP_HOST ||
	!process.env.EMAIL ||
	!process.env.EMAIL_PASSWORD ||
	!process.env.RECAPTCHA_SECRET_KEY
) {
	console.error('Ошибка: отсутствуют необходимые переменные окружения!');
	process.exit(1);
}

app.post(
	'/send-email',
	[
		body('email').isEmail().withMessage('Введите правильный email'),
		body('message').notEmpty().withMessage('Сообщение не может быть пустым'),
		body('name').notEmpty().withMessage('Имя не может быть пустым'),
		body('recaptchaToken')
			.notEmpty()
			.withMessage('Необходима проверка reCAPTCHA'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('Ошибки валидации:', errors.array());
			return res.status(400).json({ errors: errors.array() });
		}

		const { recaptchaToken, email, message, name } = req.body;
		console.log('Получен запрос:', { email, message, name, recaptchaToken });

		try {
			const response = await fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
				{ method: 'POST' }
			);
			const data = await response.json();
			console.log('Ответ reCAPTCHA:', data);

			if (!data.success) {
				return res
					.status(400)
					.json({ error: 'Пожалуйста, подтвердите, что вы не бот.' });
			}
		} catch (error) {
			console.error('Ошибка проверки reCAPTCHA:', error);
			return res.status(500).json({ error: 'Ошибка проверки reCAPTCHA.' });
		}

		const mailOptions = {
			from: email,
			to: process.env.EMAIL_RECEIVER,
			subject: 'Новое сообщение с сайта',
			text: `От: ${email}\nСообщение: ${message}\nИмя: ${name}`,
			replyTo: email,
		};

		try {
			await transporter.sendMail(mailOptions);
			console.log('Email успешно отправлен!');
			res.json({ success: true, message: 'Email отправлен!' });
		} catch (error) {
			console.error('Ошибка отправки email:', error);
			res.status(500).json({ error: 'Ошибка при отправке, попробуйте снова.' });
		}
	}
);

app.listen(4000, () => {
	console.log('HTTP сервер запущен на порту 4000');
});
