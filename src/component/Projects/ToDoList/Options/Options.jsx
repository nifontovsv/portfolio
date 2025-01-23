import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color: '#fff',
		backgroundColor: 'rgba(28, 29, 34, 0.8)', // Используем RGBA для прозрачного фона
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		backdropFilter: 'blur(10px)', // Добавляет размытие для красивого прозрачного эффекта
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				marginRight: theme.spacing(1.5),
			},
			'&:hover': {
				backgroundColor: 'rgba(28, 29, 34, 0.8)', // Темный фон при наведении
			},
			'&:active': {
				backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
			},
		},
		...theme.applyStyles('dark', {
			color: theme.palette.grey[300],
		}),
	},
}));

const StyledMoreHorizIcon = styled(MoreHorizIcon)(({ theme }) => ({
	cursor: 'pointer',
	color: 'rgb(220, 220, 220)',
	fontSize: '18px',
	padding: '6px', // Дополнительное пространство вокруг иконки
	borderRadius: '50%', // Закругленные углы для эффекта круга
	transition: 'color 0.3s, transform 0.3s, background-color 0.3s', // Плавность изменений
	border: '1px solid rgba(255, 255, 255, 0.1)', // Полупрозрачный белый фон
	backgroundColor: '#24262c', // Полупрозрачный белый фон
	'&:hover': {
		color: '#fff', // Меняем цвет иконки при наведении
		transform: 'scale(1.1)', // Эффект увеличения
	},
}));

export default function Options({ deleteToDoList, handleEditTitleTodolist }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		handleEditTitleTodolist(); // Открыть режим редактирования
		handleClose(); // Закрыть меню
	};

	return (
		<div>
			<StyledMoreHorizIcon onClick={handleClick} />
			<StyledMenu
				id='demo-customized-menu'
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}>
				<MenuItem onClick={handleEdit} disableRipple>
					<EditIcon />
					Edit
				</MenuItem>
				<MenuItem onClick={deleteToDoList} disableRipple>
					<DeleteForeverIcon />
					Delete List
				</MenuItem>
			</StyledMenu>
		</div>
	);
}
