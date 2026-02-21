import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Alert,
    Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useAccessRequests } from '../hooks/useAdmin';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/base/Header';
import AccessRequestsTable from '../components/accessRequests/AccessRequestsTable';
import AccessRequestsTableSkeleton from '../components/accessRequests/AccessRequestsTableSkeleton';
import AccessRequestsPagination from '../components/accessRequests/AccessRequestsPagination';

const AccessRequests = () => {
    usePageTitle('access requests');
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { showToast } = useToast();
    const { accessRequests, loading, error, refetch } = useAccessRequests();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [hasShownError, setHasShownError] = useState(false);

    useEffect(() => {
        if (error && !hasShownError) {
            showToast(error, 'error');
            setHasShownError(true);
        }
    }, [error]);

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

    const safeAccessRequests = Array.isArray(accessRequests) ? accessRequests : [];
    const totalItems = safeAccessRequests.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = safeAccessRequests.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
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
                <Box sx={{ paddingY: '2rem' }}>
                    {/* Page Header */}
                    <Box sx={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                textTransform: 'none',
                                color: '#3b82f6',
                                '&:hover': {
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                                }
                            }}
                        >
                            Back to Dashboard
                        </Button>
                    </Box>
                    <Box sx={{ marginBottom: '2rem' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: '#1f2937',
                                marginBottom: '0.5rem'
                            }}
                        >
                            Access Requests
                        </Typography>
                        <Typography sx={{ color: '#6b7280' }}>
                            View all user access requests and their details
                        </Typography>
                    </Box>

                    {/* Loading State - Skeleton Loader */}
                    {loading && (
                        <AccessRequestsTableSkeleton rows={itemsPerPage} />
                    )}

                    {/* Table and Pagination - Show always (table handles empty state) */}
                    {!loading && (
                        <>
                            <AccessRequestsTable 
                                data={paginatedData} 
                                loading={loading}
                            />
                            
                            {totalItems > 0 && (
                                <AccessRequestsPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={totalItems}
                                    onPageChange={handlePageChange}
                                    onItemsPerPageChange={handleItemsPerPageChange}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default AccessRequests;
