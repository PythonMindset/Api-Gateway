import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Alert,
    Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useApiLogs } from '../hooks/useAdmin';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/base/Header';
import ApiLogsTable from '../components/apiLogs/ApiLogsTable';
import ApiLogsTableSkeleton from '../components/apiLogs/ApiLogsTableSkeleton';
import CommonPagination from '../components/common/Pagination';
import ApiLogsFilters from '../components/apiLogs/ApiLogsFilters';

const ApiLogs = () => {
    usePageTitle('API Logs');
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { showToast } = useToast();
    const { logs, loading, error, pagination, fetchApiLogs } = useApiLogs();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [filters, setFilters] = useState({
        user_id: '',
        endpoint: '',
        method: '',
        status_code: '',
        level: '',
        role: ''
    });
    const [hasShownError, setHasShownError] = useState(false);

    useEffect(() => {
        if (error && !hasShownError) {
            showToast(error, 'error');
            setHasShownError(true);
        }
    }, [error]);

    useEffect(() => {
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value !== '')
        );
        fetchApiLogs(currentPage, limit, activeFilters).catch(() => {
            // Error already handled in hook
        });
    }, [currentPage, limit, filters]);

    if (user?.role !== 'admin') {
        return (
            <div
                style={{
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '100vh',
                    backgroundColor: '#f8fafc'
                }}
            >
                <Header />
                <Container maxWidth="lg">
                    <Box sx={{ paddingY: '3rem' }}>
                        <Alert severity="error">
                            Access Denied. Only administrators can view this page.
                        </Alert>
                    </Box>
                </Container>
            </div>
        );
    }

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    return (
        <div
            style={{
                fontFamily: 'Inter, sans-serif',
                minHeight: '100vh',
                backgroundColor: '#f8fafc'
            }}
        >
            <Header />
            <Container maxWidth="lg">
                <Box sx={{ paddingY: '1.5rem' }}>
                    {/* Page Header */}
                    <Box sx={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                textTransform: 'none',
                                color: '#3b82f6',
                                padding: '0.5rem 0.75rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                                }
                            }}
                        >
                            Back to Dashboard
                        </Button>
                    </Box>

                    {/* Title */}
                    <Box sx={{ marginBottom: '1.5rem' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: '#1f2937',
                                marginBottom: '0.25rem',
                                fontSize: '1.5rem'
                            }}
                        >
                            API Logs
                        </Typography>
                        <Typography sx={{ color: '#6b7280', fontSize: '0.95rem' }}>
                            Monitor and filter API requests
                        </Typography>
                    </Box>

                    {/* Filters */}
                    <Box sx={{ marginBottom: '1.5rem' }}>
                        <ApiLogsFilters 
                            filters={filters} 
                            onFilterChange={handleFilterChange}
                            loading={loading}
                        />
                    </Box>

                    {/* Loading State - Skeleton Loader */}
                    {loading && (
                        <ApiLogsTableSkeleton rows={limit} />
                    )}

                    {/* Table and Pagination */}
                    {!loading && (
                        <>
                            <ApiLogsTable 
                                data={logs} 
                                loading={loading}
                            />
                            
                            {pagination && pagination.total > 0 && (
                                <CommonPagination
                                    currentPage={currentPage}
                                    totalPages={pagination.pages}
                                    itemsPerPage={limit}
                                    totalItems={pagination.total}
                                    onPageChange={handlePageChange}
                                    onItemsPerPageChange={handleLimitChange}
                                    pageSizeOptions={[10, 25, 50, 100]}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default ApiLogs;
