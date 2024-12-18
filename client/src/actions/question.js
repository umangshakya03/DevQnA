import * as api from "../api";

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const editQuestion = (id, questionData, navigate) => async (dispatch) => {
  try {
    console.log("id", id);
    console.log("questionData", questionData);
    const { data } = await api.editQuestion(id, questionData);
    dispatch({ type: "EDIT_QUESTION", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/Questions/" + id);
  } catch (error) {
    console.log(error);
  }
}

export const editAnswer = (id, answerData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.editAnswer(id, answerData);
    dispatch({ type: "EDIT_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/Questions/" + id);
  } catch (error) {
    console.log(error);
  }
}

export const fetchAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, codeBlock, userAnswered, userId } =
      answerData;
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      codeBlock,
      userAnswered,
      userId
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    await api.deleteQuestion(id);
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    await api.voteQuestion(id, value, userId);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    await api.deleteAnswer(id, answerId, noOfAnswers);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};
