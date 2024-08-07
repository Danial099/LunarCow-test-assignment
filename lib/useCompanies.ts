import { useState, useEffect } from 'react';

import { Company } from '@/types/company';

const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/proxy-companies');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch companies');
        }

        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError('Failed to fetch companies');
      }
    };

    fetchCompanies();
  }, []);

  return { companies, error };
};

export default useCompanies;
