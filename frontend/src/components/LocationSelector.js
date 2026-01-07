import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const LocationSelector = ({ onLocationSelect, defaultLocation }) => {
  const [manualLocation, setManualLocation] = useState(defaultLocation?.address || '');
  const [coords, setCoords] = useState(defaultLocation || null);
  const [detecting, setDetecting] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: `${position.coords.latitude}, ${position.coords.longitude}`
        };
        setCoords(location);
        setManualLocation(location.address);
        onLocationSelect(location);
        setDetecting(false);
      },
      (error) => {
        console.error('Error detecting location:', error);
        alert('Failed to detect location. Please enter manually.');
        setDetecting(false);
      }
    );
  };

  const handleManualSubmit = () => {
    if (manualLocation.trim()) {
      onLocationSelect({
        address: manualLocation,
        lat: 0,
        lng: 0
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location" className="text-stone-700">Delivery Location</Label>
        <div className="flex gap-2 mt-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              id="location"
              data-testid="location-input"
              type="text"
              placeholder="Enter your address"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              onBlur={handleManualSubmit}
              className="pl-10 h-12 bg-white border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
            />
          </div>
          <Button
            data-testid="detect-location-btn"
            type="button"
            onClick={detectLocation}
            disabled={detecting}
            className="bg-accent text-white hover:bg-accent/90 h-12 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <Navigation className="w-5 h-5" />
            {detecting ? 'Detecting...' : 'Auto'}
          </Button>
        </div>
      </div>
    </div>
  );
};