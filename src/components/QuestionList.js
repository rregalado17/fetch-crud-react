import React, {useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(
        (data) => {
          setQuestions(data)
        },
      )
  }, [])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions)
      })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {correctIndex} ),
    })
      .then((response) => response.json())
      .then((updatedQ) => {
        const updatedQuestions = questions.map((q) => {
          if(q.id === updatedQuestions.id) return updatedQuestions;
          return q;
        });
        setQuestions(updatedQuestions);
      })
    }


  const questionItems = questions.map((q) => (
    <QuestionItem 
      key={q.id}
      question={q}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
