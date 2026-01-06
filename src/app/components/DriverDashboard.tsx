import { useState } from 'react';
import { Bus, Users, CheckCircle, Clock, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { mockRoutes, mockStudents, type User } from '../lib/data';
import { RouteMap } from './RouteMap';

interface DriverDashboardProps {
  user: User;
  onLogout: () => void;
}

export function DriverDashboard({ user, onLogout }: DriverDashboardProps) {
  const [selectedRoute, setSelectedRoute] = useState(mockRoutes[0]);
  const [students, setStudents] = useState(mockStudents);
  const [bookedRoute, setBookedRoute] = useState<string | null>(mockRoutes[0].routeId);

  const confirmedStudents = students.filter(s => s.confirmed && s.route === selectedRoute.routeId);
  const pickedUpCount = confirmedStudents.filter(s => s.pickedUp).length;

  const handleBookRoute = (routeId: string) => {
    setBookedRoute(routeId);
    const route = mockRoutes.find(r => r.routeId === routeId);
    if (route) {
      setSelectedRoute(route);
    }
    toast.success('Route booked successfully!', {
      description: `You have been assigned to ${route?.busNumber}`,
    });
  };

  const handleMarkAttendance = (studentId: string, picked: boolean) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === studentId ? { ...s, pickedUp: picked } : s
      )
    );
    toast.success(
      picked ? 'Student marked as picked up' : 'Student pickup cancelled',
      { description: 'Attendance updated successfully' }
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Driver {user.name}!</CardTitle>
            <CardDescription>
              Manage your route and student attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  Select Route for Today
                </label>
                <Select
                  value={bookedRoute || ''}
                  onValueChange={handleBookRoute}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a route" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoutes.map(route => (
                      <SelectItem key={route.routeId} value={route.routeId}>
                        {route.busNumber} - {route.routeId} ({route.departureTime})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Route Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                Confirmed Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{confirmedStudents.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                students confirmed for today
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Picked Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {pickedUpCount}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                out of {confirmedStudents.length} confirmed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Departure Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{selectedRoute.departureTime}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {selectedRoute.busNumber}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Student List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Student Attendance</CardTitle>
              <CardDescription>
                Mark students as picked up/dropped off
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {confirmedStudents.length === 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-8">
                    No students confirmed for this route yet
                  </p>
                ) : (
                  confirmedStudents.map(student => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={student.pickedUp}
                          onCheckedChange={(checked) =>
                            handleMarkAttendance(student.id, checked === true)
                          }
                        />
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {student.studentNumber}
                          </p>
                        </div>
                      </div>
                      {student.pickedUp && (
                        <Badge variant="default" className="bg-green-600">
                          Picked Up
                        </Badge>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Route Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="w-5 h-5" />
                Route Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bus Number</span>
                  <span className="font-semibold">{selectedRoute.busNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Route ID</span>
                  <span className="font-semibold">{selectedRoute.routeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Capacity</span>
                  <span className="font-semibold">
                    {selectedRoute.currentOccupancy}/{selectedRoute.capacity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <Badge>{selectedRoute.status.toUpperCase()}</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Route Stops
                </p>
                <div className="space-y-2">
                  {selectedRoute.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Route Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Route Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RouteMap route={selectedRoute} />
          </CardContent>
        </Card>
      </motion.div>
      {/* Logout Button at bottom */}
      <div className="left-0 w-full dark:bg-gray-900 p-4 text-center">
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => { localStorage.removeItem('currentUser'); onLogout(); }}>
          Logout
        </Button>
      </div>
    </div>
  );
}
