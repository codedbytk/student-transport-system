import { User, Mail, Badge as BadgeIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { type User as UserType } from '../lib/data';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType;
}

export function ProfileDialog({ open, onOpenChange, user }: ProfileDialogProps) {
  const getRoleBadgeVariant = (role: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'driver':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile Information</DialogTitle>
          <DialogDescription>
            Your account details and information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900">
              <User className="w-12 h-12 text-blue-600 dark:text-blue-300" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Full Name
              </label>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <p className="text-sm">{user.email}</p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <BadgeIcon className="w-4 h-4" />
                Role
              </label>
              <div>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                User ID
              </label>
              <p className="text-sm font-mono">{user.id}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
