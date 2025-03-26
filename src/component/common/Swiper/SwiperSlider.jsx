import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
// Подключаем стили Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CodeBlock from '../../CodeBlock/CodeBlock';
import styles from './SwiperSlider.module.scss';

const slides = [
	[
		'1function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'2function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'3function initializeModelChunk<T>(chunk241: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'4function initializeModelChunk<T>(chunk241: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'5function initializeModelChunk<T>(chunk241: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
	[
		'6function initializeModelChunk<T>(chunk241: ResolvedModelChunk): T {',
		'const value: T = parseModel(chunk._response, chunk._value);',
		'initializedChunk._status = INITIALIZED;',
		'initializedChunk._value = value;',
		'return value;',
		'}',
	],
];

export default function SwiperSlider() {
	return (
		<Swiper
			direction='vertical' // Вертикальная прокрутка
			loop={true}
			spaceBetween={0} // Расстояние между слайдами
			slidesPerView={5}
			autoplay={{ delay: 5000 }}
			centeredSlides={true} // Центрировать текущий слайд
			effect='fade'
			fadeEffect={{ crossFade: true }}
			mousewheel={true} // Прокрутка мышью
			navigation={false} // Кнопки "Next" и "Prev"
			modules={[Pagination, Navigation, Mousewheel, Autoplay]} // Подключаем модули
			className={styles.mySwiper}
		>
			{slides.map((slide, index) => (
				<SwiperSlide key={index}>
					<ul className={styles.sliderList}>
						{slide.map((item, index) => (
							<CodeBlock index={index} key={index} code={item} />
						))}
					</ul>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
