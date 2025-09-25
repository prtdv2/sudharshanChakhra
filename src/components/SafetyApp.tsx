import React, { useState } from 'react';
import BottomNavigation from './BottomNavigation';
import HomeScreen from './screens/HomeScreen';
import SOSScreen from './screens/SOSScreen';
import AlertsScreen from './screens/AlertsScreen';
import GeofenceScreen from './screens/GeofenceScreen';
import { Card } from './ui/card';
import { Headphones, Map } from 'lucide-react';

const SafetyApp: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState('home');

  const handleScreenChange = (screen: string) => {
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleScreenChange} />;
      case 'alerts':
        return <AlertsScreen onNavigate={handleScreenChange} />;
      case 'sos':
        return <SOSScreen onNavigate={handleScreenChange} />;
      case 'maps':
        return <GeofenceScreen onNavigate={handleScreenChange} />;
      case 'support':
        return (
          <div className="space-y-6">
            <div className="text-center py-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">Report an issue</h1>
            </div>
            
            <Card className="p-6 bg-card/50 border border-white/10">
              {/* Issue Type Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-mustard rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Fire</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-mustard rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 20H21L12 8L3 20Z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Earthquake</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-mustard rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19H18L12 12L6 19Z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Avalanche</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-emergency rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15L13.5 3.5C13.1 3.1 12.55 2.9 12 2.9S10.9 3.1 10.5 3.5L9 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12L5.08 17.99C5.28 18.58 5.84 19 6.5 19H17.5C18.16 19 18.72 18.58 18.92 17.99L21 12L18.92 6.01Z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Accident</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-emergency rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 14L8 12L11 15L16 10L18 12L11 19L6 14Z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Flood</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L10.84 11.17L15.17 6.84L17.5 9.17L16 10.67L17.33 12L21 8.33V9H21ZM1 9H5V7H1C0.45 7 0 7.45 0 8V20C0 20.55 0.45 21 1 21H23C23.55 21 24 20.55 24 20V8C24 7.45 23.55 7 23 7H19V9H23V19H1V9Z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Other</span>
                </div>
              </div>
              
              {/* Upload Image Button */}
              <button className="w-full bg-emergency text-emergency-foreground hover:bg-emergency/90 py-4 rounded-xl mb-4 font-medium flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4C12.55 4 13 4.45 13 5V11H19C19.55 11 20 11.45 20 12C20 12.55 19.55 13 19 13H13V19C13 19.55 12.55 20 12 20C11.45 20 11 19.55 11 19V13H5C4.45 13 4 12.55 4 12C4 11.45 4.45 11 5 11H11V5C11 4.45 11.45 4 12 4Z"/>
                </svg>
                <span>Upload an image</span>
              </button>
              
              {/* Description Textarea */}
              <textarea 
                placeholder="Add a description..."
                className="w-full bg-background/50 border border-white/10 rounded-xl p-4 mb-4 text-foreground placeholder:text-muted-foreground resize-none h-24"
              />
              
              {/* Submit Button */}
              <button className="w-full bg-emergency text-emergency-foreground hover:bg-emergency/90 py-4 rounded-xl font-medium mb-4">
                Submit
              </button>
            </Card>
            
            {/* Help Button */}
            <button className="w-full bg-muted/20 border border-white/10 text-foreground hover:bg-muted/30 py-4 rounded-xl font-medium flex items-center justify-center space-x-2">
              <span>Need some help</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"/>
              </svg>
            </button>
          </div>
        );
      default:
        return <HomeScreen onNavigate={handleScreenChange} />;
    }
  };

  return (
    <div className="dark min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-lg mx-auto bg-background min-h-screen pb-20">
        <div className="p-4">
          {renderScreen()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeScreen} 
        onTabChange={handleScreenChange} 
      />
    </div>
  );
};

export default SafetyApp;