import { useState, useEffect } from 'react';
import './BackgroundManager.scss';
import defaultBackgroundImg from '../../assets/images/background.jpg';
const ImageMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const BackgroundManager = ({ children }) => {

	const [backgrounds, setBackgrounds] = useState([]);
	const [currentBg, setCurrentBg] = useState(defaultBackgroundImg);
	const [error, setError] = useState('');

	useEffect(() => {
		const saved = JSON.parse(localStorage.getItem('backgrounds') || '[]');
		setBackgrounds(saved);
	if (saved.length > 0) {
		setCurrentBg(saved[0].url);
	} else {
		setCurrentBg(defaultBackgroundImg);
	}
	}, []);

	const compressImage = (file) => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.src = URL.createObjectURL(file);

			img.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;

				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);

				canvas.toBlob(
					(blob) => {
						const reader = new FileReader();
						reader.onloadend = () => resolve(reader.result);
						reader.readAsDataURL(blob);
					},
					file.type,
					0.7
				);
			};

			img.onerror = reject;
		});
	};

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setError('');

		if (!ImageMimeTypes.includes(file.type)) {
			setError('Недопустимый формат файла');
			return;
		}

		if (backgrounds.length >= 10) {
			setError('Достигнут лимит. Удалите старые фоны');
			return;
		}

		try {
			const compressed = await compressImage(file);

			const newBackgrounds = [
				{ url: compressed, timestamp: Date.now() },
				...backgrounds
			].slice(0, 10);

			localStorage.setItem('backgrounds', JSON.stringify(newBackgrounds));
			setBackgrounds(newBackgrounds);
			setCurrentBg(compressed);
		} catch (err) {
			setError('Ошибка обработки изображения');
			setCurrentBg(null);
		}
	};

	const deleteBackground = (index) => {
		const newBackgrounds = backgrounds.filter((_, i) => i !== index);
		localStorage.setItem('backgrounds', JSON.stringify(newBackgrounds));
		setBackgrounds(newBackgrounds);
		if (currentBg === backgrounds[index].url) {
			setCurrentBg(null);
		}
	};

	const resetBackground = () => {
		localStorage.removeItem('backgrounds');
		setBackgrounds([]);
		setCurrentBg(defaultBackgroundImg);
	};

	return (
		<div className="app-wrapper"
			style={{
				backgroundImage: `url(${currentBg || defaultBackgroundImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>

			<div className="content">
				{children}
			</div>

			<div className="background-controls">
				<label className="upload-button">
					📤 Загрузить фон
					<input
						type="file"
						accept={ImageMimeTypes.join(',')}
						onChange={handleFileUpload}
						hidden
					/>
				</label>

				<button className="reset-button" onClick={resetBackground}>
					🔄 Сбросить
				</button>

				{error && <div className="error-message">{error}</div>}

				<div className="background-history">
					{backgrounds.map((bg, index) => (
						<div key={index} className="thumbnail-wrapper">
							<img
								src={bg.url}
								alt={`Фон ${index + 1}`}
								className={`thumbnail ${currentBg === bg.url ? 'active' : ''}`}
								onClick={() => setCurrentBg(bg.url)}
							/>
							<button
								className="delete-button"
								onClick={() => deleteBackground(index)}
							>
								×
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BackgroundManager;