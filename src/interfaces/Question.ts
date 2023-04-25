interface QuestionInterface {
	id?: number;
	question: string;
	CategoryId: number;

	createdAt?: Date;
	updatedAt?: Date;
}

export default QuestionInterface;
