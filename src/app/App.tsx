import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { StudentDashboard } from './components/StudentDashboard';
import { DriverDashboard } from './components/DriverDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ProfileDialog } from './components/ProfileDialog';
import { SettingsDialog } from './components/SettingsDialog';
import { mockUsers, type User } from './lib/data';
import { toast } from 'sonner';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Check for saved user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`, {
        description: `Logged in as ${user.role}`,
      });
    } else {
      toast.error('Invalid credentials', {
        description: 'Please check your username and password',
      });
    }
  };

  const handleLogout = () => {

    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.info('Logged out successfully', {
      description: 'See you next time!',
    });
  };  

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!currentUser) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header
        user={currentUser}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
        onOpenSettings={() => setShowSettings(true)}
        onOpenProfile={() => setShowProfile(true)}
      />

      <main className="container mx-auto px-4 py-6">
        {currentUser.role === 'student' && (
          <StudentDashboard user={currentUser} onLogout={handleLogout} />
        )}
        {currentUser.role === 'driver' && (
          <DriverDashboard user={currentUser} onLogout={handleLogout} />
        )}
        {currentUser.role === 'admin' && (
          <AdminDashboard user={currentUser} onLogout={handleLogout} />
        )}
      </main>

      <ProfileDialog
        open={showProfile}
        onOpenChange={setShowProfile}
        user={currentUser}
      />

      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
}
