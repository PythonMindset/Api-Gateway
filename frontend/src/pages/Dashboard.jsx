import React, { useState } from 'react';
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
import { Grid, Box, Typography, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { GridView as GridViewIcon, ListAlt as ListIcon, Add as AddIcon } from '@mui/icons-material';
import { projectAPI } from '../api/project';

const Dashboard = () => {
    usePageTitle('dashboard');

    const { user } = useAuthContext();
    const { showToast } = useToast();
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const dummyProjects = [
        {
            id: 1,
            title: 'API Gateway',
            description: 'A comprehensive API gateway solution with authentication, rate limiting, and API logging capabilities.',
            tech_stack: 'Node.js, Express, PostgreSQL, React',
            repo_url: 'https://github.com/user/api-gateway',
            status: 'live',
            is_public: false,
            created_at: '2023-01-01T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-01-01T00:00:00.000Z'
        },
        {
            id: 2,
            title: 'Dashboard UI',
            description: 'Modern responsive dashboard for project management with real-time updates.',
            tech_stack: 'React, Material-UI, Redux, WebSocket',
            repo_url: 'https://github.com/user/dashboard-ui',
            status: 'completed',
            is_public: true,
            created_at: '2023-02-15T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-02-15T00:00:00.000Z'
        },
        {
            id: 3,
            title: 'Mobile App',
            description: 'Cross-platform mobile application for iOS and Android with offline support.',
            tech_stack: 'React Native, Firebase, Redux',
            repo_url: 'https://github.com/user/mobile-app',
            status: 'testing',
            is_public: false,
            created_at: '2023-03-20T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-03-20T00:00:00.000Z'
        },
        {
            id: 4,
            title: 'Data Analytics Platform',
            description: 'Advanced analytics platform for tracking and visualizing project metrics.',
            tech_stack: 'Python, Pandas, D3.js, Flask, PostgreSQL',
            repo_url: 'https://github.com/user/analytics-platform',
            status: 'planning',
            is_public: false,
            created_at: '2023-04-10T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-04-10T00:00:00.000Z'
        },
        {
            id: 5,
            title: 'Documentation Portal',
            description: 'Comprehensive documentation portal with search and versioning capabilities.',
            tech_stack: 'Next.js, MDX, TypeScript, Algolia',
            repo_url: 'https://github.com/user/docs-portal',
            status: 'live',
            is_public: true,
            created_at: '2023-05-05T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-05-05T00:00:00.000Z'
        },
        {
            id: 6,
            title: 'Payment Integration',
            description: 'Secure payment processing system with multiple payment gateway support.',
            tech_stack: 'Node.js, Stripe, Mongoose, React',
            repo_url: 'https://github.com/user/payment-integration',
            status: 'on_hold',
            is_public: false,
            created_at: '2023-06-12T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-06-12T00:00:00.000Z'
        },
        {
            id: 7,
            title: 'Legacy System Migration',
            description: 'Migration of legacy monolithic application to microservices architecture.',
            tech_stack: 'Java, Spring Boot, Docker, Kubernetes, PostgreSQL',
            repo_url: 'https://github.com/user/legacy-migration',
            status: 'archived',
            is_public: false,
            created_at: '2023-07-01T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-07-01T00:00:00.000Z'
        },
        {
            id: 8,
            title: 'Real-time Chat App',
            description: 'Full-featured chat application with file sharing and video calling capabilities.',
            tech_stack: 'Vue.js, Socket.io, Node.js, MongoDB, WebRTC',
            repo_url: 'https://github.com/user/chat-app',
            status: 'testing',
            is_public: true,
            created_at: '2023-08-20T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-08-20T00:00:00.000Z'
        },
        {
            id: 9,
            title: 'AI Content Generator',
            description: 'AI-powered content generation tool with multiple language support.',
            tech_stack: 'Python, GPT-4, FastAPI, React, PostgreSQL',
            repo_url: 'https://github.com/user/ai-content-gen',
            status: 'planning',
            is_public: false,
            created_at: '2023-09-10T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-09-10T00:00:00.000Z'
        },
        {
            id: 10,
            title: 'E-Commerce Platform',
            description: 'Scalable e-commerce platform with inventory management and order tracking.',
            tech_stack: 'Next.js, Shopify API, Prisma, PostgreSQL, Stripe',
            repo_url: 'https://github.com/user/ecommerce',
            status: 'completed',
            is_public: true,
            created_at: '2023-10-15T00:00:00.000Z',
            created_by: 1,
            updated_at: '2023-10-15T00:00:00.000Z'
        }
    ];

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
        } catch (error) {
            showToast(error.message || 'Failed to delete project', 'error');
        }
    };

    const handleAddProject = async (projectData) => {
        try {
            await projectAPI.createProject(projectData);
            showToast('Project created successfully!', 'success');
            setAddModalOpen(false);
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

                    {/* View Toggle and Add Project Button */}
                    <Box sx={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Add Project Button - Admin Only */}
                        {user?.role === 'admin' && (
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
                        )}

                        {/* View Toggle */}
                        <ToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={(event, newMode) => {
                                if (newMode !== null) {
                                    setViewMode(newMode);
                                }
                            }}
                            sx={{
                                backgroundColor: '#f3f4f6',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.375rem',
                                padding: '0.25rem'
                            }}
                        >
                            <ToggleButton
                                value="grid"
                                aria-label="grid view"
                                sx={{
                                    padding: '0.5rem 0.75rem',
                                    '&.Mui-selected': {
                                        backgroundColor: '#ffffff',
                                        color: '#3b82f6'
                                    }
                                }}
                            >
                                <GridViewIcon sx={{ fontSize: '1.2rem' }} />
                            </ToggleButton>
                            <ToggleButton
                                value="list"
                                aria-label="list view"
                                sx={{
                                    padding: '0.5rem 0.75rem',
                                    '&.Mui-selected': {
                                        backgroundColor: '#ffffff',
                                        color: '#3b82f6'
                                    }
                                }}
                            >
                                <ListIcon sx={{ fontSize: '1.2rem' }} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* Projects Grid View */}
                    {viewMode === 'grid' && (
                        <Grid container spacing={2}>
                            {dummyProjects.map((project) => (
                                <Grid item xs={12} sm={6} lg={3} key={project.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ProjectCard
                                        project={project}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onClick={handleOpenModal}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* Projects List View */}
                    {viewMode === 'list' && (
                        <ProjectListView
                            projects={dummyProjects}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onClick={handleOpenModal}
                        />
                    )}

                    {/* Project Details Modal */}
                    <ProjectDetailsModal
                        open={modalOpen}
                        project={selectedProject}
                        onClose={handleCloseModal}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
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