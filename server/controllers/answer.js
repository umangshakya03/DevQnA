import mongoose from "mongoose";
import Questions from "../models/questions.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, codeBlock, userAnswered, userId } = req.body; // Include codeBlock

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  updateNoofQuestions(_id, noOfAnswers);

  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          answer: [
            {
              answerBody,
              codeBlock,
              userAnswered,
              userId,
            },
          ],
        },
      },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: "Error while updating", error });
  }
};

const updateNoofQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: {
        noOfAnswers: noOfAnswers,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }

  updateNoofQuestions(_id, noOfAnswers);

  try {
    await Questions.updateOne(
      { _id },
      {
        $pull: {
          answer: { _id: answerId }, // Pull the answer by its _id
        },
      }
    );
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};

export const editAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, answerBody, codeBlock } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }

  try {
    await Questions.updateOne(
      { _id, "answer._id": answerId }, // Find the question by its _id and the answer by its _id
      {
        $set: {
          "answer.$.answerBody": answerBody,
          "answer.$.codeBlock": codeBlock, // Update the answerBody and codeBlock
        },
      }
    );
    res.status(200).json({ message: "Successfully updated..." });
  } catch (error) {
    res.status(405).json(error);
  }
};
