// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getStoredToken, getSessionToken } from '../../utils/authToken';
// import { ChevronRight, Building2 } from 'lucide-react';
// import Spinner from '../../ui/Spinner';

// const WorkspaceDashboard = () => {
//     const navigate = useNavigate();
//     const [workspaces, setWorkspaces] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedWorkspace, setSelectedWorkspace] = useState(null);

//     useEffect(() => {
//         fetchWorkspaces();
//     }, []);

//     const fetchWorkspaces = async () => {
//         try {
//             const accessToken = getStoredToken() || getSessionToken();
//             if (!accessToken) {
//                 throw new Error('Authentication required. Please login again.');
//             }

//             const response = await fetch('/api/v1/workspaces/', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accessToken}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch workspaces');
//             }

//             const data = await response.json();
//             setWorkspaces(Array.isArray(data) ? data : []);
//             setError(null);
//         } catch (error) {
//             console.error('Error fetching workspaces:', error);
//             setError(error.message);
//             setWorkspaces([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleWorkspaceClick = async (workspace) => {
//         try {
//             setSelectedWorkspace(workspace.id);

//             // Get the role from the workspace data (already provided by the API)
//             const userRole = workspace.my_role;

//             if (!userRole) {
//                 throw new Error('Unable to determine workspace role');
//             }

//             // Store current workspace in localStorage
//             localStorage.setItem('currentWorkspace', JSON.stringify({
//                 id: workspace.id,
//                 name: workspace.name,
//                 slug: workspace.slug,
//                 tenant_id: workspace.tenant_id,
//                 role: userRole
//             }));

//             // Redirect to appropriate dashboard based on role
//             const roleDashboardMap = {
//                 'admin': '/auth/admin-dashboard',
//                 'hr': '/auth/hr-dashboard',
//                 'recruiter': '/auth/recruiter-dashboard',
//                 'staff': '/auth/staff-dashboard',
//                 'member': '/auth/member-dashboard',
//                 'hr_recruiter': '/auth/hr-recruiter-dashboard'
//             };

//             const dashboardPath = roleDashboardMap[userRole] || '/auth/member-dashboard';
            
//             setTimeout(() => {
//                 navigate(dashboardPath);
//             }, 300);
//         } catch (error) {
//             console.error('Error opening workspace:', error);
//             setError(error.message);
//             setSelectedWorkspace(null);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
//                 <div className="text-center">
//                     <Spinner />
//                     <p className="mt-4 text-slate-300">Loading your workspaces...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//             <div className="max-w-4xl mx-auto px-6 py-12">
//                 {/* Header */}
//                 <div className="mb-12">
//                     <div className="flex items-center gap-3 mb-4">
//                         <div className="p-2 bg-indigo-500/20 rounded-lg">
//                             <Building2 className="text-indigo-400" size={28} />
//                         </div>
//                         <h1 className="text-4xl font-bold text-white">Workspaces</h1>
//                     </div>
//                     <p className="text-slate-400 text-lg">Select a workspace to get started</p>
//                 </div>

//                 {/* Error State */}
//                 {error && (
//                     <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
//                         <p className="font-medium">Error: {error}</p>
//                     </div>
//                 )}

//                 {/* Workspaces Grid */}
//                 {workspaces.length > 0 ? (
//                     <div className="space-y-3">
//                         {workspaces.map((workspace) => (
//                             <button
//                                 key={workspace.id}
//                                 onClick={() => handleWorkspaceClick(workspace)}
//                                 disabled={selectedWorkspace === workspace.id}
//                                 className="w-full group"
//                             >
//                                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all duration-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed">
//                                     <div className="flex items-center gap-4 flex-1">
//                                         <div className="p-3 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
//                                             <Building2 className="text-indigo-400" size={24} />
//                                         </div>
//                                         <div className="text-left">
//                                             <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
//                                                 {workspace.name}
//                                             </h3>
//                                             <p className="text-sm text-slate-500 capitalize">
//                                                 Role: {workspace.my_role || 'member'} • {workspace.member_count || 1} member{workspace.member_count !== 1 ? 's' : ''}
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         {selectedWorkspace === workspace.id && (
//                                             <div className="mr-2">
//                                                 <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
//                                             </div>
//                                         )}
//                                         <ChevronRight className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" size={24} />
//                                     </div>
//                                 </div>
//                             </button>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-16 bg-slate-800/30 border border-slate-700/50 rounded-lg">
//                         <Building2 className="mx-auto text-slate-600 mb-4" size={48} />
//                         <h3 className="text-xl font-semibold text-slate-300 mb-2">No workspaces yet</h3>
//                         <p className="text-slate-500 mb-6">Create your first workspace to get started</p>
//                         <button
//                             onClick={() => navigate('/auth/workspace')}
//                             className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
//                         >
//                             <span>Create Workspace</span>
//                             <ChevronRight size={18} />
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WorkspaceDashboard;








import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredToken, getSessionToken } from '../../utils/authToken';
import { ChevronRight, Building2 } from 'lucide-react';
import Spinner from '../../ui/Spinner';

const WorkspaceDashboard = () => {
    const navigate = useNavigate();
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);

    useEffect(() => {
        fetchWorkspaces();
    }, []);

    const fetchWorkspaces = async () => {
        try {
            const accessToken = getStoredToken() || getSessionToken();
            if (!accessToken) {
                throw new Error('Authentication required. Please login again.');
            }

            const response = await fetch('/api/v1/workspaces/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch workspaces');
            }

            const data = await response.json();
            setWorkspaces(Array.isArray(data) ? data : []);
            setError(null);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
            setError(error.message);
            setWorkspaces([]);
        } finally {
            setLoading(false);
        }
    };

    const handleWorkspaceClick = async (workspace) => {
        try {
            setSelectedWorkspace(workspace.id);

            // Get the role from the workspace data (already provided by the API)
            const userRole = workspace.my_role;

            if (!userRole) {
                throw new Error('Unable to determine workspace role');
            }

            // Store current workspace in localStorage
            localStorage.setItem('currentWorkspace', JSON.stringify({
                id: workspace.id,
                name: workspace.name,
                slug: workspace.slug,
                tenant_id: workspace.tenant_id,
                role: userRole
            }));

            // Redirect to appropriate dashboard based on role
            const roleDashboardMap = {
                'admin': '/auth/admin-dashboard',
                'hr': '/auth/hr-dashboard',
                'recruiter': '/auth/recruiter-dashboard',
                'staff': '/auth/staff-dashboard',
                'member': '/auth/member-dashboard',
                'hr_recruiter': '/auth/hr-recruiter-dashboard'
            };

            const dashboardPath = roleDashboardMap[userRole] || '/auth/member-dashboard';
            
            setTimeout(() => {
                navigate(dashboardPath);
            }, 300);
        } catch (error) {
            console.error('Error opening workspace:', error);
            setError(error.message);
            setSelectedWorkspace(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center">
                <div className="text-center">
                    <Spinner />
                    <p className="mt-4 text-slate-300">Loading your workspaces...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <Building2 className="text-indigo-400" size={28} />
                        </div>
                        <h1 className="text-4xl font-bold text-white">Workspaces</h1>
                    </div>
                    <p className="text-slate-400 text-lg">Select a workspace to get started</p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                        <p className="font-medium">Error: {error}</p>
                    </div>
                )}

                {/* Workspaces Grid */}
                {workspaces.length > 0 ? (
                    <div className="space-y-3">
                        {workspaces.map((workspace) => (
                            <button
                                key={workspace.id}
                                onClick={() => handleWorkspaceClick(workspace)}
                                disabled={selectedWorkspace === workspace.id}
                                className="w-full group"
                            >
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all duration-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="p-3 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                                            <Building2 className="text-indigo-400" size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                                                {workspace.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 capitalize">
                                                Role: {workspace.my_role || 'member'} • {workspace.member_count || 1} member{workspace.member_count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selectedWorkspace === workspace.id && (
                                            <div className="mr-2">
                                                <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <ChevronRight className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" size={24} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                        <Building2 className="mx-auto text-slate-600 mb-4" size={48} />
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">No workspaces yet</h3>
                        <p className="text-slate-500 mb-6">Create your first workspace to get started</p>
                        <button
                            onClick={() => navigate('/auth/workspace')}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                        >
                            <span>Create Workspace</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkspaceDashboard;








