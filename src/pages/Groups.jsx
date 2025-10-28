import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Search, Plus, MapPin, Mail, Phone,
  User, Calendar, Users, Briefcase, Eye, Edit,
  Trash2, CheckCircle2, Loader2, AlertCircle
} from 'lucide-react';

const Groups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:4000/api/groups', {
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` // Add auth token if needed
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch groups.');
      }
      setGroups(result.data);
    } catch (err) {
      console.error('Error fetching groups:', err);
      setError(err.message || 'Failed to load groups.');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateGroup = async (groupId) => {
    if (!window.confirm('Are you sure you want to activate this group?')) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:4000/api/groups/${groupId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ status: 'Active' }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to activate group.');
      }
      fetchGroups(); // Re-fetch groups to update status
    } catch (err) {
      console.error('Error activating group:', err);
      setError(err.message || 'Failed to activate group.');
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || group.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900">Groups Management</h1>
      <p className="text-gray-600">Manage all the school groups onboarded to CampusGrid.</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-sm text-gray-600">Total Groups</p>
          <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600">Active Groups</p>
          <p className="text-2xl font-bold text-gray-900">
            {groups.filter((g) => g.status === 'Active').length}
          </p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600">Pending Groups</p>
          <p className="text-2xl font-bold text-gray-900">
            {groups.filter((g) => g.status === 'Pending').length}
          </p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600">Inactive/Suspended</p>
          <p className="text-2xl font-bold text-gray-900">
            {groups.filter((g) => g.status === 'Inactive' || g.status === 'Suspended').length}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups by name, email, or subdomain..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl w-full focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            disabled={loading}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
          <button className="btn-primary flex items-center gap-2" onClick={() => navigate('/onboarding')} disabled={loading}>
            <Plus className="h-5 w-5" />
            Add New Group
          </button>
        </div>
      </div>

      {/* Groups List */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="ml-3 text-lg text-gray-700">Loading groups...</p>
        </div>
      ) : filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{group.groupName}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                      group.status
                    )}`}
                  >
                    {group.status}
                  </span>
                </div>
                <p className="text-gray-600 flex items-center gap-2 text-sm mb-2">
                  <Building2 className="h-4 w-4 text-gray-500" /> {group.displayName} ({group.organizationType})
                </p>
                <p className="text-gray-600 flex items-center gap-2 text-sm mb-2">
                  <Mail className="h-4 w-4 text-gray-500" /> {group.contactEmail}
                </p>
                <p className="text-gray-600 flex items-center gap-2 text-sm mb-2">
                  <Phone className="h-4 w-4 text-gray-500" /> {group.contactPhone}
                </p>
                <p className="text-gray-600 flex items-center gap-2 text-sm mb-4">
                  <MapPin className="h-4 w-4 text-gray-500" /> {group.city}, {group.state}, {group.country}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-700 text-sm">
                    <User className="h-4 w-4" /> {group.contactPerson}
                  </div>
                  <div className="flex items-center gap-1 text-gray-700 text-sm">
                    <Calendar className="h-4 w-4" /> Est. {group.establishedYear}
                  </div>
                </div>
                <div className="flex gap-2">
                  {group.status === 'Pending' && (
                    <button
                      onClick={() => handleActivateGroup(group.id)}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600"
                      title="Activate Group"
                      disabled={loading}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </button>
                  )}
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" title="View Details">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-blue-100 text-blue-600" title="Edit Group">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-red-100 text-red-600" title="Delete Group">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="lg:col-span-2 text-center py-10 text-gray-500">
          No groups found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default Groups;
