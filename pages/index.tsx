import { useState } from 'react';

export default function Marketing() {
  const [isChecking, setIsChecking] = useState(false);

  const handleAuthCheck = async (redirectPath: string) => {
    setIsChecking(true);
    
    try {
      // Check if user is already authenticated
      const response = await fetch("http://localhost:8080/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({
          query: `
            query Me {
              me {
                id
                email
                firstName
                lastName
              }
            }
          `,
        }),
      });

      const result = await response.json();

      if (result.data?.me) {
        // User is authenticated, redirect to dashboard
        window.location.href = "http://localhost:3000";
      } else {
        // Not authenticated, redirect to specified page
        window.location.href = redirectPath;
      }
    } catch (error) {
      // Error checking auth, redirect to specified page
      console.error("Error checking authentication:", error);
      window.location.href = redirectPath;
    } finally {
      setIsChecking(false);
    }
  };

  const handleSignupClick = () => {
    handleAuthCheck("http://localhost:3005");
  };

  const handleLoginClick = () => {
    handleAuthCheck("http://localhost:3005/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200 p-4">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Welcome to CodeStandoff
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
        Join the coding competition platform
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSignupClick}
          disabled={isChecking}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChecking ? 'Checking...' : 'Sign Up'}
        </button>
        <button
          onClick={handleLoginClick}
          disabled={isChecking}
          className="px-8 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChecking ? 'Checking...' : 'Log In'}
        </button>
      </div>
    </div>
  );
}

