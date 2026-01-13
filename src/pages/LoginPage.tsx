import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-md space-y-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Post Scheduler
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Schedule your social media posts with ease
                    </p>
                </div>

                <LoginForm />

                <div className="text-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
                    <Link
                        to="/register"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
