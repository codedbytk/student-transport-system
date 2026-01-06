import { useState, useEffect } from 'react';
import { MapPin, Bell, CheckCircle, XCircle, Bus, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';
import { mockRoutes, mockAnnouncements, type User } from '../lib/data';
import { RouteMap } from './RouteMap';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [availabilityConfirmed, setAvailabilityConfirmed] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(mockRoutes[0]);

  useEffect(() => {
    // Simulate checking if user already confirmed
    const confirmed = localStorage.getItem(`availability_${user.id}`);
    if (confirmed === 'true') {
      setAvailabilityConfirmed(true);
    }
  }, [user.id]);

  const handleConfirmAvailability = () => {
    setAvailabilityConfirmed(true);
    localStorage.setItem(`availability_${user.id}`, 'true');
    toast.success('Availability confirmed!', {
      description: 'You have been added to the route for today.',
    });
  };

  const handleCancelAvailability = () => {
    setAvailabilityConfirmed(false);
    localStorage.setItem(`availability_${user.id}`, 'false');
    setShowCancelDialog(false);
    toast.info('Availability cancelled', {
      description: 'You have been removed from the route for today.',
    });
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem(`availability_${user.id}`);
    }
    // Remove the same key App uses for storing the logged in user
    localStorage.removeItem('currentUser');
    onLogout();
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'delayed':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };


  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'active':
        return 'default';
      case 'delayed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6 relative min-h-screen pb-20">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {user.name}!</CardTitle>
            <CardDescription>
              Manage your bus transportation for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {!availabilityConfirmed ? (
                <Button
                  onClick={handleConfirmAvailability}
                  className="flex-1"
                  size="lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Confirm Availability for Today
                </Button>
              ) : (
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirmed for today</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelDialog(true)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Route Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="w-5 h-5" />
                My Route
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bus Number</span>
                  <span className="font-semibold">{selectedRoute.busNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Route ID</span>
                  <span className="font-semibold">{selectedRoute.routeId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Departure Time</span>
                  <span className="font-semibold">{selectedRoute.departureTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <Badge variant={getStatusBadgeVariant(selectedRoute.status)}>
                    {selectedRoute.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Occupancy</span>
                  <span className="font-semibold">
                    {selectedRoute.currentOccupancy}/{selectedRoute.capacity}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Route Stops</p>
                <div className="space-y-2">
                  {selectedRoute.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-400'}`} />
                      <span className="text-sm">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{announcement.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {announcement.message}
                        </p>
                      </div>
                      <Badge
                        variant={
                          announcement.type === 'alert'
                            ? 'destructive'
                            : announcement.type === 'warning'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(announcement.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Route Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Route Map
            </CardTitle>
            <CardDescription>
              Interactive map showing bus routes and stops
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RouteMap route={selectedRoute} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Availability?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your availability for today's bus service?
              This action will notify the driver and admin.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Availability
            </Button>
            <Button variant="destructive" onClick={handleCancelAvailability}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Logout Button at bottom */}
      <div className="left-0 w-full dark:bg-gray-900 p-4 text-center">
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
