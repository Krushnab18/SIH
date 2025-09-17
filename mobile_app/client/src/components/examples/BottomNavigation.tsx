import { useState } from 'react';
import BottomNavigation from '../BottomNavigation';

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState("home");
  
  return (
    <div className="h-20 relative">
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}