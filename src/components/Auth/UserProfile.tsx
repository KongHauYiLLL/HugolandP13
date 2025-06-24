import React, { useState } from 'react';
import { User, LogOut, Settings, Mail, Calendar, Crown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    onClose();
  };

  if (!isOpen || !user) return null;

  const joinDate = new Date(user.created_at).toLocaleDateString();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 p-6 rounded-lg border border-purple-500/50 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-white font-bold text-xl mb-2">User Profile</h2>
          <div className="flex items-center justify-center gap-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-purple-300">Hugoland Adventurer</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold">Email</span>
            </div>
            <p className="text-gray-300 text-sm">{user.email}</p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold">Member Since</span>
            </div>
            <p className="text-gray-300 text-sm">{joinDate}</p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold">Account Status</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm">Active</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSignOut}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              loading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400'
            }`}
          >
            {loading ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                Sign Out
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};