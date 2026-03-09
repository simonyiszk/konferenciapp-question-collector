'use client';

import { useQuery } from '@tanstack/react-query';

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
const usePresentationQuery = <
  TData extends PresentationWithQuestions,
>(options: {
  queryKey: string[];
  queryFn: () => Promise<TData>;
  initialData?: TData;
}) => {
  return useQuery({
    ...options,
    refetchInterval: (query) => {
      const presentation = query.state.data as TData;
      if (!presentation) return 15000;

      const now = new Date();
      const twoHoursInMs = 2 * 60 * 60 * 1000;
      const presentationEndTime = new Date(presentation.end).getTime();

      if (now.getTime() > presentationEndTime + twoHoursInMs) {
        return false;
      }
      return 15000;
    },
  });
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
