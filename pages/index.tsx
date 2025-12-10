import { useState } from 'react';

export default function Marketing() {
  const [isChecking, setIsChecking] = useState(false);

  const handleSignupClick = async () => {
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
        // Not authenticated, redirect to signup page
        window.location.href = "http://localhost:3005";
      }
    } catch (error) {
      // Error checking auth, redirect to signup page
      console.error("Error checking authentication:", error);
      window.location.href = "http://localhost:3005";
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">Welcome to Marketing</h1>
      <button
        onClick={handleSignupClick}
        disabled={isChecking}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isChecking ? 'Checking...' : 'Sign Up'}
      </button>
    </div>
  );
}

