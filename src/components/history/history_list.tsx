'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { History } from '@/types/types';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { HistoryItem } from './history_item';

interface HistoryListProps {
  requests: History[] | undefined;
}

export const HistoryList: React.FC<HistoryListProps> = ({ requests }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortedRequests, setSortedRequests] = useState<History[]>([]);
  const t = useTranslations('historyPage');

  useEffect(() => {
    if (requests) {
      const sorted = [...requests].sort((a, b) => a.executedAt - b.executedAt);
      setSortedRequests(sorted);
    }
    setIsLoading(false);
  }, [requests]);

  if (isLoading) {
    return <div>{t('loadSavedRequests')}</div>;
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p>{t('emptySavedRequests')}</p>
        <Link
          href="/restful-page"
          className="h-9 rounded-md p-4 font-semibold flex items-center bg-amber-200 hover:bg-amber-200"
        >
          {t('goToRestfulPage')}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-lg font-semibold text-center">{t('historyList')}</h3>
      <Table className="flex flex-col w-full">
        <TableHeader>
          <TableRow className="grid grid-cols-[2fr_1fr_3fr] gap-2">
            <TableHead className="flex items-center justify-center">
              {t('requestDate')}
            </TableHead>
            <TableHead className="flex items-center justify-center">
              {t('requestType')}
            </TableHead>
            <TableHead className="flex items-center justify-center">
              {t('requestURL')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {sortedRequests.map((request) => (
            <HistoryItem key={request.executedAt} request={request} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="flex justify-between">
            <TableCell colSpan={3}>{t('historyListTableResult')}</TableCell>
            <TableCell>{sortedRequests.length}</TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>{t('historyListTable')}</TableCaption>
      </Table>
    </div>
  );
};

export default HistoryList;
