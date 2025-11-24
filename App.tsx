import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import ExpenseDashboard from './components/ExpenseDashboard';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LOGIN);

  const handleLogin = () => {
    // Simulating a simple login action
    setView(ViewState.DASHBOARD);
  };

  return (
    <div className="antialiased text-gray-900 bg-gray-100 h-full">
      {view === ViewState.LOGIN ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ExpenseDashboard />
      )}
    </div>
  );
};

export default App;