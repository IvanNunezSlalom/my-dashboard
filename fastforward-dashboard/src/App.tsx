import React from 'react';
import { TopNavBar } from './components/layout/TopNavBar';
import { MainContainer } from './components/layout/MainContainer';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen">
      <TopNavBar />
      <MainContainer>
        <Dashboard />
      </MainContainer>
    </div>
  );
}

export default App;
