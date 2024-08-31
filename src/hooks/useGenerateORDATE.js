
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
  
  const formatDate = ()=> new Date().toLocaleDateString('en-US', options)
  
  
  const generateOR = ()=> `#${new Date().getFullYear()}-${new Date().getMonth()+ 1}${new Date().getDate()}${new Date().getHours()}-${new Date().getMinutes()}${new Date().getSeconds()}`
  
  // OR number: YEAR-MONTH/DAY/HOUR/MINUTES/SECONDS
  
  
    return { formatDate, generateOR }
  }
  
  export default useGenerateORDATE