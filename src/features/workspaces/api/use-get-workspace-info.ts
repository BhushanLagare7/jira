import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseWorkspaceInfoProps {
  workspaceId: string;
}

export const useGetWorkspaceInfo = ({ workspaceId }: UseWorkspaceInfoProps) => {
  const query = useQuery({
    queryKey: ["workspaces-info", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"]["info"].$get(
        { param: { workspaceId } },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch workspace info");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
