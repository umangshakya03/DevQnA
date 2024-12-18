import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import moment from 'moment';
import { deleteAnswer } from '../../actions/question';
import toast from 'react-hot-toast';
import HTMLReactParser from 'html-react-parser';

const DisplayAnswer = ({ question, handleShare }) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
    toast.success('Answer deleted');
  };

  return (
    <div>
      {question.answer.map((ans) => (
        <div className='display-ans border-b' key={ans._id}>
          <div className='flex justify-between items-center'>
            <div>
              {/* Display the answer body */}
              <p className='font-normal'>{HTMLReactParser(ans.answerBody)}</p>

              {/* Display the code block with proper formatting */}
              {ans.codeBlock && (
                <pre
                  className='bg-gray-100 p-4 rounded my-2 font-mono text-sm overflow-x-auto'
                  style={{ whiteSpace: 'pre-wrap' }} // Preserve tabs and spaces
                >
                  <code>{ans.codeBlock}</code>
                </pre>
              )}

              <div>
                <button
                  type='button'
                  onClick={handleShare}
                  className='text-xs text-blue-500 hover:underline'
                >
                  Share
                </button>
                {User?.result?._id === ans?.userId && (
                  <>
                    <Link
                      to={`/EditAnswer/${id}/${ans._id}`}
                      className='ml-4 text-sm text-blue-500 hover:underline'
                    >
                      Edit
                    </Link>
                    <button
                      type='button'
                      onClick={() =>
                        handleDelete(ans._id, question.noOfAnswers)
                      }
                      className='ml-4 text-sm text-red-500 hover:underline'
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className='text-sm text-gray-500'>
                answered {moment(ans.answeredOn).fromNow()}
              </p>
              <Link
                to={`/Users/${ans.userId}`}
                className='flex items-center text-blue-500'
              >
                <Avatar
                  backgroundColor='lightgreen'
                  px='8px'
                  py='5px'
                  borderRadius='4px'
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <span className='ml-2'>{ans.userAnswered}</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
