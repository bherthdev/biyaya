import React from 'react';

const UserLastLogin = ({ lastLoginTime }) => {

    const getTimeDifference = (lastLoginTime) => {
        // Convert lastLoginTime to a Date object, assuming it's in UTC initially
        const last = new Date(lastLoginTime).toLocaleString('en-US', { timeZone: 'Asia/Manila' });
        const lastLogin = new Date(lastLoginTime);

        // Get the current time in PST (Philippine Standard Time)
        const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
        const currentPST = new Date(now);

        // Calculate the difference
        const diffInMs = currentPST - lastLogin; // Difference in milliseconds
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = currentPST.getMonth() - lastLogin.getMonth() +
            (12 * (currentPST.getFullYear() - lastLogin.getFullYear()));
        const diffInYears = currentPST.getFullYear() - lastLogin.getFullYear();

        if (diffInSeconds < 60) {
            return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInDays < 30) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        } else if (diffInMonths < 12) {
            return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
        } else {
            return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
        }
    };

    return getTimeDifference(lastLoginTime)
    
};

export default UserLastLogin;
