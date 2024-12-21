export const validateEmail = (email) => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  export const validateCanadianPhone = (phone) => {
    if (!phone) return false;
    return /^\+1\d{10}$/.test(phone);
  };
  
  export const validatePassword = (password) => {
    if (!password) return false;
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };
  
  export const validateFullName = (fullName) => {
    if (!fullName) return false;
    return /^[a-zA-Z\s]+$/.test(fullName);
  };
  
  export const validateDay = (day) => {
    if (!day) return false;
    const dayInt = parseInt(day, 10);
    return dayInt >= 1 && dayInt <= 31;
  };
  
  export const validateMonth = (month) => {
    if (!month) return false;
    const monthInt = parseInt(month, 10);
    return monthInt >= 1 && monthInt <= 12;
  };
  
  export const validateYear = (year) => {
    if (!year) return false;
    const yearInt = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    return yearInt > 1900 && yearInt <= currentYear;
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };