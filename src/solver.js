export const solutions = {
  "alg-e01":[{title:"Read",explanation:"x + 3 = 8. A number plus 3 equals 8.",math:"x + 3 = 8"},{title:"What's done to x?",explanation:"3 is added. Undo by subtracting 3 from both sides.",math:"x + 3 − 3 = 8 − 3",tip:"Balance rule: same operation on both sides"},{title:"Simplify",explanation:"3−3 cancels. 8−3=5.",math:"x = 5"},{title:"Check",explanation:"Put 5 back in.",math:"5 + 3 = 8 ✓"}],
  "alg-m01":[{title:"Read",explanation:"2x + 3 = 11. Two things done to x: ×2 then +3.",math:"2x + 3 = 11"},{title:"Undo +3 first",explanation:"Last operation first. Subtract 3 from both sides.",math:"2x = 8",tip:"Always undo the last thing first — like peeling an onion"},{title:"Undo ×2",explanation:"Divide both sides by 2.",math:"x = 4"},{title:"Check",explanation:"2(4)+3=11 ✓",math:"2(4) + 3 = 11 ✓"}],
  "rnd-e01":[{title:"Find the tenths place",explanation:"6.84 — tenths is the FIRST digit after decimal: 8",math:"6 . [8] 4"},{title:"Look one place right",explanation:"The digit to the right of tenths is hundredths: 4",math:"6 . 8 [4]",tip:"Hundredths=4, which is less than 5"},{title:"Round down",explanation:"Since 4 < 5, keep the tenths digit the same (8).",math:"6.8 ✓"},{title:"Why NOT 10?",explanation:"'Tenth' = 0.1 place. 'Ten' = 10s place. They are completely different!",math:"6.8 (nearest TENTH) vs 10 (nearest TEN)"}],
  "sa-m02":[{title:"Identify dimensions",explanation:"Box: l=5in, w=3in, h=6in. Three different measurements.",math:"l=5, w=3, h=6"},{title:"Calculate 3 face areas",explanation:"Each of the 3 pairs of faces has a unique area.",math:"lw=5×3=15, lh=5×6=30, wh=3×6=18"},{title:"Add them",explanation:"Sum the three face areas.",math:"15+30+18=63"},{title:"Multiply by 2",explanation:"Every face has an identical opposite. So multiply by 2.",math:"SA = 2×63 = 126 in²",tip:"Don't forget the ×2! There are 6 faces, not 3."}],
  "func-e01":[{title:"Read the machine",explanation:"Rules are: cube first, then add 2. Apply in order.",math:"Input → [cube] → [+2] → Output"},{title:"Apply rule 1: cube",explanation:"4³ means 4×4×4, NOT 4×3.",math:"4³ = 4×4×4 = 64",tip:"Cubing is NOT the same as multiplying by 3!"},{title:"Apply rule 2: +2",explanation:"Add 2 to the result.",math:"64 + 2 = 66"},{title:"Answer",explanation:"Output = 66. Tanusree got this right in her Term 3 test!",math:"66 ✓"}],
  "int-m01":[{title:"Identify the signs",explanation:"-6 × -4. Both are negative — same signs.",math:"-6 × -4"},{title:"Apply sign rule",explanation:"Same signs → positive result.",math:"Same signs = positive ✓"},{title:"Multiply the numbers",explanation:"6 × 4 = 24. Apply positive sign.",math:"6 × 4 = 24"},{title:"Answer",explanation:"-6 × -4 = +24",math:"+24 ✓",tip:"Negative × Negative = Positive. Always!"}]
};

export function generateGenericSolution(question) {
  const steps = [
    {title:"Read the question",explanation:"Identify what you are asked to find.",math:question.prompt},
    {title:"Key insight",explanation:question.hint||"Apply the relevant rule.",math:"Strategy: "+( question.hint||"use the formula")},
    {title:"Answer",explanation:"The correct answer is: "+question.answer,math:question.answer,tip:question.explanation}
  ];
  return steps;
}

export function getSolution(questionId, question) {
  if(solutions[questionId]) return solutions[questionId];
  return generateGenericSolution(question);
}
