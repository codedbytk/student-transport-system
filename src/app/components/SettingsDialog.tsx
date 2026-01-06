import { Bell, Moon, Globe, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function SettingsDialog({ open, onOpenChange, darkMode, onToggleDarkMode }: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your application preferences
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Appearance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Appearance</h3>
            </div>
            <div className="space-y-3 pl-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex flex-col gap-1">
                  <span>Dark Mode</span>
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    Switch between light and dark theme
                  </span>
                </Label>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={onToggleDarkMode}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>
            <div className="space-y-3 pl-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="route-updates" className="flex flex-col gap-1">
                  <span>Route Updates</span>
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    Get notified about route changes and delays
                  </span>
                </Label>
                <Switch id="route-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="departure-reminders" className="flex flex-col gap-1">
                  <span>Departure Reminders</span>
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    Remind me before bus departure
                  </span>
                </Label>
                <Switch id="departure-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="announcements" className="flex flex-col gap-1">
                  <span>System Announcements</span>
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    Receive important announcements from admin
                  </span>
                </Label>
                <Switch id="announcements" defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy & Security */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Privacy & Security</h3>
            </div>
            <div className="space-y-3 pl-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="location" className="flex flex-col gap-1">
                  <span>Share Location</span>
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    Allow the app to access your location for better tracking
                  </span>
                </Label>
                <Switch id="location" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics" className="flex flex-col gap-1">
                  <span>Usage Analytics</span>
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    Help improve the system by sharing usage data
                  </span>
                </Label>
                <Switch id="analytics" defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          {/* Language */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Language & Region</h3>
            </div>
            <div className="pl-7">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Language: <span className="font-medium text-gray-900 dark:text-gray-100">English</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Region: <span className="font-medium text-gray-900 dark:text-gray-100">Zimbabwe</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
