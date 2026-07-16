export const tutor = {
  greet(state) {
    const h = new Date().getHours();
    const time = h<12?"Good morning":h<17?"Good afternoon":"Good evening";
    if(!state.stars) return { title:`${time}, Tanusree! 🌟`, body:"Ready to learn something new today? Let's start!" };
    if(state.streak>1) return { title:`${time}! ${state.streak}-day streak! 🔥`, body:`You've answered ${state.stars/5} questions correctly. Keep it up!` };
    return { title:`${time}, Tanusree!`, body:`${state.stars} stars so far. Keep practising!` };
  },
  correct(streak) {
    const msgs = [
      {title:"Correct! ✓",body:"That's right. Keep going!"},
      {title:"Yes! ✓",body:"Exactly right."},
      {title:"Well done! ✓",body:"You've got it."},
      {title:"Perfect! ✓",body:"That's the right approach."}
    ];
    if(streak>=3) return {title:`${streak} in a row! 🔥`,body:"You're on a roll — keep it up!"};
    return msgs[Math.floor(Math.random()*msgs.length)];
  },
  incorrect(misconception, topicTitle) {
    const m = {
      "confuses-tenth-with-ten":{title:"Not quite",body:"Remember: 'tenth' = first digit after decimal. 'Ten' = tens place. Completely different positions!"},
      "adds-instead-of-subtracts":{title:"Check the operation",body:"When something is added to x, we undo it by subtracting — not adding again."},
      "wrong-order-of-operations":{title:"Check the order",body:"Undo the LAST thing done to x first, then work backwards."},
      "forgets-to-multiply-by-2":{title:"Almost!",body:"Remember: every face has a matching opposite face. Multiply by 2 at the end!"},
      "same-signs-give-negative":{title:"Check the sign rule",body:"Same signs (−×−) give a POSITIVE result. Different signs give negative."},
      "multiplies-by-3-instead-of-cubing":{title:"Cube means ³",body:"Cubing means multiplying by itself three times: 4³ = 4×4×4 = 64. Not 4×3!"},
    };
    if(misconception && m[misconception]) return m[misconception];
    return {title:"Not quite this time",body:`Review the ${topicTitle} lesson and look at the hint — you'll get the next one!`};
  }
};
