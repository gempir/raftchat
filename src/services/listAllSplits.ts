import { MosaicNode } from "react-mosaic-component";

export function listAllSplits(node: MosaicNode<string> | null): Array<string> {
	const splits: Array<string> = [];

	const search = (subNode: MosaicNode<string> | null, splits: Array<string>): Array<string> => {
		if (subNode === null) {
			return [];
		}

		if (typeof subNode === "string") {
			return [...splits, subNode];
		}

		if (typeof subNode === "object") {
			const subElements = [...splits];

			if (typeof subNode.first === "string") {
				subElements.push(subNode.first);	
			}
			if (typeof subNode.first === "object") {
				subElements.push(...search(subNode.first, subElements));
			}

			if (typeof subNode.second === "string") {
				subElements.push(subNode.second);	
			}
			if (typeof subNode.second === "object") {
				subElements.push(...search(subNode.second, subElements));
			}
			
			return [...splits, ...subElements];
		}

		return [];
	};

	return Array.from(new Set(search(node, splits)));
}