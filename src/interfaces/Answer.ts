interface QuestionInterface {
	id?: number;
	questionId: string;
	status: string;
	comments: string;
	plan: string;
	date: string;
	breach: string;
	QuestionId: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export default QuestionInterface;
