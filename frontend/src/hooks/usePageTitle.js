import { useEffect } from 'react';
import { getPageTitle } from '../config/title';

export const usePageTitle = (page) => {
    useEffect(() => {
        document.title = getPageTitle(page);
    }, [page]);
};