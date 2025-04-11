import { useState, useEffect } from 'react';
import './UserLocalTime.scss';

const UserLocalTime = () => {
  const [time, setTime] = useState({
    timeString: 'Загрузка...',
    timeZone: '',
    offset: ''
  });

  useEffect(() => {
    const updateTime = () => {
		 const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = -now.getTimezoneOffset() / 60;
      const offsetString = `UTC${offset >= 0 ? '+' : ''}${offset}`;
      
      setTime({ timeString, timeZone, offset: offsetString });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  
	return (
		
    <div className="local-time">
      <h2>Ваше локальное время</h2>
      <div className="time-display">
        <span className="time">{time.timeString}</span>
        <div className="timezone-info">
          <span className="timezone">{time.timeZone}</span>
          <span className="offset">({time.offset})</span>
        </div>
      </div>
    </div>
  );
};

export default UserLocalTime;