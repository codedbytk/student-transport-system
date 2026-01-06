import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Bus, TrendingUp, Clock, Plus, Send, Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { mockRoutes, mockStudents, type User } from '../lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementType, setAnnouncementType] = useState('info');

  // Analytics data
  const routeUsageData = mockRoutes.map(route => ({
    name: route.busNumber,
    students: route.currentOccupancy,
    capacity: route.capacity,
  }));

  const weeklyData = [
    { day: 'Mon', students: 145 },
    { day: 'Tue', students: 162 },
    { day: 'Wed', students: 138 },
    { day: 'Thu', students: 155 },
    { day: 'Fri', students: 148 },
  ];

  const statusData = [
    { name: 'Active', value: mockRoutes.filter(r => r.status === 'active').length },
    { name: 'Delayed', value: mockRoutes.filter(r => r.status === 'delayed').length },
    { name: 'Cancelled', value: mockRoutes.filter(r => r.status === 'cancelled').length },
  ];

  const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

  const totalStudents = mockStudents.length;
  const totalRoutes = mockRoutes.length;
  const activeRoutes = mockRoutes.filter(r => r.status === 'active').length;
  const averageOccupancy = Math.round(
    mockRoutes.reduce((acc, route) => acc + (route.currentOccupancy / route.capacity) * 100, 0) / mockRoutes.length
  );

  const handleSendAnnouncement = () => {
    if (!announcementTitle || !announcementMessage) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Announcement sent!', {
      description: 'All users have been notified.',
    });
    setAnnouncementTitle('');
    setAnnouncementMessage('');
    setShowAnnouncementDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome, {user.name}
            </p>
          </div>
          <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
            <DialogTrigger asChild>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Announcement</DialogTitle>
                <DialogDescription>
                  Broadcast a message to all students and drivers
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    placeholder="Enter announcement title"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={announcementMessage}
                    onChange={(e) => setAnnouncementMessage(e.target.value)}
                    placeholder="Enter announcement message"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={announcementType} onValueChange={setAnnouncementType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendAnnouncement}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStudents}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                registered students
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
                <Bus className="w-4 h-4" />
                Active Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {activeRoutes}/{totalRoutes}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                routes currently active
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
                <TrendingUp className="w-4 h-4" />
                Avg Occupancy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {averageOccupancy}%
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                average bus occupancy
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                On-Time Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">94%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                punctuality this week
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Student Usage</CardTitle>
                  <CardDescription>
                    Number of students using the transport system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="students"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Route Status Distribution</CardTitle>
                  <CardDescription>
                    Current status of all routes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Route Capacity Usage</CardTitle>
                <CardDescription>
                  Current occupancy vs maximum capacity for each route
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={routeUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" name="Current Students" />
                    <Bar dataKey="capacity" fill="#d1d5db" name="Capacity" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle>Route Management</CardTitle>
              <CardDescription>View and manage all transportation routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRoutes.map((route) => (
                  <div
                    key={route.routeId}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Bus className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{route.busNumber}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Route {route.routeId} • Departs: {route.departureTime}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {route.currentOccupancy}/{route.capacity}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Occupancy</p>
                      </div>
                      <Badge variant={route.status === 'active' ? 'default' : route.status === 'delayed' ? 'secondary' : 'destructive'}>
                        {route.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Allocations</CardTitle>
              <CardDescription>View student route assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {student.studentNumber}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Route {student.route}</Badge>
                      {student.confirmed && (
                        <Badge variant="default" className="bg-green-600">Confirmed</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Logout Button at bottom */}
      <div className="left-0 w-full dark:bg-gray-900 p-4 text-center">
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => { localStorage.removeItem('currentUser'); onLogout(); }}>
          Logout
        </Button>
      </div>
    </div>
  );
}
