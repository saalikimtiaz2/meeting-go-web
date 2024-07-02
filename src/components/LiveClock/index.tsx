import React, { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return (
      <>
        {hours}:{minutes}
        <div className="text-lg ml-2 font-Oswald inline-block w-8">{seconds} </div>
      </>
    );
  };
  const formatDate = (date: Date): string => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const monthsOfYear: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dayName = daysOfWeek[date.getDay()];
    const monthName: string = monthsOfYear[date.getMonth()];

    const day = date.getDate().toString().padStart(2, '0');
    // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName}, ${year}`;
  };

  return (
    <div className="w-max">
      <h2 className={'text-white text-[94px] leading-none font-Oswald'}>
        {formatTime(time)}
      </h2>
      <p className="text-lg text-center">{formatDate(time)}</p>
    </div>
  );
};

export default Clock;
