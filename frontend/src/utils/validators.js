export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
export const isStrongPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?-]{8,}$/.test(String(password || ""));

/*
ATTRIBUTES:
    Website: SecureBlog Activity
    Author: talia0404
    URL:https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
    Accessed on: 2025-10-01
*/
