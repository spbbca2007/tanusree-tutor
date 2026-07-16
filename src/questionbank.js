// Question bank — built from curriculum lessons
import { curriculum } from "./curriculum.js";

export const questionBank = {};

curriculum.topics.forEach(topic => {
  // Build the bank key to match bankKeyForTopic in curriculum.js
  let key;
  if (topic.id === "surface-area") key = "surfaceArea";
  else key = topic.id;
  questionBank[key] = questionBank[key] || [];
  topic.lessons.forEach(lesson => {
    lesson.practice.forEach(q => {
      if (!questionBank[key].find(x => x.id === q.id)) questionBank[key].push(q);
    });
  });
});
