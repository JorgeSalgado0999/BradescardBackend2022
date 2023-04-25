interface StoreInterface {
	id?: number;
	active?: boolean;
	name: string;
	slug?: string;

	state: string;
	city: string;
	suburb: string;
	street: string;
	exteriorNumber?: number;
	interiorNumber?: number;
	postalCode?: number;

	partnerId: number;

	createdAt?: Date;
	updatedAt?: Date;
}

export default StoreInterface;
