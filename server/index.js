require('dotenv').config(); // Загружает переменные окружения из файла .env (например, SMTP_HOST, EMAIL, RECAPTCHA_SECRET_KEY). Это позволяет безопасно хранить конфиденциальные данные вне кода.

const express = require('express'); // Фреймворк для создания веб-серверов. Используется для обработки HTTP-запросов.

const cors = require('cors'); // Middleware для настройки Cross-Origin Resource Sharing (CORS), чтобы фронтенд с http://localhost:3000 мог отправлять запросы на сервер.

const nodemailer = require('nodemailer'); // Библиотека для отправки email через SMTP.

const fetch = require('node-fetch'); // Используется для проверки reCAPTCHA через API Google (замена axios или встроенного fetch в Node.js, требует установки пакета node-fetch).

const { body, validationResult } = require('express-validator'); // Инструмент для валидации данных в запросах (например, проверка корректности email).

// 2. Настройка Express
const app = express(); //Создает экземпляр Express-приложения.
app.use(express.json()); // Middleware, который парсит входящие запросы с телом в формате JSON, преобразуя их в объект req.body.

// Настраивает CORS, разрешая запросы только с http://localhost:3000 и только методом POST. Это предотвращает нежелательные запросы с других источников.
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['POST'],
	})
);

// 3. Настройка Nodemailer
const transporter = nodemailer.createTransport({
	//Создает объект для отправки email через SMTP.
	host: process.env.SMTP_HOST, // Адрес SMTP-сервера (например, smtp.gmail.com), берется из .env.
	port: process.env.SMTP_PORT || 465, // Порт SMTP (по умолчанию 465 для SSL), тоже из .env.
	secure: true, // Указывает, что соединение защищено SSL/TLS.
	auth: {
		user: process.env.EMAIL, // Учетные данные для авторизации на SMTP-сервере:
		pass: process.env.EMAIL_PASSWORD, // Пароль или токен приложения (для Gmail требуется App Password, если включена двухфакторная аутентификация).
	},
});

// 4. Проверка переменных окружения
//Проверяет, что все необходимые переменные окружения определены в .env.
// Если хотя бы одна отсутствует, выводит ошибку в консоль и завершает процесс (process.exit(1)), чтобы сервер не запустился с некорректной конфигурацией.
if (
	!process.env.SMTP_HOST ||
	!process.env.EMAIL ||
	!process.env.EMAIL_PASSWORD ||
	!process.env.RECAPTCHA_SECRET_KEY
) {
	console.error('Ошибка: отсутствуют необходимые переменные окружения!');
	process.exit(1);
}

// 5. Маршрут для отправки email
app.post(
	'/send-email', // Определяет POST-обработчик для маршрута /send-email.

	[
		body('email').isEmail().withMessage('Введите правильный email'), // Проверяет, что поле email в req.body — валидный email.
		body('message').notEmpty().withMessage('Сообщение не может быть пустым'), // Убеждается, что поле message не пустое.
		body('name').notEmpty().withMessage('Имя не может быть пустым'), // Проверяет, что поле name не пустое.
		body('recaptchaToken')
			.notEmpty() // Убеждается, что токен reCAPTCHA присутствует.
			.withMessage('Необходима проверка reCAPTCHA'), // Задает пользовательское сообщение об ошибке для каждой проверки.
	],

	// Асинхронная функция-обработчик запроса.
	async (req, res) => {
		// 6. Валидация запроса
		const errors = validationResult(req); // Собирает результаты валидации из массива проверок.

		// Если есть ошибки, логирует их и возвращает ответ с кодом 400 Bad Request и массивом ошибок в формате JSON.
		if (!errors.isEmpty()) {
			console.log('Ошибки валидации:', errors.array());
			return res.status(400).json({ errors: errors.array() });
		}

		// 7. Извлечение данных из запроса
		const { recaptchaToken, email, message, name } = req.body; //Деструктурирует req.body, извлекая поля recaptchaToken, email, message, и name.
		console.log('Получен запрос:', { email, message, name, recaptchaToken }); //Логирует полученные данные для отладки.

		// 8. Проверка reCAPTCHA
		try {
			// fetch: Отправляет POST-запрос к Google reCAPTCHA API для проверки токена.
			// URL: https://www.google.com/recaptcha/api/siteverify.
			// Параметры: secret (секретный ключ из .env) и response (токен от клиента).
			const response = await fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
				{ method: 'POST' }
			);

			// Получает ответ в формате JSON (например, { success: true } или { success: false, 'error-codes': [...] }).
			const data = await response.json();
			console.log('Ответ reCAPTCHA:', data);

			// Если проверка не пройдена, возвращает 400 с сообщением об ошибке.
			if (!data.success) {
				return res
					.status(400)
					.json({ error: 'Пожалуйста, подтвердите, что вы не бот.' });
			}
			//Обрабатывает ошибки сети или API, возвращая 500 Internal Server Error.
		} catch (error) {
			console.error('Ошибка проверки reCAPTCHA:', error);
			return res.status(500).json({ error: 'Ошибка проверки reCAPTCHA.' });
		}

		// Объект с параметрами письма:
		const mailOptions = {
			from: email, //  Адрес отправителя (взято из формы).
			to: process.env.EMAIL_RECEIVER, // Получатель из .env (EMAIL_RECEIVER).
			subject: 'Новое сообщение с сайта', // Тема письма.
			text: `От: ${email}\nСообщение: ${message}\nИмя: ${name}`, // Текст письма, форматированный с данными из формы.
			replyTo: email, // Адрес для ответа (тот же email).
		};

		//Успешная отправка: Логирует успех и возвращает JSON с кодом 200.
		// Ошибка: Логирует ошибку и возвращает 500.
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

// 10. Запуск сервера
// Запускает сервер на порту 4000 и выводит сообщение в консоль.
app.listen(4000, () => {
	console.log('HTTP сервер запущен на порту 4000');
});
