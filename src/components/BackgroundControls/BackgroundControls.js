import React from 'react';
import './BackgroundControls.scss';
import { useContext } from 'react';
import { BackgroundContext } from '../../backgroundContext';

function BackgroundControls() {
    const {
        handleFileUpload,
        resetBackground,
        error,
        backgrounds,
        currentBg,
        setCurrentBg, 
        deleteBackground,
        ImageMimeTypes
    } = useContext(BackgroundContext);

    return (
        <div className="background-controls">
            <label className="upload-button">
                📤 Upload background
                <input
                    type="file"
                    accept={ImageMimeTypes.join(',')}
                    onChange={handleFileUpload}
                    hidden
                />
            </label>

            <button className="reset-button" onClick={resetBackground}>
                🔄 Reset
            </button>

            {error && <div className="error-message">{error}</div>}

            <div className="background-history">
                {backgrounds.map((bg, index) => (
                    <div key={index} className="thumbnail-wrapper">
                        <img
                            src={bg.url}
                            alt={`Фон ${index + 1}`}
                            className={`thumbnail ${currentBg === bg.url ? 'active' : ''}`}
                            onClick={() => setCurrentBg(bg.url)} // Используем setCurrentBg (это saveCurrentBg)
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
    );
}

export default BackgroundControls;