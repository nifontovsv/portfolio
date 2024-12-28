import React from 'react';
import styles from './Main.module.scss';
import mainImage from '../../images/mainImage.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SnakeGame from '../Projects/SnakeGame/SnakeGame';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



function Main() {
	const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
	return (
		<section className={styles.main} style={{ backgroundImage: `url(${mainImage})` }}>
			
			<div className={styles.svgOne}>
				<svg
					width='454'
					height='492'
					viewBox='0 0 864 784'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g opacity='0.4' filter='url(#filter0_f_64_2566)'>
						<path
							d='M673.469 258.482L689.984 477.861L655.759 582.726L485.295 609.598L413.003 448.57L297.588 487.343L184.059 311.368L174 177.746L452.567 174.828L523.099 285.846L673.469 258.482Z'
							fill='#43D9AD'
						/>
					</g>
					<defs>
						<filter
							id='filter0_f_64_2566'
							x='0'
							y='0.827728'
							width='863.983'
							height='782.77'
							filterUnits='userSpaceOnUse'
							color-interpolation-filters='sRGB'>
							<feFlood flood-opacity='0' result='BackgroundImageFix' />
							<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
							<feGaussianBlur stdDeviation='87' result='effect1_foregroundBlur_64_2566' />
						</filter>
					</defs>
				</svg>
			</div>
			<div className={styles.svgTwo}>
				{' '}
				<svg
					width='454'
					height='492'
					viewBox='0 0 868 831'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g opacity='0.4' filter='url(#filter0_f_64_2565)'>
						<path
							d='M477.947 656.519L264.032 605.132L174.664 540.469L201.227 369.957L376.649 350.391L375.041 228.647L577.309 174.392L707.603 205.691L625.166 471.797L497.893 504.987L477.947 656.519Z'
							fill='#4D5BCE'
						/>
					</g>
					<defs>
						<filter
							id='filter0_f_64_2565'
							x='0.664062'
							y='0.391769'
							width='880.938'
							height='830.128'
							filterUnits='userSpaceOnUse'
							color-interpolation-filters='sRGB'>
							<feFlood flood-opacity='0' result='BackgroundImageFix' />
							<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
							<feGaussianBlur stdDeviation='87' result='effect1_foregroundBlur_64_2565' />
						</filter>
					</defs>
				</svg>
			</div>

			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid size={2}>
					</Grid>
					<Grid size={10}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs className={styles.tabs} value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab className={`${styles.tab} ${styles.firstTab}`} label="_hello" {...a11yProps(0)} />
								<Tab className={`${styles.tab} ${styles.twoTab}`} label="_about-me" {...a11yProps(1)} />
								<Tab className={`${styles.tab} ${styles.threeTab}`} label="_projects" {...a11yProps(2)} />
								<Tab className={`${styles.tab} ${styles.lastTab}`} label="_contact-me" {...a11yProps(3)} />
							</Tabs>
						</Box>
					</Grid>
					<Grid size={2}>
					</Grid>
					<Grid size={10}>
						 <CustomTabPanel value={value} index={0}>
								_hello
							</CustomTabPanel>
							<CustomTabPanel value={value} index={1}>
								_about-me
							</CustomTabPanel>
							<CustomTabPanel value={value} index={2}>
								_projects
								<SnakeGame/>
							</CustomTabPanel>
							<CustomTabPanel value={value} index={2}>
								_contact-me
							</CustomTabPanel>
					</Grid>
				</Grid>
			</Box>
		</section>
	);
}

export default Main;
