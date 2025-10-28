import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Users, GraduationCap, DollarSign, 
  TrendingUp, Activity, ArrowRight, Plus,
  BookOpen, Calendar, Clock, Award
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Schools', value: '246', change: '+12%', icon: Building2, color: 'blue' },
    { label: 'Active Users', value: '15,824', change: '+8%', icon: Users, color: 'green' },
    { label: 'Students', value: '78,432', change: '+15%', icon: GraduationCap, color: 'purple' },
    { label: 'Revenue', value: '$2.4M', change: '+23%', icon: DollarSign, color: 'orange' },
  ];

  const recentActivities = [
    { type: 'school', title: 'New School Onboarded', school: 'Lincoln High School', time: '2 hours ago', icon: Building2 },
    { type: 'user', title: 'New Administrator Added', school: 'Oakwood Academy', time: '5 hours ago', icon: Users },
    { type: 'student', title: 'Student Enrollment', school: 'Riverside Prep', time: '1 day ago', icon: GraduationCap },
  ];

  const quickActions = [
    { title: 'Onboard School', description: 'Add new school to the system', icon: Plus, color: 'blue', onClick: () => navigate('/onboarding') },
    { title: 'View Schools', description: 'Browse all schools', icon: Building2, color: 'green' },
    { title: 'Manage Users', description: 'User management', icon: Users, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, Administrator</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/onboarding')}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Onboard School
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600',
              orange: 'from-orange-500 to-orange-600',
            };
            
            return (
              <div key={index} className="card p-6 bg-gradient-to-br">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${colors[stat.color]} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">{stat.label}</p>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                const colors = {
                  blue: 'from-blue-600 to-blue-700',
                  green: 'from-green-600 to-green-700',
                  purple: 'from-purple-600 to-purple-700',
                };
                
                return (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="card p-6 text-left hover:scale-105 transition-transform group"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${colors[action.color]} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                    <ArrowRight className="w-5 h-5 text-gray-400 mt-3 group-hover:text-blue-600 transition-colors" />
                  </button>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                <span className="text-sm text-gray-600">View all</span>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.school}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Today's Events</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Pending Tasks</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">8</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-700">Achievements</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">24</span>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">Get in touch with our support team</p>
              <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
