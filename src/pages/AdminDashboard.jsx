import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Users, GraduationCap, UserCheck,
  TrendingUp, Plus, RefreshCw, Eye, CheckCircle,
  XCircle, Clock, BarChart3, Calendar, Search, LogOut, User
} from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0
  });

  useEffect(() => {
    fetchAdminInfo();
    fetchGroups();
  }, []);

  const fetchAdminInfo = () => {
    const adminInfo = localStorage.getItem('admin_info');
    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
  };

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const data = await api.groups.getAll();
      
      if (data.success) {
        setGroups(data.data);
        
        // Calculate stats
        const total = data.data.length;
        const active = data.data.filter(g => g.status === 'Active').length;
        const pending = data.data.filter(g => g.status === 'Pending').length;
        const inactive = data.data.filter(g => g.status === 'Inactive' || g.status === 'Suspended').length;
        
        setStats({ total, active, pending, inactive });
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_info');
    navigate('/login');
  };

  const statCards = [
    {
      label: 'Total Groups',
      value: stats.total,
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Active Groups',
      value: stats.active,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Pending Approval',
      value: stats.pending,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      label: 'Inactive',
      value: stats.inactive,
      icon: XCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CampusGrid Admin
                </h1>
                <p className="text-sm text-gray-600">Manage your school groups</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {admin && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{admin.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full font-medium">
                    {admin.role}
                  </span>
                </div>
              )}
              <button
                onClick={fetchGroups}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => navigate('/onboarding')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Onboard New Group
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Groups List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">School Groups</h2>
                <p className="text-sm text-gray-600 mt-1">Manage all onboarded groups</p>
              </div>
              <button
                onClick={() => navigate('/groups')}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View All
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading groups...</p>
              </div>
            ) : groups.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-semibold mb-2">No groups yet</p>
                <p className="text-gray-500 text-sm mb-4">Start by onboarding your first school group</p>
                <button
                  onClick={() => navigate('/onboarding')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Onboard First Group
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {groups.slice(0, 5).map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{group.groupName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          group.status === 'Active' ? 'bg-green-100 text-green-700' :
                          group.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {group.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {group.contactEmail}
                        </span>
                        <span>•</span>
                        <span>{group.city}, {group.state}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-500">
                        {new Date(group.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {group.subdomain}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/onboarding')}
            className="group p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all text-left"
          >
            <div className="w-14 h-14 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Onboard New Group</h3>
            <p className="text-sm text-gray-600">Add a new school group to the platform</p>
          </button>

          <button
            onClick={() => navigate('/groups')}
            className="group p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-purple-500 hover:shadow-xl transition-all text-left"
          >
            <div className="w-14 h-14 bg-purple-100 group-hover:bg-purple-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <Building2 className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Groups</h3>
            <p className="text-sm text-gray-600">View and manage all school groups</p>
          </button>

          <button
            onClick={() => navigate('/reports')}
            className="group p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all text-left"
          >
            <div className="w-14 h-14 bg-green-100 group-hover:bg-green-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <BarChart3 className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">View Reports</h3>
            <p className="text-sm text-gray-600">Access analytics and reports</p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

