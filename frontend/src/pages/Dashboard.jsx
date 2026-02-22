import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { useToast } from '../components/Toast';
import Header from '../components/base/Header';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectListView from '../components/projects/ProjectListView';
import ProjectDetailsModal from '../components/projects/ProjectDetailsModal';
import AddProjectModal from '../components/projects/AddProjectModal';
import EditProjectModal from '../components/projects/EditProjectModal';
import DeleteConfirmationModal from '../components/projects/DeleteConfirmationModal';
import ProjectFilters from '../components/projects/ProjectFilters';
import { Grid, Box, Typography, Button, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useProjects } from '../hooks/useProject';
import { usePublicProjects } from '../hooks/useUser';
import { projectAPI } from '../api/project';

const Dashboard = () => {
    usePageTitle('dashboard');

    const { user } = useAuthContext();
    const { showToast } = useToast();
    
    // Use appropriate hook based on user role
    const adminHook = useProjects();
    const viewerHook = usePublicProjects();
    const isAdmin = user?.role === 'admin';
    const { projects, loading, error, fetchProjects } = isAdmin ? adminHook : viewerHook;
    const fetchFn = isAdmin ? adminHook.fetchProjects : viewerHook.fetchPublicProjects;
    
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Fetch projects on component mount
    useEffect(() => {
        fetchFn().catch(() => {
            // Error already handled in hook
        });
    }, []);

    // Show error if fetching fails
    useEffect(() => {
        if (error) {
            showToast(error, 'error');
        }
    }, [error, showToast]);

    const handleEdit = (project) => {
        setEditingProject(project);
        setEditModalOpen(true);
    };

    const handleDelete = (project) => {
        setProjectToDelete(project);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async (project) => {
        try {
            await projectAPI.deleteProject(project.id);
            showToast('Project deleted successfully!', 'success');
            setDeleteModalOpen(false);
            setProjectToDelete(null);
            await fetchFn();
        } catch (error) {
            showToast(error.message || 'Failed to delete project', 'error');
        }
    };

    const handleAddProject = async (projectData) => {
        try {
            await projectAPI.createProject(projectData);
            showToast('Project created successfully!', 'success');
            setAddModalOpen(false);
            await fetchFn();
        } catch (error) {
            showToast(error.message || 'Failed to create project', 'error');
        }
    };

    const handleUpdateProject = async (projectData) => {
        try {
            await projectAPI.updateProject(editingProject.id, projectData);
            showToast('Project updated successfully!', 'success');
            setEditModalOpen(false);
            setEditingProject(null);
            await fetchFn();
        } catch (error) {
            showToast(error.message || 'Failed to update project', 'error');
        }
    };

    const handleOpenModal = (project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProject(null);
    };

    // Filter projects based on search term and status
    const filteredProjects = projects.filter(project => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            project.title.toLowerCase().includes(searchLower) ||
            (project.description && project.description.toLowerCase().includes(searchLower)) ||
            (project.tech_stack && project.tech_stack.toLowerCase().includes(searchLower));
        
        const matchesStatus = statusFilter === '' || project.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
    };
    return (
        <div style={{
            fontFamily: 'Inter, sans-serif',
            minHeight: '100vh',
            backgroundColor: '#f8fafc'
        }}>
            <Header />
            <Box sx={{ paddingY: '2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Box sx={{ maxWidth: '1400px', width: '100%', paddingX: '1rem' }}>
                    {/* Welcome Section */}
                    <Box sx={{ marginBottom: '2rem' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                            Welcome to Dashboard
                        </Typography>
                        <Typography sx={{ color: '#6b7280' }}>
                            Hello, {user?.name || user?.email}! Here are your projects.
                        </Typography>
                    </Box>

                    {/* Add Project Button - Admin Only */}
                    {user?.role === 'admin' && (
                        <Box sx={{ marginBottom: '1.5rem' }}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => setAddModalOpen(true)}
                                sx={{
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    textTransform: 'none',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        backgroundColor: '#2563eb'
                                    }
                                }}
                            >
                                Add Project
                            </Button>
                        </Box>
                    )}

                    {/* Search and Filter Section */}
                    <ProjectFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />

                    {/* Loading State */}
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {/* Empty State */}
                    {!loading && projects.length === 0 && (
                        <Box sx={{
                            textAlign: 'center',
                            padding: '3rem 1rem',
                            backgroundColor: '#f9fafb',
                            borderRadius: '0.5rem',
                            border: '1px dashed #e5e7eb'
                        }}>
                            <Typography sx={{ color: '#6b7280', marginBottom: '1rem' }}>
                                No projects yet. Create one to get started!
                            </Typography>
                        </Box>
                    )}

                    {/* No Results State */}
                    {!loading && projects.length > 0 && filteredProjects.length === 0 && (
                        <Box sx={{
                            textAlign: 'center',
                            padding: '3rem 1rem',
                            backgroundColor: '#f9fafb',
                            borderRadius: '0.5rem',
                            border: '1px dashed #e5e7eb'
                        }}>
                            <Typography sx={{ color: '#6b7280', marginBottom: '1rem' }}>
                                No projects match your filters.
                            </Typography>
                        </Box>
                    )}

                    {/* Projects Grid View */}
                    {!loading && filteredProjects.length > 0 && viewMode === 'grid' && (
                        <Grid container spacing={2}>
                            {filteredProjects.map((project) => (
                                <Grid item xs={12} sm={6} lg={3} key={project.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ProjectCard
                                        project={project}
                                        onEdit={isAdmin ? handleEdit : null}
                                        onDelete={isAdmin ? handleDelete : null}
                                        onClick={handleOpenModal}
                                        isAdmin={isAdmin}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* Projects List View */}
                    {!loading && filteredProjects.length > 0 && viewMode === 'list' && (
                        <ProjectListView
                            projects={filteredProjects}
                            onEdit={isAdmin ? handleEdit : null}
                            onDelete={isAdmin ? handleDelete : null}
                            onClick={handleOpenModal}
                            isAdmin={isAdmin}
                        />
                    )}

                    {/* Project Details Modal */}
                    <ProjectDetailsModal
                        open={modalOpen}
                        project={selectedProject}
                        onClose={handleCloseModal}
                        onEdit={isAdmin ? handleEdit : null}
                        onDelete={isAdmin ? handleDelete : null}
                        isAdmin={isAdmin}
                    />

                    {/* Add Project Modal */}
                    <AddProjectModal
                        open={addModalOpen}
                        onClose={() => setAddModalOpen(false)}
                        onAddProject={handleAddProject}
                    />

                    {/* Edit Project Modal */}
                    <EditProjectModal
                        open={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        project={editingProject}
                        onUpdateProject={handleUpdateProject}
                    />

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationModal
                        open={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        project={projectToDelete}
                        onConfirmDelete={handleConfirmDelete}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default Dashboard;