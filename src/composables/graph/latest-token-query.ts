import type { LatestTokenState } from "@/components/TokenTrade/schemas.interface";
import { useQuery } from "@urql/vue";
import { computed } from "vue";

export const latestTokenStateQuery = `
    query {
        latestTokenState(id: "latest") {
            id
            lastTimestamp
            lastBlock
            price
            weiSpent
            weiWithdrawn
            noAddress
            noTrades
        }
    }
`;

export function QueryLatestTokenState() {
  const results = useQuery({
    query: latestTokenStateQuery,
  });

  const refresh = () => {
    results.executeQuery({
      requestPolicy: "network-only",
    });
  };

  /** log every render */
  // watchEffect(() => {
  //   console.log("results", results);
  //   console.log("data", results.data.value);
  //   console.log("error", results.error.value);
  //   console.log("fetching", results.fetching.value);
  // });

  const latestTokenState = computed<LatestTokenState | undefined>(() => {
    return results.data.value?.latestTokenState;
  });
  return { latestTokenState, refresh };
}
