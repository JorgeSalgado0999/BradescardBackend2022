import QuestionInterface from "./Question";

interface ReviewInterface {
	id?: number;
	date: Date;
	online: boolean;
	type: string;
	rating?: number;

	PartnerId?: number;
	StoreId?: number;

	questions: QuestionInterface[];

	createdAt?: Date;
	updatedAt?: Date;
}

export default ReviewInterface;
