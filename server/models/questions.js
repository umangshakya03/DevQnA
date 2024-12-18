import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  questionTitle: {
    type: String,
    required: "Question must have a title",
  },
  questionBody: {
    type: String,
    required: "Question must have a body",
  },
  codeBlock: {
    type: String, // Optional field for code snippets
    default: "", // Default to an empty string if not provided
  },
  noOfAnswers: {
    type: Number,
    default: 0,
  },
  upVote: {
    type: [String],
    default: [],
  },
  downVote: {
    type: [String],
    default: [],
  },
  userPosted: {
    type: String,
    required: "Question must have an author",
  },
  userId: {
    type: String,
  },
  askedOn: {
    type: Date,
    default: Date.now,
  },
  answer: [
    {
      answerBody: {
        type: String,
        required: "Answer must have a body",
      },
      codeBlock: {
        type: String, // Optional field for code snippets
        default: "", // Default to an empty string if not provided
      },
      userAnswered: {
        type: String,
        required: "Answer must have an author",
      },
      userId: {
        type: String,
        required: "Answer must have a user ID",
      },
      answeredOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model("Question", questionSchema);
