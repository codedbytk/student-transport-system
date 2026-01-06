export interface User {
  id: string;
  username: string;
  password: string;
  role: 'student' | 'driver' | 'admin';
  name: string;
  email: string;
}

export interface Route {
  routeId: string;
  busNumber: string;
  stops: string[];
  driver?: string;
  departureTime: string;
  status: 'active' | 'delayed' | 'cancelled';
  capacity: number;
  currentOccupancy: number;
}

export interface Student {
  id: string;
  name: string;
  studentNumber: string;
  route: string;
  confirmed: boolean;
  pickedUp: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert';
  timestamp: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'student01',
    password: 'password123',
    role: 'student',
    name: 'Takudzwa Shereni',
    email: 'takudzwashereni@students.nust.ac.zw',
  },
  {
    id: '2',
    username: 'driver01',
    password: 'password123',
    role: 'driver',
    name: 'Blessing Musarara',
    email: 'blessing.musarara@nust.ac.zw',
  },
  {
    id: '3',
    username: 'admin01',
    password: 'password123',
    role: 'admin',
    name: 'Tadiwa Musoro',
    email: 'tadiwa.musoro@nust.ac.zw',
  },
];

export const mockRoutes: Route[] = [
  {
    routeId: 'R1',
    busNumber: 'Bus 12',
    stops: ['Main Gate', 'Library', 'Dormitory A', 'Sports Complex', 'Engineering Block'],
    driver: 'driver01',
    departureTime: '07:30',
    status: 'active',
    capacity: 45,
    currentOccupancy: 32,
  },
  {
    routeId: 'R2',
    busNumber: 'Bus 08',
    stops: ['City Center', 'Shopping Mall', 'Main Gate', 'Admin Block', 'Cafeteria'],
    departureTime: '08:00',
    status: 'active',
    capacity: 50,
    currentOccupancy: 28,
  },
  {
    routeId: 'R3',
    busNumber: 'Bus 15',
    stops: ['North Suburbs', 'Hospital', 'Main Gate', 'Library', 'Science Block'],
    departureTime: '07:45',
    status: 'delayed',
    capacity: 40,
    currentOccupancy: 35,
  },
  {
    routeId: 'R4',
    busNumber: 'Bus 20',
    stops: ['Walk-in Gate', 'Train Station', 'Main Gate', 'Student Residence'],
    departureTime: '08:15',
    status: 'active',
    capacity: 35,
    currentOccupancy: 20,
  },
];

export const mockStudents: Student[] = [
  { id: 'S001', name: 'Takudzwa Shereni', studentNumber: 'N02531260W', route: 'R1', confirmed: true, pickedUp: false },
  { id: 'S002', name: 'Jane Smith', studentNumber: 'N01234568', route: 'R1', confirmed: true, pickedUp: false },
  { id: 'S003', name: 'Peter Brown', studentNumber: 'N01234569', route: 'R1', confirmed: false, pickedUp: false },
  { id: 'S004', name: 'Mary Johnson', studentNumber: 'N01234570', route: 'R1', confirmed: true, pickedUp: false },
  { id: 'S005', name: 'David Wilson', studentNumber: 'N01234571', route: 'R1', confirmed: true, pickedUp: true },
  { id: 'S006', name: 'Emma Davis', studentNumber: 'N01234572', route: 'R1', confirmed: true, pickedUp: true },
  { id: 'S007', name: 'James Miller', studentNumber: 'N01234573', route: 'R1', confirmed: false, pickedUp: false },
  { id: 'S008', name: 'Lisa Anderson', studentNumber: 'N01234574', route: 'R1', confirmed: true, pickedUp: false },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'A001',
    title: 'Route R3 Delay',
    message: 'Bus 15 will be delayed by 15 minutes due to traffic congestion.',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'A002',
    title: 'New Route Added',
    message: 'A new route (R5) has been added serving the East Campus area.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'A003',
    title: 'Maintenance Notice',
    message: 'Bus 12 will undergo routine maintenance this weekend.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

// NUST Bulawayo coordinates
export const NUST_COORDINATES = {
  lat: -20.1518,
  lng: 28.5945,
};

// Mock bus stops with coordinates (relative to NUST)
export const BUS_STOPS = [
  { name: 'Main Gate', lat: -20.1645, lng: 28.6400 },
  { name: 'Library', lat: -20.1528, lng: 28.5955 },
  { name: 'Dormitory A', lat: -20.1538, lng: 28.5965 },
  { name: 'Sports Complex', lat: -20.1548, lng: 28.5975 },
  { name: 'Engineering Block', lat: -20.1558, lng: 28.5985 },
  { name: 'City Center', lat: -20.1395, lng: 28.5878 },
  { name: 'Shopping Mall', lat: -20.1450, lng: 28.5910 },
  { name: 'Admin Block', lat: -20.1520, lng: 28.5950 },
  { name: 'Cafeteria', lat: -20.1525, lng: 28.5960 },
  { name: 'North Suburbs', lat: -20.1300, lng: 28.5900 },
  { name: 'Hospital', lat: -20.1400, lng: 28.5920 },
  { name: 'Science Block', lat: -20.1530, lng: 28.5970 },
  { name: 'West End', lat: -20.1500, lng: 28.5800 },
  { name: 'Train Station', lat: -20.1480, lng: 28.5850 },
  { name: 'Dormitory B', lat: -20.1535, lng: 28.5980 },
];
