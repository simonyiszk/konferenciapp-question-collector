'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  getAllPresentationQuestions,
  getSelectedPresentationQuestions,
} from '@/server-lib/actions';

type PresentationWithQuestions = Awaited<
  ReturnType<
    typeof getAllPresentationQuestions | typeof getSelectedPresentationQuestions
  >
>;

/**
 * Base hook for presentation queries
 * This is an internal hook used by the exported hooks
 */
const usePresentationQuery = (
  ...params: Parameters<typeof useQuery<PresentationWithQuestions>>
) => {
  const [options, queryClient] = params;
  // State to track if refetching should be enabled
  const [refetchEnabled, setRefetchEnabled] = useState(true);

  return useQuery(
    {
      ...options,
      refetchInterval: refetchEnabled ? 15000 : 0,
      select: (presentation) => {
        if (!presentation) throw new Error('Presentation not found');
        const now = new Date();
        const twoHoursInMs = 2 * 60 * 60 * 1000;
        const presentationEndTime = presentation.end.getTime();

        // Disable refetching if at least 2 hours have elapsed since the end
        if (now.getTime() > presentationEndTime + twoHoursInMs) {
          setRefetchEnabled(false);
        }

        // Return selected data or the entire presentation object
        return options.select?.(presentation) ?? presentation;
      },
    },
    queryClient,
  );
};

/**
 * Hook for fetching selected questions for a presentation
 * Used in the question view
 */
export function useSelectedQuestions(
  presentationId: string,
  initialPresentation?: PresentationWithQuestions,
) {
  return usePresentationQuery({
    queryKey: ['questions', presentationId, 'marked'],
    queryFn: () => getSelectedPresentationQuestions(presentationId),
    initialData: initialPresentation,
  });
}

/**
 * Hook for fetching all questions for a presentation
 * Used in the dashboard view
 */
export function useAllQuestions(
  presentationId: string,
  initialPresentation?: PresentationWithQuestions,
) {
  return usePresentationQuery({
    queryKey: ['questions', presentationId, 'all'],
    queryFn: () => getAllPresentationQuestions(presentationId),
    initialData: initialPresentation,
  });
}
