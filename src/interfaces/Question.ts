interface QuestionInterface {
	id?: number;
	question: string;
	CategoryId: number;
	riskLevel?: number;

	createdAt?: Date;
	updatedAt?: Date;
}

export default QuestionInterface;
