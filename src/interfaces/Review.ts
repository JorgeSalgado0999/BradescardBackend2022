import QuestionInterface from "./Question";

interface ReviewInterface {
	id?: number;
	date: Date;
	startTime: string;
	endTime: string;
	online: boolean;
	type: string;
	rating?: number;
	contactName: string;

	PartnerId?: number;
	StoreId?: number;

	questions: QuestionInterface[];

	createdAt?: Date;
	updatedAt?: Date;
}

export default ReviewInterface;
