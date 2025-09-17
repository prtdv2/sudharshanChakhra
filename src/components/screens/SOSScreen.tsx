import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import EmergencyButton from '../EmergencyButton';
import { MapPin, Clock, Phone } from 'lucide-react';

interface SOSScreenProps {
  onNavigate: (screen: string) => void;
}

const SOSScreen: React.FC<SOSScreenProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">Purvanchal</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-medium">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Are you in an emergency?</h1>
        <p className="text-muted-foreground text-lg">Press the button below and help will reach you soon</p>
      </div>

      {/* Emergency Button */}
      <div className="flex justify-center py-12">
        <EmergencyButton />
      </div>

      {/* Emergency Instructions */}
      <Card className="p-6 bg-muted/30 border-2">
        <h3 className="font-semibold mb-5 text-foreground text-lg">Emergency Response Process:</h3>
        <div className="space-y-4 text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-emergency text-emergency-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">1</div>
            <span className="font-medium">Your location will be shared with emergency services</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-emergency text-emergency-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">2</div>
            <span className="font-medium">Emergency contacts will be notified automatically</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-emergency text-emergency-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">3</div>
            <span className="font-medium">First responders will be dispatched to your location</span>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-6 border-2">
        <h3 className="font-semibold mb-5 text-foreground text-lg">First Responders are enroute to you</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Emergency Contact</p>
                <p className="text-muted-foreground">Primary responder</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button size="sm" className="bg-emergency hover:bg-emergency/90 px-4">
                Call
              </Button>
              <Button size="sm" variant="outline" className="px-4">
                Message
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Back to Safety */}
      <div className="text-center pt-4">
        <Button 
          variant="outline" 
          onClick={() => onNavigate('home')}
          className="px-10 py-3 text-base"
          size="lg"
        >
          Back to Safety Dashboard
        </Button>
      </div>
    </div>
  );
};

export default SOSScreen;