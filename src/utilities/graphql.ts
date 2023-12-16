interface Connection<T> {
	edges?: ReadonlyArray<Edge<T> | null | undefined> | null;
}

interface Edge<T> {
	node?: Readonly<T> | null;
}

/**
 * Reduces a GraphQL connection to an array of nodes via its edges.
 */
export function reduceConnection<T>(connection?: Connection<T> | null): T[] {
	return (
		connection?.edges?.reduce((acc, curr) => {
			if (!curr?.node) {
				return acc;
			}

			acc.push(curr.node);

			return acc;
		}, [] as T[]) ?? []
	);
}
