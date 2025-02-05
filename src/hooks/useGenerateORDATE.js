
const useGenerateORDATE = () => {

  const options = {
    timeZone: 'Asia/Manila', // Set the timezone to PST (Philippine Standard Time)
    year: 'numeric',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true // Use 12-hour format with AM/PM
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const generateDate = () => {
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  };


  const generateOR = () => `#${new Date().getFullYear()}-${new Date().getMonth() + 1}${new Date().getDate()}${new Date().getHours()}-${new Date().getMinutes()}${new Date().getSeconds()}`

  // OR number: YEAR-MONTH/DAY/HOUR/MINUTES/SECONDS

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
  };

  const formatCurrencyNotation = (value) => {
    if (value >= 1000) {
      const thousands = value / 1000;
      if (Number.isInteger(thousands)) {
        return `₱${thousands}k`; // Whole number (e.g., 1000 → ₱1k)
      } else {
        const formatted = thousands.toFixed(1); // Round to 1 decimal
        // Remove ".0" if decimal is zero (e.g., 2000.0 → ₱2k instead of ₱2.0k)
        return formatted.endsWith('.0')
          ? `₱${parseInt(thousands)}k`
          : `₱${formatted}k`;
      }
    }
    // Default currency format for values < 1000
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(value);
  };

  return { formatDate, generateOR, generateDate, formatCurrency, formatCurrencyNotation }
}

export default useGenerateORDATE