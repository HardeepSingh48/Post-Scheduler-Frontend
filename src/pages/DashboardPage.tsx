import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PostComposer } from '@/components/posts/PostComposer';
import { PostList } from '@/components/posts/PostList';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { LogOut } from 'lucide-react';
// import { LogCalendar, FileTextOut,  } from 'lucide-react';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const [refreshTrigger, setRefreshTrigger] = React.useState(0);

    const handlePostCreated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Post Scheduler
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Welcome back, {user?.username}!
                            </p>
                        </div>
                        <Button variant="outline" onClick={logout} className="gap-2">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Upcoming posts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Published</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                    </Card>
                </div> */}

                {/* Post Composer and List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <PostComposer onPostCreated={handlePostCreated} />
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Posts</CardTitle>
                                <CardDescription>Manage your scheduled and published posts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PostList refreshTrigger={refreshTrigger} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
