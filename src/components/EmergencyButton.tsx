import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, MessageCircle } from 'lucide-react';

interface EmergencyButtonProps {
  className?: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ className = "" }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const handleEmergencyPress = () => {
    setIsPressed(true);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsPressed(false);
          toast({
            title: "Emergency Alert Sent!",
            description: "Help is on the way. Stay safe.",
            variant: "default",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancel = () => {
    setIsPressed(false);
    setCountdown(0);
    toast({
      title: "Emergency Cancelled",
      description: "Emergency alert has been cancelled.",
      variant: "default",
    });
  };

  if (isPressed && countdown > 0) {
    return (
      <div className={`flex flex-col items-center space-y-6 ${className}`}>
        <div className="relative">
          <div className="w-48 h-48 bg-gradient-emergency rounded-full flex items-center justify-center shadow-emergency emergency-pulse">
            <div className="text-white text-center">
              <div className="text-4xl font-bold mb-2">{countdown}</div>
              <div className="text-lg">Sending Alert...</div>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="lg"
          onClick={handleCancel}
          className="px-8"
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      <button
        onClick={handleEmergencyPress}
        className="w-48 h-48 bg-gradient-emergency rounded-full flex items-center justify-center shadow-emergency hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-white/20"
      >
        <div className="text-white text-center">
          <div className="text-3xl font-bold mb-2">SOS</div>
          <div className="text-sm opacity-90">Emergency</div>
        </div>
      </button>
      
      <div className="flex space-x-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Call
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Message
        </Button>
      </div>
    </div>
  );
};

export default EmergencyButton;