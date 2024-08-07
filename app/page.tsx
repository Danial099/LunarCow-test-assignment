'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Company } from '@/types/company';

const HomePage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  const renderTableBody = () => {
    if (companies.length) {
      return companies.map((company) => (
        <TableRow key={company.id}>
          <TableCell>{company.name}</TableCell>
          <TableCell>{company.employees}</TableCell>
          <TableCell>{company.revenue}</TableCell>
        </TableRow>
      ));
    }

    return (
      <TableRow>
        <TableCell colSpan={3}>No data available</TableCell>
      </TableRow>
    );
  };

  const totals = useMemo(() => {
    const totalEmployees = companies.reduce(
      (acc: number, company: Company) => acc + company.employees,
      0
    );
    const totalRevenue = companies.reduce(
      (acc: number, company: Company) => acc + company.revenue,
      0
    );
    return { employees: totalEmployees, revenue: totalRevenue };
  }, [companies]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/proxy-companies');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch companies');
        }

        setCompanies(data);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Something went wrong'
        );
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      {error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Table>
        <TableCaption>List of Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>{renderTableBody()}</TableBody>

        <TableFooter>
          <TableRow className='bg-gray-300'>
            <TableCell className='font-bold uppercase'>Totals</TableCell>
            <TableCell className='font-bold uppercase'>
              {totals.employees}
            </TableCell>
            <TableCell className='font-bold uppercase'>
              {totals.revenue}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default HomePage;
