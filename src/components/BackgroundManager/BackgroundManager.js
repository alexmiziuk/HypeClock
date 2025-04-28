import { useState, useEffect, useMemo, useCallback } from 'react';
import './BackgroundManager.scss';
import defaultBackgroundImg from '../../assets/images/background.jpg';
import { BackgroundContext } from '../../backgroundContext';


const ImageMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const BackgroundManager = ({ children }) => {
	
	const [backgrounds, setBackgrounds] = useState([]);
	const [currentBg, setCurrentBg] = useState(defaultBackgroundImg);
	const [error, setError] = useState('');

	const saveCurrentBg = (url) => {
		 setCurrentBg(url);
		 localStorage.setItem('currentBackground', url);
	};

	useEffect(() => {
		 const saved = JSON.parse(localStorage.getItem('backgrounds') || '[]');
		 const savedCurrent = localStorage.getItem('currentBackground');

		 const isValidCurrent = saved.some(bg => bg.url === savedCurrent);

		 setBackgrounds(saved);

		 if (savedCurrent && isValidCurrent) {
			  saveCurrentBg(savedCurrent);
		 } else if (saved.length > 0) {
			  saveCurrentBg(saved[0].url);
		 } else {
			  saveCurrentBg(defaultBackgroundImg);
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

	const handleFileUpload = useCallback(async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setError('');

		if (!ImageMimeTypes.includes(file.type)) {
			setError('Недопустимый формат файла');
			return;
		}

		if (backgrounds.length >= 9) {
			setError('Достигнут лимит. Удалите старые фоны');
			return;
		}

		try {
			const compressed = await compressImage(file);

			const newBackgrounds = [
				{ url: compressed, timestamp: Date.now() },
				...backgrounds
			].slice(0, 9);

			localStorage.setItem('backgrounds', JSON.stringify(newBackgrounds));
			setBackgrounds(newBackgrounds);
			saveCurrentBg(compressed);
		} catch (err) {
			setError('Ошибка обработки изображения');
			saveCurrentBg(defaultBackgroundImg);
		}
	}, [backgrounds]);

	const deleteBackground = useCallback((index) => {
		const newBackgrounds = backgrounds.filter((_, i) => i !== index);
		localStorage.setItem('backgrounds', JSON.stringify(newBackgrounds));
		setBackgrounds(newBackgrounds);

		if (currentBg === backgrounds[index].url) {
			const newCurrent = newBackgrounds.length > 0
				? newBackgrounds[0].url
				: defaultBackgroundImg;
			saveCurrentBg(newCurrent);
		}
	}, [backgrounds, currentBg]);

	const resetBackground = useCallback(() => {
		localStorage.removeItem('backgrounds');
		localStorage.removeItem('currentBackground');
		setBackgrounds([]);
		saveCurrentBg(defaultBackgroundImg);
	}, []);

	const contextValue = useMemo(() => ({
		 handleFileUpload,
		 resetBackground,
		 error,
		 backgrounds,
		 currentBg,
		 setCurrentBg: saveCurrentBg,
		 deleteBackground,
		 ImageMimeTypes
	}), [error, backgrounds, currentBg, handleFileUpload, resetBackground, deleteBackground]);

	return (
		 <BackgroundContext.Provider value={contextValue}>
			  <div
					className="app-wrapper"
					style={{
						 backgroundImage: currentBg ? `url(${currentBg})` : 'none',
						 backgroundSize: 'cover',
						 backgroundPosition: 'center'
					}}
			  >
					<div className="content">{children}</div>
			  </div>
		 </BackgroundContext.Provider>
	);
};

export default BackgroundManager;