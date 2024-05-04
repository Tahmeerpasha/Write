import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { setCookie } from 'cookies-next';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Function to set access token in a cookie with expiry based on token itself
 export const setTokenCookie = (name:string,token:string) => {
    // Decode the access token payload to extract expiration time (exp)
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenPayload.exp * 1000; // Convert expiration time to milliseconds

    // Calculate the remaining time until token expiration
    const currentTime = Date.now();
    const timeUntilExpiry = expirationTime - currentTime;

    // Set the access token in the cookie with maxAge based on remaining time until expiry
    setCookie( name, token, {
        maxAge: Math.floor(timeUntilExpiry / 1000), // Convert milliseconds to seconds
        path: '/', // Specify the path for the cookie
    });
};