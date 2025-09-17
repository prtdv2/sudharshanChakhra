import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafetyLogo from '../SafetyLogo';
import AlertCard, { Alert } from '../AlertCard';
import { MapPin, Shield, Phone, Users } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const recentAlerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Potential Danger Zone',
      message: 'You are approaching an area with high reported accidents. Please be vigilant.',
      location: 'Purvanchal',
      time: '2 min ago',
      actionRequired: true
    }
  ];

  const quickActions = [
    {
      id: 'emergency',
      title: 'Emergency SOS',
      description: 'Press for immediate help',
      icon: Shield,
      color: 'bg-emergency',
      textColor: 'text-emergency-foreground',
      onClick: () => onNavigate('sos')
    },
    {
      id: 'contacts',
      title: 'Emergency Contacts',
      description: 'Call trusted contacts',
      icon: Phone,
      color: 'bg-warning',
      textColor: 'text-warning-foreground',
      onClick: () => onNavigate('contacts')
    },
    {
      id: 'location',
      title: 'Share Location',
      description: 'Send location to contacts',
      icon: MapPin,
      color: 'bg-safe',
      textColor: 'text-safe-foreground',
      onClick: () => onNavigate('location')
    },
    {
      id: 'community',
      title: 'Community Alerts',
      description: 'View local safety updates',
      icon: Users,
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      onClick: () => onNavigate('alerts')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <SafetyLogo size="xl" className="text-emergency mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-3">Sudarshan Chakra</h1>
        <p className="text-muted-foreground text-lg">Your safety companion</p>
      </div>

      {/* Live Safety Updates */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Live Safety Updates</h2>
        {recentAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.id} 
                className="p-6 cursor-pointer hover:shadow-elevated transition-all duration-300 hover:scale-105 border-2 border-border hover:border-accent/50"
                onClick={action.onClick}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className={`w-8 h-8 ${action.textColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Status */}
      <Card className="p-6 bg-safe/10 border-safe/30 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-4 bg-safe rounded-full animate-pulse shadow-sm"></div>
          <div>
            <p className="font-semibold text-safe text-lg">System Status: Active</p>
            <p className="text-muted-foreground mt-1">All safety features are operational</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomeScreen;