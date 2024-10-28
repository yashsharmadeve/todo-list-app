import { useState, useEffect } from 'react';

const useFormattedDate = (utcDateString: string): string => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const date = new Date(utcDateString);

    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    setFormattedDate(date.toLocaleString('en-US', options));
  }, [utcDateString]);

  return formattedDate;
};

export default useFormattedDate;
