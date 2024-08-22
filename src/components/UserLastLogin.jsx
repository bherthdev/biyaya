import React from 'react';

const UserLastLogin = ({ lastLoginTime }) => {

    const getTimeDifference = (lastLoginTime) => {
        const lastLogin = new Date(Date.parse(lastLoginTime + " UTC"));
        const now = new Date();

        const diffInMs = now - lastLogin;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = now.getMonth() - lastLogin.getMonth() +
            (12 * (now.getFullYear() - lastLogin.getFullYear()));
        const diffInYears = now.getFullYear() - lastLogin.getFullYear();

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


    return (
        <p>{getTimeDifference(lastLoginTime)}</p>
    );
};

export default UserLastLogin;
