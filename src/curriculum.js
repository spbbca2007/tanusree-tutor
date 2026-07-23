// curriculum.js — 11 topics (7 core + 4 from Tanusree's school papers)
export const curriculum = {
  version: "2.0",
  student: { name: "Tanusree", grade: 6, nextGrade: 7, schoolStartMonth: "July" },
  topics: [
    {
      id: "algebra", grade: 6,
      realWorld: {"title": "The Mystery Jar", "emoji": "🫙", "task": "Fill a jar with some marbles or coins (don't count yet). Add exactly 5 more. Now count the total. Can you work backwards to find how many were in the jar to start? Write it as x + 5 = (your total).", "materials": "A jar, marbles/coins/buttons", "bringBack": "How many were in the jar at the start? Check by counting!"}, title: "Algebra Basics", emoji: "⚖️",
      tagline: "Find the mystery number", color: "topic-orange", difficulty: "core",
      lessons: [{
        id: "alg-1", title: "One-step equations",
        firstPrinciple: "An equation is a balance scale. Both sides must always be equal. To find the unknown, undo whatever is done to it — using the opposite operation.",
        blocks: [
          { type: "text", title: "What is a variable?", body: "A variable (like x) is just a box hiding a number. Your job is to open the box.\n\nEquation: x + 3 = 8\nMeans: some number plus 3 equals 8.\nAnswer: x = 5 (because 5 + 3 = 8)" },
          { type: "example", title: "The balance rule", body: "Whatever you do to one side, do to the other.\n\nx + 5 = 12\nSubtract 5 from both sides:\nx + 5 − 5 = 12 − 5\nx = 7\n\nCheck: 7 + 5 = 12 ✓" },
          { type: "tip", body: "Always check your answer by substituting it back into the original equation." }
        ],
        practice: [
          { id:"alg-e01", tier:"easy",   prompt:"Solve: x + 3 = 8",           options:["3","5","11","8"],    answer:"5",  hint:"Subtract 3 from both sides.",      explanation:"x = 8 − 3 = 5. Check: 5+3=8 ✓", skill:"inverse-addition",       misconception:"adds-instead-of-subtracts" },
          { id:"alg-e02", tier:"easy",   prompt:"Solve: x + 6 = 14",          options:["8","20","6","9"],    answer:"8",  hint:"Subtract 6 from both sides.",      explanation:"x = 14 − 6 = 8",              skill:"inverse-addition",       misconception:"adds-instead-of-subtracts" },
          { id:"alg-e03", tier:"easy",   prompt:"Solve: x − 4 = 9",           options:["5","13","4","36"],   answer:"13", hint:"Add 4 to both sides.",             explanation:"x = 9 + 4 = 13",              skill:"inverse-subtraction",    misconception:"subtracts-instead-of-adds" },
          { id:"alg-e04", tier:"easy",   prompt:"Solve: x − 7 = 11",          options:["4","18","7","77"],   answer:"18", hint:"Add 7 to both sides.",             explanation:"x = 11 + 7 = 18",             skill:"inverse-subtraction",    misconception:"subtracts-instead-of-adds" },
          { id:"alg-e05", tier:"easy",   prompt:"Solve: 2x = 10",             options:["5","8","20","12"],   answer:"5",  hint:"Divide both sides by 2.",          explanation:"x = 10 ÷ 2 = 5",              skill:"inverse-multiplication", misconception:"subtracts-coefficient" },
          { id:"alg-e06", tier:"easy",   prompt:"Solve: 4x = 24",             options:["6","20","96","28"],  answer:"6",  hint:"Divide both sides by 4.",          explanation:"x = 24 ÷ 4 = 6",              skill:"inverse-multiplication", misconception:"subtracts-coefficient" },
          { id:"alg-e07", tier:"easy",   prompt:"Solve: x/3 = 5",             options:["2","8","15","53"],   answer:"15", hint:"Multiply both sides by 3.",        explanation:"x = 5 × 3 = 15",              skill:"inverse-division",       misconception:"divides-instead-of-multiplies" },
          { id:"alg-e08", tier:"easy",   prompt:"Solve: x/4 = 7",             options:["3","11","28","47"],  answer:"28", hint:"Multiply both sides by 4.",        explanation:"x = 7 × 4 = 28",              skill:"inverse-division",       misconception:"divides-instead-of-multiplies" },
          { id:"alg-m01", tier:"medium", prompt:"Solve: 2x + 3 = 11",         options:["4","7","14","5"],    answer:"4",  hint:"Subtract 3 first, then divide by 2.", explanation:"2x=8, x=4. Check: 2(4)+3=11 ✓", skill:"two-step-equations",  misconception:"wrong-order-of-operations" },
          { id:"alg-m02", tier:"medium", prompt:"Solve: 3x − 2 = 13",         options:["5","4","11","37"],   answer:"5",  hint:"Add 2 first, then divide by 3.",   explanation:"3x=15, x=5",                  skill:"two-step-equations",     misconception:"wrong-order-of-operations" },
          { id:"alg-m03", tier:"medium", prompt:"Solve: 5x + 1 = 26",         options:["5","6","27","130"],  answer:"5",  hint:"Subtract 1 first, then divide by 5.", explanation:"5x=25, x=5",               skill:"two-step-equations",     misconception:"wrong-order-of-operations" },
          { id:"alg-m04", tier:"medium", prompt:"Priya has x stickers. She gets 14 more and has 31. Find x.", options:["17","45","15","14"], answer:"17", hint:"Write: x + 14 = 31", explanation:"x = 31 − 14 = 17",    skill:"word-problems",          misconception:"adds-instead-of-subtracts" },
          { id:"alg-h01", tier:"hard",   prompt:"Tanusree thinks of a number. She doubles it and adds 7. Result is 31. Find the number.", options:["12","19","14","11"], answer:"12", hint:"2x + 7 = 31", explanation:"2x=24, x=12",   skill:"two-step-equations",     misconception:"wrong-order-of-operations" },
          { id:"alg-h02", tier:"hard",   prompt:"Solve: 4x − 5 = 19",         options:["6","7","5","14"],    answer:"6",  hint:"Add 5 first, then divide by 4.",   explanation:"4x=24, x=6",                  skill:"two-step-equations",     misconception:"wrong-order-of-operations" },
          { id:"alg-h03", tier:"hard",   prompt:"If 3x + 4 = x + 12, what is x?", options:["4","8","3","16"], answer:"4", hint:"Bring x terms together: 3x−x=12−4", explanation:"2x=8, x=4",               skill:"variables-both-sides",   misconception:"wrong-order-of-operations" }
        ],
        challenge: { prompt:"The sum of three consecutive numbers is 48. What is the smallest number?", options:["14","15","16","17"], answer:"15", explanation:"x+(x+1)+(x+2)=48 → 3x+3=48 → x=15", coach:"Let the smallest number be x." }
      }]
    },
    {
      id: "fractions", grade: 6,
      realWorld: {"title": "Pizza or Roti Fractions", "emoji": "🍕", "task": "Next time there's a pizza, roti, or dosa at home, cut it into equal pieces. Eat some. What fraction did you eat? What fraction is left? Take a photo before and after!", "materials": "Any round food cut into equal parts", "bringBack": "What fraction did you eat? Was it more or less than half?"}, title: "Fractions, Decimals & Percent", emoji: "🍕",
      tagline: "Slices of the whole", color: "topic-pink", difficulty: "core",
      lessons: [{
        id: "fdp-1", title: "Fractions and equivalence",
        firstPrinciple: "A fraction describes a part of a whole. The denominator (bottom) says how many equal parts the whole is divided into. The numerator (top) says how many parts we have.",
        blocks: [
          { type: "text", title: "Equivalent fractions", body: "1/2 = 2/4 = 3/6 = 4/8\nAll show the same amount — half.\n\nTo make equivalent fractions: multiply OR divide top and bottom by the same number.\n1/2 × (3/3) = 3/6 ✓" },
          { type: "example", title: "Simplifying", body: "12/16 — find GCF of 12 and 16.\nGCF = 4\n12÷4 = 3, 16÷4 = 4\nSimplest form: 3/4" },
          { type: "tip", body: "To compare fractions with different denominators, find a common denominator first." }
        ],
        practice: [
          { id:"fdp-e01", tier:"easy",   prompt:"Which fraction is equivalent to 1/2?",     options:["2/3","3/6","3/4","1/3"],  answer:"3/6",  hint:"Multiply top and bottom of 1/2 by 3.",  explanation:"1/2 × 3/3 = 3/6 ✓",                          skill:"equivalent-fractions",  misconception:"multiplies-only-numerator" },
          { id:"fdp-e02", tier:"easy",   prompt:"Simplify 4/8 to its lowest terms.",         options:["2/4","1/2","4/8","2/8"],  answer:"1/2",  hint:"GCF of 4 and 8 is 4.",                  explanation:"4÷4=1, 8÷4=2. Answer: 1/2",                   skill:"simplify-fractions",    misconception:"divides-only-numerator" },
          { id:"fdp-e03", tier:"easy",   prompt:"Convert 3/5 to a decimal.",                 options:["0.35","0.6","3.5","0.53"], answer:"0.6", hint:"Divide numerator by denominator: 3÷5",   explanation:"3÷5 = 0.6",                                   skill:"fraction-to-decimal",   misconception:"puts-digits-after-decimal" },
          { id:"fdp-e04", tier:"easy",   prompt:"What is 25% as a fraction in lowest terms?", options:["25/10","1/4","2/5","1/2"], answer:"1/4", hint:"25% = 25/100. Simplify by dividing by 25.", explanation:"25/100 = 1/4",                              skill:"percent-to-fraction",   misconception:"wrong-denominator" },
          { id:"fdp-e05", tier:"easy",   prompt:"Convert 0.75 to a percentage.",             options:["7.5%","0.75%","75%","750%"], answer:"75%", hint:"Multiply decimal by 100.",             explanation:"0.75 × 100 = 75%",                            skill:"decimal-to-percent",    misconception:"moves-decimal-wrong" },
          { id:"fdp-m01", tier:"medium", prompt:"Add: 3/8 + 2/8",                            options:["5/16","5/8","1/2","6/8"],  answer:"5/8",  hint:"Same denominator: just add numerators.", explanation:"3+2=5, denominator stays 8: 5/8",             skill:"add-same-denom",        misconception:"adds-denominators" },
          { id:"fdp-m02", tier:"medium", prompt:"Add: 1/4 + 1/3",                            options:["2/7","2/12","7/12","1/6"], answer:"7/12", hint:"LCD of 4 and 3 is 12.",                 explanation:"3/12 + 4/12 = 7/12",                          skill:"add-unlike-fractions",  misconception:"adds-denominators" },
          { id:"fdp-m03", tier:"medium", prompt:"Tanusree scored 36/45 on a test. What percentage?", options:["36%","45%","80%","90%"], answer:"80%", hint:"36÷45 × 100",                     explanation:"36÷45=0.8, ×100=80%",                         skill:"score-to-percent",      misconception:"compares-numerators-only" },
          { id:"fdp-m04", tier:"medium", prompt:"A ₹600 kurta has 25% discount. Sale price?", options:["₹150","₹450","₹475","₹625"], answer:"₹450", hint:"25% of 600 = 150. Subtract from 600.", explanation:"0.25×600=150. 600−150=₹450",               skill:"percent-discount",      misconception:"doesnt-subtract-discount" },
          { id:"fdp-m05", tier:"medium", prompt:"Order smallest to largest: 3/4, 2/3, 5/6",  options:["3/4,2/3,5/6","2/3,3/4,5/6","5/6,3/4,2/3","2/3,5/6,3/4"], answer:"2/3,3/4,5/6", hint:"Convert to decimals: 0.67, 0.75, 0.83", explanation:"2/3≈0.67, 3/4=0.75, 5/6≈0.83", skill:"compare-fractions", misconception:"compares-numerators-only" },
          { id:"fdp-h01", tier:"hard",   prompt:"Score went from 50 to 65. Percentage increase?", options:["15%","30%","13%","25%"], answer:"30%", hint:"(change÷original)×100 = (15÷50)×100", explanation:"15÷50×100=30%",                               skill:"percent-increase",      misconception:"divides-by-new-value" }
        ],
        challenge: { prompt:"Tanusree answered 42 out of 60 questions correctly. What percentage did she get wrong?", options:["30%","70%","42%","18%"], answer:"30%", explanation:"Wrong = 60−42=18. 18/60×100=30%", coach:"Find how many wrong first, then convert to percentage." }
      }]
    },
    {
      id: "ratio", grade: 6,
      realWorld: {"title": "The Recipe Doubler", "emoji": "🍳", "task": "Find a recipe at home (or ask whoever cooks). It might say '2 cups rice : 4 cups water'. If you wanted to make DOUBLE, how much of each would you need? Try halving it too.", "materials": "Any recipe with two ingredients", "bringBack": "Write the original ratio and your doubled ratio."}, title: "Ratio & Proportion", emoji: "⚖️",
      tagline: "Comparing quantities", color: "topic-teal", difficulty: "core",
      lessons: [{
        id: "rat-1", title: "Ratios and scaling",
        firstPrinciple: "A ratio compares two quantities. 2:3 means for every 2 of one thing there are 3 of another. Ratios can be scaled up or down by multiplying or dividing both parts by the same number.",
        blocks: [
          { type: "text", title: "Writing ratios", body: "6 cats and 4 dogs → ratio of cats to dogs = 6:4\nSimplify: divide both by GCF (2) → 3:2\n\nOrder matters: cats:dogs ≠ dogs:cats" },
          { type: "example", title: "Unitary method", body: "Recipe: 2 cups flour : 1 cup sugar\nIf you use 8 cups flour:\nScale factor = 8÷2 = 4\nSugar = 1×4 = 4 cups" },
          { type: "tip", body: "To share in a ratio: find total parts, find value of 1 part, then multiply." }
        ],
        practice: [
          { id:"rat-e01", tier:"easy",   prompt:"Simplify the ratio 6:4.",                   options:["6:4","3:2","2:3","1:2"],   answer:"3:2",  hint:"Divide both by GCF=2.",                 explanation:"6÷2=3, 4÷2=2. Answer: 3:2",                   skill:"simplify-ratio",    misconception:"reverses-order" },
          { id:"rat-e02", tier:"easy",   prompt:"Boys:Girls = 2:3. There are 6 boys. How many girls?", options:["4","9","6","12"], answer:"9",   hint:"Scale factor = 6÷2 = 3. Girls = 3×3.",  explanation:"SF=3. Girls=3×3=9",                           skill:"scale-ratio",       misconception:"doesnt-scale-both-parts" },
          { id:"rat-e03", tier:"easy",   prompt:"Express 15:25 in simplest form.",            options:["15:25","5:8","3:5","1:2"], answer:"3:5",  hint:"GCF of 15 and 25 is 5.",                explanation:"15÷5=3, 25÷5=5",                              skill:"simplify-ratio",    misconception:"divides-only-one" },
          { id:"rat-m01", tier:"medium", prompt:"Paint: red:blue = 3:5. Total = 400ml. How much red?", options:["150ml","200ml","240ml","120ml"], answer:"150ml", hint:"Total parts=8. 1 part=400÷8=50ml. Red=3×50.", explanation:"3/8 of 400=150ml",   skill:"ratio-total",       misconception:"doesnt-find-unit-value" },
          { id:"rat-m02", tier:"medium", prompt:"₹240 shared in ratio 3:5. Tanusree gets 3 parts. Her share?", options:["₹90","₹150","₹120","₹80"], answer:"₹90", hint:"8 parts total. 1 part=₹30. Tanusree=3×30.", explanation:"₹90",          skill:"ratio-total",       misconception:"doesnt-find-unit-value" },
          { id:"rat-m03", tier:"medium", prompt:"5 pencils cost ₹35. Cost of 8 pencils?",    options:["₹40","₹56","₹28","₹43"], answer:"₹56",  hint:"1 pencil = ₹7. 8×7=₹56",               explanation:"35÷5=7. 8×7=₹56",                            skill:"unitary-method",    misconception:"doesnt-find-unit-value" },
          { id:"rat-h01", tier:"hard",   prompt:"Ratio of adults to children in sports club is 11:6. There are 34 adults. How many children?", options:["18","22","24","20"], answer:"18", hint:"34÷11=unit value for adults. Apply to children.", explanation:"34÷11×6≈18.5≈18", skill:"unitary-method", misconception:"scales-wrong-part" }
        ],
        challenge: { prompt:"750 more adults than children in a club. Ratio adults:children = 11:6. How many children?", options:["750","900","600","450"], answer:"900", explanation:"Difference=5 parts=750. 1 part=150. Children=6×150=900", coach:"Find value of 1 part from the difference." }
      }]
    },
    {
      id: "patterns", grade: 6,
      realWorld: {"title": "Patterns Around the House", "emoji": "🔍", "task": "Hunt for number patterns: floor tiles, window grills, a staircase (each step adds the same height). Count them as a sequence. What's the rule? What would the 10th one be?", "materials": "Your eyes and a notebook", "bringBack": "Describe one pattern you found and its rule."}, title: "Patterns & Sequences", emoji: "🔢",
      tagline: "Find the rule, predict the future", color: "topic-purple", difficulty: "core",
      lessons: [{
        id: "pat-1", title: "Arithmetic sequences",
        firstPrinciple: "A sequence follows a rule. If you add the same number each time, it is an arithmetic sequence. The nth term formula lets you find ANY term without listing all the previous ones.",
        blocks: [
          { type: "text", title: "Finding the rule", body: "3, 7, 11, 15, 19...\nDifference: 7−3=4, 11−7=4. Common difference = 4.\nRule: start at 3, add 4 each time.\nnth term = 3 + (n−1)×4 = 4n − 1" },
          { type: "example", title: "From Tanusree's test", body: "Sequence: 5, 8, 11, 14...\nDifference = 3\nnth term = 3n + 2\nTanusree wrote this formula correctly in her Term 3 exam!" },
          { type: "tip", body: "To find nth term: nth term = first term + (n−1) × common difference" }
        ],
        practice: [
          { id:"pat-e01", tier:"easy",   prompt:"Next term: 5, 10, 15, 20, __?",            options:["24","25","30","22"],  answer:"25", hint:"Common difference = 5.",             explanation:"20+5=25",                          skill:"arithmetic-sequence", misconception:"guesses-without-finding-rule" },
          { id:"pat-e02", tier:"easy",   prompt:"Next term: 2, 4, 8, 16, __?",              options:["20","24","32","18"],  answer:"32", hint:"Each term doubles.",                 explanation:"16×2=32. Geometric sequence.",      skill:"geometric-sequence",  misconception:"assumes-arithmetic-rule" },
          { id:"pat-e03", tier:"easy",   prompt:"Sequence: 5,8,11,14. What is the rule?",   options:["Add 2","Add 3","Multiply by 2","Add 4"], answer:"Add 3", hint:"8−5=3, 11−8=3", explanation:"Common difference=3",            skill:"arithmetic-sequence", misconception:"guesses-without-finding-rule" },
          { id:"pat-m01", tier:"medium", prompt:"Sequence: 3,7,11,15. What is the 10th term?", options:["39","43","40","47"], answer:"39", hint:"nth term = 3+(n-1)×4. n=10.", explanation:"3+(9×4)=3+36=39",                  skill:"nth-term",            misconception:"off-by-one-error" },
          { id:"pat-m02", tier:"medium", prompt:"nth term = 3n+2. What is the 8th term?",   options:["24","26","22","29"],  answer:"26", hint:"Substitute n=8.",                    explanation:"3(8)+2=24+2=26",                   skill:"nth-term",            misconception:"off-by-one-error" },
          { id:"pat-m03", tier:"medium", prompt:"Sequence 5,8,11,14,17,20. Tanusree extended this in her Term 3 test. What are the next two terms?", options:["22,24","23,26","21,24","23,25"], answer:"23,26", hint:"+3 each time. 20+3, 23+3.", explanation:"20+3=23, 23+3=26", skill:"arithmetic-sequence", misconception:"off-by-one-error" },
          { id:"pat-h01", tier:"hard",   prompt:"First term=12, common difference=6. Missing second term in 12,__,24,36,48.", options:["16","18","20","15"], answer:"18", hint:"12+6=18. Check: 18+6=24 ✓", explanation:"12,18,24,36,48. Difference=6.", skill:"arithmetic-sequence", misconception:"guesses-without-finding-rule" }
        ],
        challenge: { prompt:"A sequence has nth term = 4n − 3. Which term equals 97?", options:["24","25","26","23"], answer:"25", explanation:"4n−3=97 → 4n=100 → n=25", coach:"Set the formula equal to 97 and solve for n." }
      }]
    },
    {
      id: "graphs", grade: 6,
      realWorld: {"title": "Family Data Survey", "emoji": "📋", "task": "Ask 5 family members or friends their favourite fruit (or colour, or cricket team). Tally the answers. Draw a bar chart. Which was most popular? That's the MODE!", "materials": "Paper, pencil, 5 people to ask", "bringBack": "Which option won? Draw your bar chart."}, title: "Graphs & Data", emoji: "📊",
      tagline: "Read, draw, and understand data", color: "topic-blue", difficulty: "core",
      lessons: [{
        id: "grp-1", title: "Reading and interpreting graphs",
        firstPrinciple: "A graph tells a story about data. Before reading any values, read the title and axis labels. The story is more important than the individual numbers.",
        blocks: [
          { type: "text", title: "Reading bar charts", body: "Step 1: Read the TITLE\nStep 2: Check both AXES and the scale\nStep 3: Read the bars\nStep 4: What is the STORY?" },
          { type: "example", title: "Averages", body: "Mean = sum ÷ count\nMedian = middle value when ordered\nMode = most frequent value\nRange = highest − lowest" },
          { type: "tip", body: "Be careful with graphs that don't start at zero — the visual difference can be very misleading!" }
        ],
        practice: [
          { id:"grp-e01", tier:"easy",   prompt:"Scores: 4,7,3,6,5. What is the mean?",     options:["4","5","6","7"],      answer:"5",  hint:"Add all, divide by 5.",               explanation:"(4+7+3+6+5)÷5=25÷5=5",            skill:"mean",          misconception:"finds-median-instead-of-mean" },
          { id:"grp-e02", tier:"easy",   prompt:"Values: 3,5,7,9,11. What is the median?",  options:["5","7","9","6"],      answer:"7",  hint:"Middle value of 5 ordered numbers.",  explanation:"Already ordered. Middle=7",         skill:"median",        misconception:"finds-mean-instead-of-median" },
          { id:"grp-e03", tier:"easy",   prompt:"Test scores: 70,80,90,60,100. Mean?",      options:["75","80","85","78"],  answer:"80", hint:"Sum÷5.",                               explanation:"(70+80+90+60+100)÷5=400÷5=80",    skill:"mean",          misconception:"finds-median-instead-of-mean" },
          { id:"grp-m01", tier:"medium", prompt:"Data: 22,25,21,28,24. What is the range?", options:["6","7","8","5"],      answer:"7",  hint:"Range = highest − lowest.",           explanation:"28−21=7",                          skill:"range",         misconception:"finds-mean-instead-of-range" },
          { id:"grp-m02", tier:"medium", prompt:"Temperatures: 22,25,21,28,24. Range?",     options:["6°C","7°C","8°C","5°C"], answer:"7°C", hint:"28−21=?",                       explanation:"28−21=7°C",                        skill:"range",         misconception:"finds-mean-instead-of-range" },
          { id:"grp-m03", tier:"medium", prompt:"Mode of: 3,5,3,7,3,5,8?",                 options:["5","7","3","8"],      answer:"3",  hint:"Which value appears most often?",     explanation:"3 appears 3 times — most frequent", skill:"mode",          misconception:"finds-mean-instead-of-mode" },
          { id:"grp-m04", tier:"medium", prompt:"Bar chart shows Mon:30, Tue:50, Wed:40, Thu:70, Fri:60. Which day had most study time?", options:["Tuesday","Wednesday","Thursday","Friday"], answer:"Thursday", hint:"Find the tallest bar.", explanation:"Thu=70 is highest", skill:"read-bar-chart", misconception:"reads-only-one-bar" },
          { id:"grp-h01", tier:"hard",   prompt:"Mean of 4 tests = 85. Fifth test = 75. New mean?", options:["80","83","82","81"], answer:"83", hint:"Total of 4 = 4×85=340. Add 75. Divide by 5.", explanation:"340+75=415. 415÷5=83",         skill:"mean",          misconception:"averages-the-averages" }
        ],
        challenge: { prompt:"6 numbers have mean = 10. Five of them are 8,12,9,11,10. What is the sixth?", options:["10","12","8","11"], answer:"10", explanation:"Total = 6×10=60. Sum of 5 = 50. Sixth = 60−50=10", coach:"Find the total first using mean×count." }
      }]
    },
    {
      id: "measurement", grade: 6,
      realWorld: {"title": "Kitchen Scale Detective", "emoji": "⚖️", "task": "Find a bag of rice, dal, or sugar in the kitchen. Read the weight on the label (e.g. 1 kg). Now convert it to grams. Weigh out 250g into a bowl — what fraction of the full bag is that?", "materials": "A kitchen scale, a bag of rice/dal/sugar", "bringBack": "How many grams in the full bag? How many 250g bowls can you make?"}, title: "Measurement & Conversions", emoji: "📏",
      tagline: "Smaller unit, bigger number", color: "topic-green", difficulty: "core",
      lessons: [{
        id: "mea-1", title: "Metric conversions",
        firstPrinciple: "Going to a smaller unit means a bigger number. 1 metre = 100 centimetres. The same length, just counted in smaller pieces. To convert: identify the direction, then multiply or divide by the right power of 10.",
        blocks: [
          { type: "text", title: "The key rule", body: "Smaller unit → bigger number\nLarger unit → smaller number\n\nLength: 1km=1000m, 1m=100cm, 1cm=10mm\nMass:   1kg=1000g\nVolume: 1L=1000ml" },
          { type: "example", title: "Conversion examples", body: "3.2m to cm: ×100 = 320cm\n450g to kg: ÷1000 = 0.45kg\n2.5L to ml: ×1000 = 2500ml\n\n250ml per bottle × 6 bottles = 1500ml = 1.5L" },
          { type: "tip", body: "km→m: ×1000. m→cm: ×100. kg→g: ×1000. L→ml: ×1000. Going the other way: divide." }
        ],
        practice: [
          { id:"mea-e01", tier:"easy",   prompt:"Convert 3.5 kg to grams.",                 options:["35g","350g","3500g","0.35g"],  answer:"3500g", hint:"kg→g: multiply by 1000.",          explanation:"3.5×1000=3500g",                   skill:"metric-kg-g",   misconception:"multiplies-by-wrong-power" },
          { id:"mea-e02", tier:"easy",   prompt:"Convert 250cm to metres.",                 options:["25m","2.5m","0.25m","2500m"],  answer:"2.5m",  hint:"cm→m: divide by 100.",             explanation:"250÷100=2.5m",                     skill:"metric-m-cm",   misconception:"multiplies-instead-of-divides" },
          { id:"mea-e03", tier:"easy",   prompt:"Convert 4500ml to litres.",                options:["45L","0.45L","4.5L","450L"],   answer:"4.5L",  hint:"ml→L: divide by 1000.",            explanation:"4500÷1000=4.5L",                   skill:"metric-L-mL",   misconception:"multiplies-instead-of-divides" },
          { id:"mea-m01", tier:"medium", prompt:"6 bottles × 250ml each. Total in litres?", options:["0.25L","1.5L","15L","2.5L"],   answer:"1.5L",  hint:"250×6=1500ml. 1500÷1000=1.5L",    explanation:"1500ml÷1000=1.5L",                 skill:"metric-L-mL",   misconception:"forgets-to-multiply-by-6" },
          { id:"mea-m02", tier:"medium", prompt:"Suitcase=18.1kg, handbag=800g. Total in kg?", options:["18.9kg","18.2kg","19.1kg","800.18kg"], answer:"18.9kg", hint:"800g=0.8kg. 18.1+0.8", explanation:"800g=0.8kg. 18.1+0.8=18.9kg ✓ (Tanusree's Term 3 Q7b)", skill:"metric-kg-g", misconception:"adds-different-units" },
          { id:"mea-m03", tier:"medium", prompt:"Convert 3.2 metres to centimetres.",        options:["32cm","320cm","0.32cm","3200cm"], answer:"320cm", hint:"m→cm: multiply by 100.",         explanation:"3.2×100=320cm",                    skill:"metric-m-cm",   misconception:"multiplies-by-wrong-power" },
          { id:"mea-h01", tier:"hard",   prompt:"Car travels 60km/h for 4 hours. Distance in metres?", options:["240m","2400m","24000m","240000m"], answer:"240000m", hint:"60×4=240km. 240×1000=240000m.", explanation:"240km=240000m", skill:"metric-m-cm", misconception:"multiplies-by-wrong-power" }
        ],
        challenge: { prompt:"Tanusree runs 1.4km each way to school, 5 days a week. How many metres does she run in a week?", options:["7000m","14000m","1400m","700m"], answer:"14000m", explanation:"1.4×2=2.8km/day. 2.8×5=14km. 14×1000=14000m", coach:"Total distance = daily × 5, then convert." }
      }]
    },
    {
      id: "probability", grade: 6,
      realWorld: {"title": "The Coin & Dice Lab", "emoji": "🎲", "task": "Flip a coin 20 times. Tally heads vs tails. Was it close to 50-50? Roll a dice 30 times. How often did you get a 6? Compare what actually happened to what SHOULD happen (1 in 6).", "materials": "A coin and a dice", "bringBack": "Your tallies. Did reality match the theory?"}, title: "Probability", emoji: "🎲",
      tagline: "How likely is it?", color: "topic-coral", difficulty: "core",
      lessons: [{
        id: "pro-1", title: "Basic probability",
        firstPrinciple: "Probability measures how likely an event is. It always lies between 0 (impossible) and 1 (certain). P(event) = number of favourable outcomes ÷ total possible outcomes.",
        blocks: [
          { type: "text", title: "The formula", body: "P(event) = favourable outcomes ÷ total outcomes\n\nBag: 5 red, 3 blue, 2 green = 10 total\nP(blue) = 3/10 = 0.3 = 30%" },
          { type: "example", title: "Complement rule", body: "All probabilities sum to 1.\nP(not blue) = 1 − P(blue) = 1 − 3/10 = 7/10\n\nTanusree used this correctly in her homework!" },
          { type: "tip", body: "Experimental probability = how many times it happened ÷ total trials. Gets closer to theoretical with more trials." }
        ],
        practice: [
          { id:"pro-e01", tier:"easy",   prompt:"Die rolled. P(rolling a 4)?",              options:["1/4","1/6","4/6","1/3"],      answer:"1/6", hint:"6 equally likely outcomes. Only one 4.", explanation:"P(4)=1/6",                         skill:"basic-probability",       misconception:"uses-number-as-denominator" },
          { id:"pro-e02", tier:"easy",   prompt:"Bag: 5r,3b,2g. P(blue)?",                  options:["3/7","3/10","1/3","2/5"],     answer:"3/10", hint:"Total=5+3+2=10. Blue=3.",            explanation:"P(blue)=3/10",                      skill:"basic-probability",       misconception:"forgets-to-find-total" },
          { id:"pro-e03", tier:"easy",   prompt:"P(sunny)=0.6. P(not sunny)?",              options:["0.6","0.4","1.6","0.06"],     answer:"0.4", hint:"All outcomes sum to 1.",              explanation:"1−0.6=0.4",                         skill:"complement",              misconception:"subtracts-from-wrong-value" },
          { id:"pro-m01", tier:"medium", prompt:"Bag: 4r,3b,2g=9 total. P(not red)?",       options:["4/9","5/9","1/9","5/4"],      answer:"5/9", hint:"P(not red)=1−4/9. Or count non-red=5.", explanation:"P(not red)=5/9",                   skill:"complement",              misconception:"forgets-complement-rule" },
          { id:"pro-m02", tier:"medium", prompt:"P(sunny)=0.45, P(cloudy)=0.35. P(rainy)?", options:["0.80","0.20","0.15","0.10"],  answer:"0.20", hint:"All three must sum to 1.",           explanation:"1−0.45−0.35=0.20",                  skill:"all-outcomes-sum",        misconception:"adds-instead-of-subtracts" },
          { id:"pro-m03", tier:"medium", prompt:"Tanusree's Term 3: vowels table. P(A)=0.06,P(E)=0.14,P(I)=0.07,P(O)=0.1,P(U)=0.04. P(consonant)?", options:["0.41","0.59","0.31","0.69"], answer:"0.59", hint:"1 minus all vowel probabilities.", explanation:"1−(0.06+0.14+0.07+0.1+0.04)=1−0.41=0.59 ✓", skill:"complement", misconception:"adds-instead-of-subtracts" },
          { id:"pro-h01", tier:"hard",   prompt:"In 100 flips, heads=65. Experimental P(heads)?", options:["0.5","0.65","65","1/2"], answer:"0.65", hint:"Experimental P = times it happened ÷ total.", explanation:"65/100=0.65",                skill:"experimental-probability", misconception:"uses-theoretical-instead" }
        ],
        challenge: { prompt:"A spinner: 4 equal sections coloured red, blue, red, green. P(not red)?", options:["1/4","1/2","3/4","2/4"], answer:"1/2", explanation:"2 red out of 4. P(red)=2/4=1/2. P(not red)=1−1/2=1/2.", coach:"Count red sections, then use complement." }
      }]
    },
    {
      id: "rounding", grade: 6,
      realWorld: {"title": "Shopping Bill Rounder", "emoji": "🛒", "task": "Look at a shopping bill or price tags. Pick 5 prices with paise/decimals (like ₹47.80). Round each to the nearest rupee (whole number) AND to the nearest ten rupees. Notice how 'tenth' and 'ten' give totally different answers!", "materials": "A shopping bill or price tags", "bringBack": "Your 5 prices, rounded two different ways."}, title: "Rounding Decimals", emoji: "🎯",
      tagline: "Tenth is NOT ten — let's fix that forever",
      color: "topic-orange", difficulty: "foundations", fromSchool: true,
      schoolNote: "Tanusree rounded 6.84 to 10 instead of 6.8 — confused 'tenth' with 'ten'.",
      lessons: [{
        id: "rnd-1", title: "Place value and rounding",
        firstPrinciple: "Every digit has a home. Right of the decimal point: tenths (0.1), hundredths (0.01), thousandths (0.001). 'Tenth' means one-tenth of 1. 'Ten' means 10 units. They are completely different places.",
        blocks: [
          { type: "text", title: "The decimal map", body: "6.843\n6 = ones\n8 = tenths (0.1 place) ← FIRST after decimal\n4 = hundredths (0.01 place)\n3 = thousandths (0.001 place)\n\nRound to nearest TENTH → answer has 1 decimal place\nRound to nearest TEN → answer is a multiple of 10\nTHESE ARE COMPLETELY DIFFERENT!" },
          { type: "example", title: "Rounding steps", body: "Round 6.84 to nearest tenth:\n1. Find tenths digit: 8\n2. Look one place RIGHT (hundredths): 4\n3. Since 4 < 5: round DOWN (keep 8)\n4. Answer: 6.8 ✓\n\nNOT 10! Tanusree made this mistake in her homework." },
          { type: "tip", body: "Memory trick: 'nearest tenth' = 1 digit after decimal. 'nearest hundred' = round to hundreds. The word tells you the place!" }
        ],
        practice: [
          { id:"rnd-e01", tier:"easy",   prompt:"Round 6.84 to the nearest tenth.",          options:["6.8","7.0","6.9","10"],       answer:"6.8",  hint:"Tenths=8, hundredths=4. Since 4<5, round down.", explanation:"6.8 (NOT 10 — tenth ≠ ten!)",    skill:"round-to-tenth",     misconception:"confuses-tenth-with-ten" },
          { id:"rnd-e02", tier:"easy",   prompt:"Round 7.852 to the nearest tenth.",         options:["7.8","7.9","8.0","10"],       answer:"7.9",  hint:"Tenths=8, hundredths=5. Since 5≥5, round UP.",  explanation:"7.9",                            skill:"round-to-tenth",     misconception:"rounds-down-at-five" },
          { id:"rnd-e03", tier:"easy",   prompt:"Round 23.1378 to the nearest tenth.",       options:["23","23.1","20","23.2"],      answer:"23.1", hint:"Tenths=1, hundredths=3. Since 3<5, keep 1.",   explanation:"23.1",                           skill:"round-to-tenth",     misconception:"confuses-tenth-with-ten" },
          { id:"rnd-e04", tier:"easy",   prompt:"Round 18.229 to the nearest tenth.",        options:["18","18.2","18.3","20"],      answer:"18.2", hint:"Tenths=2, hundredths=2. Since 2<5, keep 2.",   explanation:"18.2",                           skill:"round-to-tenth",     misconception:"confuses-tenth-with-ten" },
          { id:"rnd-e05", tier:"easy",   prompt:"Round 384.16 to the nearest tenth.",        options:["380","384.1","384.2","384"],  answer:"384.2", hint:"Tenths=1, hundredths=6. Since 6≥5, round UP.",explanation:"384.2 (not 380!)",               skill:"round-to-tenth",     misconception:"confuses-tenth-with-ten" },
          { id:"rnd-e06", tier:"easy",   prompt:"Round 2.392 to the nearest tenth.",         options:["2.3","2.4","2.0","2"],        answer:"2.4",  hint:"Tenths=3, hundredths=9. Since 9≥5, round UP.", explanation:"2.4",                            skill:"round-to-tenth",     misconception:"rounds-down-at-five" },
          { id:"rnd-m01", tier:"medium", prompt:"Round 8.832 to the nearest hundredth.",     options:["8.8","8.83","8.84","8.9"],    answer:"8.83", hint:"Hundredths=3, thousandths=2. Since 2<5, keep 3.", explanation:"8.83",                        skill:"round-to-hundredth", misconception:"wrong-place-selected" },
          { id:"rnd-m02", tier:"medium", prompt:"Round 47.247 to the nearest hundredth.",    options:["47.2","47.24","47.25","47"],  answer:"47.25", hint:"Hundredths=4, thousandths=7. Since 7≥5, round UP.", explanation:"47.25",                   skill:"round-to-hundredth", misconception:"rounds-down-at-five" },
          { id:"rnd-h01", tier:"hard",   prompt:"A number rounds to 4.6 (nearest tenth). Which could be the original?", options:["4.64","4.54","4.69","4.50"], answer:"4.64", hint:"For 4.6, hundredths must be 0-4.", explanation:"4.64: hundredths=4 → rounds to 4.6", skill:"round-to-tenth", misconception:"rounds-down-at-five" },
          { id:"rnd-h02", tier:"hard",   prompt:"Round 2.1115 to the nearest thousandth.",   options:["2.111","2.112","2.110","2.1"], answer:"2.112", hint:"Thousandths=1, next digit=5. Since 5≥5, round UP.", explanation:"2.112",                  skill:"round-to-thousandth", misconception:"rounds-down-at-five" }
        ],
        challenge: { prompt:"Tanusree measures her desk as 47.247cm. Her teacher asks for the nearest hundredth. What should she write?", options:["47.2cm","47.24cm","47.25cm","47cm"], answer:"47.25cm", explanation:"Hundredths=4, thousandths=7. Round up: 47.25cm", coach:"Hundredths = second digit after decimal." }
      }]
    },
    {
      id: "integers", grade: 6,
      realWorld: {"title": "Temperature & Floors", "emoji": "🌡️", "task": "Check the fridge and freezer temperature (freezers are often -18°C). Look at a tall building's lift buttons — basement floors are negative! Count how many floors from B2 (-2) up to floor 5. That's an integer jump!", "materials": "A fridge, or a building with a basement", "bringBack": "What's the freezer temp? How many floors from the lowest basement to the top?"}, title: "Integers & Negative Numbers", emoji: "🌡️",
      tagline: "Numbers below zero", color: "topic-blue", difficulty: "foundations", fromSchool: true,
      schoolNote: "Tanusree scored 20/20 on comparing integers. Extending to operations.",
      lessons: [{
        id: "int-1", title: "Negative numbers and operations",
        firstPrinciple: "Negative numbers are numbers less than zero. They exist everywhere — temperature, debt, underground floors. The number line extends infinitely left (negative) and right (positive). Zero is the middle.",
        blocks: [
          { type: "text", title: "Comparing negatives", body: "Closer to zero = greater value.\n-3 > -7 (because -3 is closer to zero)\n-1 > -100\n\nThink: -3°C is warmer than -7°C." },
          { type: "example", title: "Operations", body: "Add: -7 + 12 = 5 (move right 12 from -7)\nSubtract: 5 - (-3) = 5 + 3 = 8\n\nMultiply/Divide sign rules:\nSame signs → positive: -6 × -4 = +24\nDifferent signs → negative: -6 × 4 = -24" },
          { type: "tip", body: "Sign rule: same signs = positive. Different signs = negative. Applies to both multiplication AND division." }
        ],
        practice: [
          { id:"int-e01", tier:"easy",   prompt:"Which is greater: -45 or -47?",            options:["-47","-45","Equal","Cannot tell"], answer:"-45", hint:"-45 is closer to zero.",           explanation:"-45 > -47. Closer to zero = greater.", skill:"compare-integers",  misconception:"bigger-number-is-greater" },
          { id:"int-e02", tier:"easy",   prompt:"Order smallest to largest: -25,-20,-45,-50", options:["-20,-25,-45,-50","-50,-45,-25,-20","-45,-50,-20,-25","Cannot order"], answer:"-50,-45,-25,-20", hint:"Most negative = smallest.", explanation:"-50<-45<-25<-20", skill:"order-integers", misconception:"ignores-negative-sign" },
          { id:"int-e03", tier:"easy",   prompt:"What is -7 + 12?",                          options:["-19","19","5","-5"],              answer:"5",    hint:"Start at -7, move 12 right.",       explanation:"-7+12=5",                              skill:"add-integers",      misconception:"adds-absolute-values" },
          { id:"int-m01", tier:"medium", prompt:"Evaluate: -6 × -4",                         options:["-24","24","-10","10"],            answer:"24",   hint:"Same signs → positive.",           explanation:"-6×-4=24",                             skill:"multiply-integers",  misconception:"same-signs-give-negative" },
          { id:"int-m02", tier:"medium", prompt:"Evaluate: -48 ÷ 12",                        options:["-4","4","-60","60"],              answer:"-4",   hint:"Different signs → negative.",      explanation:"-48÷12=-4",                            skill:"divide-integers",   misconception:"ignores-sign-rule" },
          { id:"int-m03", tier:"medium", prompt:"Temperature -3°C drops 8°C more. New temp?", options:["-11°C","5°C","-5°C","11°C"],   answer:"-11°C", hint:"-3 - 8 = ?",                     explanation:"-3-8=-11°C",                           skill:"add-integers",      misconception:"subtracts-absolute-values" },
          { id:"int-h01", tier:"hard",   prompt:"Greatest value: -5×-8, -6×4, 3×-9, or -2×-2?", options:["40","−24","−27","4"],      answer:"40",   hint:"-5×-8=40, -6×4=-24, 3×-9=-27, -2×-2=4", explanation:"40 is greatest",                  skill:"multiply-integers",  misconception:"same-signs-give-negative" },
          { id:"int-h02", tier:"hard",   prompt:"Freezer: -18°C. Room: 32°C. Difference?",   options:["14°C","50°C","46°C","18°C"],     answer:"50°C", hint:"32 - (-18) = 32 + 18",           explanation:"32-(-18)=32+18=50°C",                  skill:"subtract-integers", misconception:"adds-instead-of-subtracts" }
        ],
        challenge: { prompt:"In a quiz, correct = +3, wrong = -1. Tanusree gets 8 right and 4 wrong. What is her score?", options:["24","20","28","12"], answer:"20", explanation:"8×3=24. 4×(-1)=-4. 24+(-4)=20", coach:"Calculate points earned and points lost separately." }
      }]
    },
    {
      id: "functions", grade: 6,
      realWorld: {"title": "The Human Function Machine", "emoji": "⚙️", "task": "Play a game with a family member. You are the 'machine': secretly pick a rule (like 'double it and add 1'). They call out numbers, you give outputs. Can they guess your rule? Then swap!", "materials": "One other person", "bringBack": "What rule did you use? How many guesses did they need?"}, title: "Function Machines", emoji: "⚙️",
      tagline: "Input → Rule → Output", color: "topic-teal", difficulty: "foundations", fromSchool: true,
      schoolNote: "Term 3 Assessment Q1: cube→+2. She correctly got 66 and 29.",
      lessons: [{
        id: "func-1", title: "Function machines — forward and backward",
        firstPrinciple: "A function machine applies rules to an input to produce an output. The same rule applies to every input. Working backwards uses inverse operations in reverse order.",
        blocks: [
          { type: "text", title: "How it works", body: "INPUT → [RULE 1] → [RULE 2] → OUTPUT\n\nExample: 5 → [×3] → 15 → [+2] → 17\n\nForward: apply rules left to right.\nBackward: reverse order, use inverses.\n+2 inverse is -2. ×3 inverse is ÷3." },
          { type: "example", title: "From Tanusree's Term 3 test", body: "Machine: [cube] → [+2]\n\nInput 4: 4³=64, 64+2=66 ✓\nInput 3: 3³=27, 27+2=29 ✓\n\nBackwards from 29:\n29-2=27, ∛27=3 → input was 3 ✓" },
          { type: "tip", body: "Working backwards: undo the LAST operation first, then the second-last, etc." }
        ],
        practice: [
          { id:"func-e01", tier:"easy",   prompt:"Machine: input=4, [cube then +2]. Output?", options:["10","66","18","6"],           answer:"66",  hint:"4³=64, 64+2=66",                    explanation:"4³=64, 64+2=66 (Tanusree's Term 3 test!)", skill:"function-machine",  misconception:"multiplies-by-3-instead-of-cubing" },
          { id:"func-e02", tier:"easy",   prompt:"Machine: input=3, [cube then +2]. Output?", options:["11","29","9","27"],           answer:"29",  hint:"3³=27, 27+2=29",                    explanation:"3³=27, 27+2=29 (Tanusree's Term 3 test!)", skill:"function-machine",  misconception:"multiplies-by-3-instead-of-cubing" },
          { id:"func-e03", tier:"easy",   prompt:"Machine: input=5, rule [×4]. Output?",      options:["9","20","25","54"],           answer:"20",  hint:"5 × 4 = ?",                          explanation:"5×4=20",                               skill:"function-machine",  misconception:"adds-instead-of-multiplies" },
          { id:"func-m01", tier:"medium", prompt:"Machine: input → ×3 → +2 → output. Input=5. Output?", options:["17","21","13","10"], answer:"17", hint:"5×3=15, then 15+2=17",             explanation:"5×3=15, 15+2=17",                      skill:"function-machine",  misconception:"wrong-order-of-operations" },
          { id:"func-m02", tier:"medium", prompt:"Machine: ×3 then +2. Output=17. Input?",    options:["3","4","5","6"],              answer:"5",   hint:"Undo +2: 17-2=15. Undo ×3: 15÷3=?", explanation:"17-2=15, 15÷3=5",                    skill:"inverse-function",  misconception:"wrong-order-of-operations" },
          { id:"func-m03", tier:"medium", prompt:"Machine: input → +15 → output=23. Input?",  options:["38","8","15","7"],            answer:"8",   hint:"Undo +15: 23-15=?",                 explanation:"23-15=8. Check: 8+15=23 ✓",            skill:"inverse-function",  misconception:"adds-instead-of-subtracts" },
          { id:"func-h01", tier:"hard",   prompt:"Machine: ×5 then -3. Output=22. Input?",    options:["5","4","3","6"],              answer:"5",   hint:"Undo -3: 22+3=25. Undo ×5: 25÷5=?", explanation:"25÷5=5. Check: 5×5-3=22 ✓",          skill:"inverse-function",  misconception:"wrong-order-of-operations" }
        ],
        challenge: { prompt:"Machine: square then subtract 1. Output=35. What was the input?", options:["5","6","7","4"], answer:"6", explanation:"35+1=36, √36=6. Check: 6²-1=35 ✓", coach:"Undo the last operation first." }
      }]
    },
    {
      id: "surface-area", grade: 6,
      realWorld: {"title": "Wrap the Box", "emoji": "🎁", "task": "Find a small box at home (tissue box, soap box). Measure its length, width, and height with a ruler. Calculate the surface area. Then wrap it in paper — did your calculation match how much paper you needed?", "materials": "A small box, ruler, paper", "bringBack": "The box dimensions and your surface area calculation."}, title: "Surface Area", emoji: "📦",
      tagline: "How much wrapping paper to cover a box?",
      color: "topic-purple", difficulty: "bridge", fromSchool: true,
      schoolNote: "Homework pages 5-6 left completely blank. Full introduction needed.",
      lessons: [{
        id: "sa-1", title: "Surface area of rectangular prisms",
        firstPrinciple: "Surface area is the total area of all outside faces of a 3D shape. Imagine cutting a cardboard box open and laying it flat — the total area of all the pieces is the surface area.",
        blocks: [
          { type: "text", title: "6 faces in 3 pairs", body: "A box (l×w×h) has 6 faces in 3 identical pairs:\n• Top + Bottom: each = l × w\n• Front + Back: each = l × h\n• Left + Right: each = w × h\n\nSA = 2(lw + lh + wh)" },
          { type: "example", title: "From Tanusree's homework (page 5)", body: "Box: l=5in, w=3in, h=6in\nlw = 5×3 = 15\nlh = 5×6 = 30\nwh = 3×6 = 18\nSum = 63\nSA = 2×63 = 126 in²" },
          { type: "tip", body: "Always multiply by 2 at the end — every face has an identical opposite face!" }
        ],
        practice: [
          { id:"sa-e01", tier:"easy",   prompt:"Box l=5,w=3,h=6. Area of top face (lw)?",   options:["15","18","30","8"],           answer:"15",   hint:"lw = 5 × 3",                         explanation:"lw=5×3=15",                           skill:"surface-area-faces",   misconception:"multiplies-all-three" },
          { id:"sa-e02", tier:"easy",   prompt:"Box l=5,w=3,h=6. Calculate lh.",             options:["15","18","30","8"],           answer:"30",   hint:"lh = 5 × 6",                         explanation:"lh=5×6=30",                           skill:"surface-area-faces",   misconception:"wrong-face" },
          { id:"sa-m01", tier:"medium", prompt:"Box l=5,w=3,h=6. lw+lh+wh=?",               options:["63","126","45","90"],         answer:"63",   hint:"15+30+18=?",                          explanation:"15+30+18=63",                         skill:"surface-area-faces",   misconception:"forgets-one-pair" },
          { id:"sa-m02", tier:"medium", prompt:"Box l=5in,w=3in,h=6in. Surface area?",       options:["63in²","126in²","90in²","252in²"], answer:"126in²", hint:"SA=2(lw+lh+wh)=2×63",      explanation:"SA=2×63=126in²",                      skill:"surface-area",         misconception:"forgets-to-multiply-by-2" },
          { id:"sa-m03", tier:"medium", prompt:"Box l=7cm,w=5cm,h=3cm. Surface area?",       options:["71cm²","142cm²","105cm²","210cm²"], answer:"142cm²", hint:"lw=35,lh=21,wh=15. SA=2(35+21+15)", explanation:"SA=2×71=142cm²",               skill:"surface-area",         misconception:"forgets-to-multiply-by-2" },
          { id:"sa-m04", tier:"medium", prompt:"Cube with side 4cm. Surface area?",          options:["16cm²","64cm²","96cm²","24cm²"], answer:"96cm²", hint:"6 faces each = 4×4=16.",          explanation:"6×16=96cm²",                          skill:"surface-area",         misconception:"multiplies-by-4-instead-of-6" },
          { id:"sa-h01", tier:"hard",   prompt:"Cube has surface area 150cm². Side length?", options:["5cm","6cm","25cm","15cm"],    answer:"5cm",  hint:"6s²=150 → s²=25 → s=√25",          explanation:"s=5cm. Check: 6×25=150 ✓",            skill:"reverse-surface-area", misconception:"divides-by-4" }
        ],
        challenge: { prompt:"Tanusree paints a box 7cm×5cm×3cm. 1 tin covers 100cm². How many tins needed?", options:["1","2","3","4"], answer:"2", explanation:"SA=2(35+21+15)=142cm². 142÷100=1.42 → round up → 2 tins.", coach:"Always round UP for paint — you can't buy half a tin." }
      }]
    },
    {
      id: "g7-integer-ops", grade: 7, term: 1,
      realWorld: {"title": "Temperature Tracker", "emoji": "🌡️", "task": "Check the temperature at home each morning and evening for 3 days (weather app or thermometer). Write each as a signed number if below a reference (e.g. compare to 25°C: 22°C = -3, 30°C = +5). Add up the day's total change. On which day did it swing the most?", "materials": "A weather app or thermometer, notebook", "bringBack": "Your 3 days of signed temperature differences and totals."}, title: "Integer Operations", emoji: "🔢",
      tagline: "Add, subtract, multiply, divide — the four rules", color: "topic-blue", difficulty: "core",
      lessons: [{
        id: "g7int-1", title: "The four rules with integers",
        firstPrinciple: "Every integer operation follows a sign rule. For addition and subtraction, think of moving along a number line. For multiplication and division, same signs give a positive result, different signs give a negative result — no exceptions.",
        blocks: [
          { type: "text", title: "Addition and subtraction", body: "Adding a positive moves RIGHT on the number line.\nAdding a negative moves LEFT.\nSubtracting a negative is the same as adding a positive: 5 − (−3) = 5 + 3 = 8\n\nThink of it as removing a debt — removing -3 leaves you 3 better off." },
          { type: "example", title: "Multiplication and division sign rule", body: "Same signs → positive:\n(-6) × (-4) = 24\n(-20) ÷ (-5) = 4\n\nDifferent signs → negative:\n(-6) × 4 = -24\n20 ÷ (-5) = -4\n\nCount the negative signs: an even number of negatives gives a positive result, an odd number gives negative." },
          { type: "tip", body: "When two negative signs sit next to each other (like 5 − (−3)), they combine into a plus. 'Minus a minus' always becomes 'plus'." }
        ],
        practice: [
          { id:"g7int-e01", tier:"easy",   prompt:"Evaluate: -8 + 15",                  options:["-23","7","-7","23"],        answer:"7",   hint:"Start at -8, move 15 right.",         explanation:"-8+15=7",                             skill:"add-integers",        misconception:"adds-absolute-values" },
          { id:"g7int-e02", tier:"easy",   prompt:"Evaluate: 6 - 10",                   options:["-4","4","16","-16"],        answer:"-4",  hint:"6 is smaller — result is negative.", explanation:"6-10=-4",                             skill:"subtract-integers",   misconception:"ignores-sign-when-smaller" },
          { id:"g7int-e03", tier:"easy",   prompt:"Evaluate: -5 - (-9)",                options:["-14","14","4","-4"],        answer:"4",   hint:"Minus a minus becomes plus: -5+9.",  explanation:"-5-(-9)=-5+9=4",                       skill:"subtract-integers",   misconception:"treats-double-negative-as-negative" },
          { id:"g7int-e04", tier:"easy",   prompt:"Evaluate: -7 × 6",                   options:["42","-42","13","-13"],      answer:"-42", hint:"Different signs → negative.",        explanation:"-7×6=-42",                            skill:"multiply-integers",   misconception:"ignores-sign-rule" },
          { id:"g7int-e05", tier:"easy",   prompt:"Evaluate: -9 × -3",                  options:["-27","27","-12","12"],      answer:"27",  hint:"Same signs → positive.",             explanation:"-9×-3=27",                            skill:"multiply-integers",   misconception:"same-signs-give-negative" },
          { id:"g7int-e06", tier:"easy",   prompt:"Evaluate: -36 ÷ 4",                  options:["-9","9","-32","32"],        answer:"-9",  hint:"Different signs → negative.",        explanation:"-36÷4=-9",                            skill:"divide-integers",     misconception:"ignores-sign-rule" },
          { id:"g7int-e07", tier:"easy",   prompt:"Evaluate: -63 ÷ -7",                 options:["-9","9","-70","70"],        answer:"9",   hint:"Same signs → positive.",             explanation:"-63÷-7=9",                            skill:"divide-integers",     misconception:"same-signs-give-negative" },
          { id:"g7int-e08", tier:"easy",   prompt:"Evaluate: 4 - (-6)",                 options:["-2","2","10","-10"],        answer:"10",  hint:"4 + 6.",                              explanation:"4-(-6)=4+6=10",                       skill:"subtract-integers",   misconception:"treats-double-negative-as-negative" },
          { id:"g7int-m01", tier:"medium", prompt:"Evaluate: -12 + (-8) - (-5)",        options:["-15","-25","-5","15"],      answer:"-15", hint:"Work left to right: -12-8=-20, then -20+5.", explanation:"-12+(-8)=-20. -20-(-5)=-20+5=-15", skill:"mixed-operations", misconception:"treats-double-negative-as-negative" },
          { id:"g7int-m02", tier:"medium", prompt:"Evaluate: -5 × -4 + 3",              options:["-17","17","23","-23"],      answer:"23",  hint:"Multiply first: -5×-4=20. Then add 3.", explanation:"20+3=23",                          skill:"order-of-operations",  misconception:"adds-before-multiplying" },
          { id:"g7int-m03", tier:"medium", prompt:"Evaluate: (-2)³",                    options:["-8","8","-6","6"],          answer:"-8",  hint:"(-2)×(-2)×(-2). Odd number of negatives.", explanation:"-2×-2=4, 4×-2=-8",                skill:"integer-powers",       misconception:"ignores-odd-negative-count" },
          { id:"g7int-m04", tier:"medium", prompt:"Temperature drops from -3°C by 8°C more. New temperature?", options:["-11°C","5°C","-5°C","11°C"], answer:"-11°C", hint:"-3 - 8 = ?", explanation:"-3-8=-11°C", skill:"add-integers", misconception:"subtracts-absolute-values" },
          { id:"g7int-h01", tier:"hard",   prompt:"Evaluate: -18 ÷ (-3) × -2",          options:["-12","12","-3","3"],        answer:"-12", hint:"Work left to right: -18÷-3=6, then 6×-2.", explanation:"6×-2=-12",                        skill:"mixed-operations",     misconception:"wrong-order-of-operations" },
          { id:"g7int-h02", tier:"hard",   prompt:"A submarine is at -240m. It rises 85m, then dives 40m more. New depth?", options:["-195m","-155m","-115m","195m"], answer:"-195m", hint:"-240+85=-155. -155-40=?", explanation:"-240+85=-155. -155-40=-195m", skill:"mixed-operations", misconception:"subtracts-instead-of-adds" },
          { id:"g7int-h03", tier:"hard",   prompt:"Which is greatest: -4×-5, -3×8, (-2)³, or -30÷-6?", options:["-4×-5","−3×8","(-2)³","-30÷-6"], answer:"-4×-5", hint:"Calculate each: 20, -24, -8, 5.", explanation:"-4×-5=20 is the largest value", skill:"multiply-integers", misconception:"same-signs-give-negative" }
        ],
        challenge: { prompt:"A lift starts at floor -2 (basement). It goes up 7 floors, then down 3 floors, then up 1 more. What floor is it on?", options:["3","5","2","4"], answer:"3", explanation:"-2+7=5. 5-3=2. 2+1=3. Final floor: 3", coach:"Track the position step by step, treating each move as adding or subtracting." }
      }]
    },
    {
      id: "g7-factors-indices", grade: 7, term: 1,
      realWorld: {"title": "Prime Factor Hunt", "emoji": "🔍", "task": "Pick 3 numbers from things around the house — a page number, a clock time, a phone number's last 2 digits. Break each into its prime factors (a factor tree on paper). Which number had the most prime factors?", "materials": "Paper and pencil, anything with numbers on it", "bringBack": "Your 3 factor trees and which number 'won'."}, title: "Factors, Multiples, Primes & Indices", emoji: "🧮",
      tagline: "Breaking numbers down to their building blocks", color: "topic-teal", difficulty: "core",
      lessons: [{
        id: "g7fmi-1", title: "Factors, multiples, primes and powers",
        firstPrinciple: "Every whole number bigger than 1 is either prime (only divisible by 1 and itself) or can be broken down into a unique set of prime factors — like a fingerprint. Indices (powers) are just repeated multiplication written compactly: 2⁴ means 2×2×2×2. Roots undo powers: √16 asks 'what number times itself gives 16?'",
        blocks: [
          { type: "text", title: "Factors vs multiples", body: "Factors of 12 are numbers that DIVIDE INTO 12 exactly: 1,2,3,4,6,12.\nMultiples of 12 are numbers 12 divides INTO: 12,24,36,48...\n\nA prime number has exactly 2 factors: 1 and itself. 2,3,5,7,11,13... are prime. 1 is NOT prime (it only has 1 factor)." },
          { type: "example", title: "Prime factorization", body: "Break 60 into primes using a factor tree:\n60 = 2 × 30\n30 = 2 × 15\n15 = 3 × 5\nSo 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5\n\nEvery number has exactly ONE prime factorization — that's why it's called the Fundamental Theorem of Arithmetic." },
          { type: "tip", body: "Indices shortcut: when multiplying same bases, ADD the powers (2³×2² = 2⁵). When dividing, SUBTRACT the powers (2⁵÷2² = 2³). This only works when the base is the same." },
          { type: "text", title: "Divisibility rules — spot factors instantly", body: "You don't always need long division to check if a number is a factor. Quick checks:\n÷2: last digit is even (0,2,4,6,8)\n÷3: digits add up to a multiple of 3 (e.g. present number 141: 1+4+1=6, so 141÷3 works)\n÷5: ends in 0 or 5\n÷9: digits add up to a multiple of 9\n÷10: ends in 0\n\nThese rules turn a slow guess-and-check into a 2-second glance." },
          { type: "example", title: "Power of a power — an extra index law", body: "When a power is raised to ANOTHER power, MULTIPLY the exponents:\n(2³)² = 2^(3×2) = 2⁶ = 64\n\nCheck it the long way: (2³)² = 8² = 64 ✓ — same answer, but multiplying exponents is much faster than expanding it all out.\n\nSo you now have three index rules: multiplying same bases → ADD powers. Dividing same bases → SUBTRACT powers. A power raised to a power → MULTIPLY powers." }
        ],
        practice: [
          { id:"g7fmi-e01", tier:"easy",   prompt:"List all factors of 18",                    options:["1,2,3,6,9,18","1,3,6,18","2,3,6,9","1,2,9,18"],   answer:"1,2,3,6,9,18", hint:"Find every number that divides 18 exactly.", explanation:"1×18=18, 2×9=18, 3×6=18 → factors: 1,2,3,6,9,18", skill:"find-factors", misconception:"misses-factor-pairs" },
          { id:"g7fmi-e02", tier:"easy",   prompt:"Which is a prime number?",                  options:["21","27","29","33"],                              answer:"29",           hint:"Check if it divides by anything other than 1 and itself.", explanation:"21=3×7, 27=3×9, 33=3×11 are all composite. 29 has no other factors.", skill:"identify-primes", misconception:"confuses-odd-with-prime" },
          { id:"g7fmi-e03", tier:"easy",   prompt:"What is the first 3 multiples of 7?",       options:["7,14,21","7,17,27","0,7,14","7,21,35"],           answer:"7,14,21",      hint:"Multiply 7 by 1, 2, 3.", explanation:"7×1=7, 7×2=14, 7×3=21",                explanation2:"", skill:"find-multiples", misconception:"confuses-factors-and-multiples" },
          { id:"g7fmi-e04", tier:"easy",   prompt:"Evaluate: 3⁴",                              options:["12","81","64","27"],                              answer:"81",           hint:"3×3×3×3, not 3×4.", explanation:"3×3=9, 9×3=27, 27×3=81",                skill:"evaluate-powers", misconception:"multiplies-base-by-exponent" },
          { id:"g7fmi-e05", tier:"easy",   prompt:"Evaluate: √49",                             options:["7","24.5","14","6"],                              answer:"7",             hint:"What number times itself gives 49?", explanation:"7×7=49",                                skill:"square-roots",    misconception:"halves-instead-of-root" },
          { id:"g7fmi-e06", tier:"easy",   prompt:"Which number is composite (not prime)?",    options:["17","19","21","23"],                              answer:"21",            hint:"Check for factors other than 1 and itself.", explanation:"21=3×7, so it's composite. The rest are prime.", skill:"identify-primes", misconception:"confuses-odd-with-prime" },
          { id:"g7fmi-e07", tier:"easy",   prompt:"Find the HCF of 12 and 18",                 options:["2","6","36","3"],                                 answer:"6",             hint:"Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18.", explanation:"Common factors: 1,2,3,6 → highest is 6", skill:"hcf",              misconception:"finds-lcm-instead" },
          { id:"g7fmi-e08", tier:"easy",   prompt:"Find the LCM of 4 and 6",                   options:["24","10","12","2"],                               answer:"12",            hint:"List multiples: 4,8,12,16... and 6,12,18...", explanation:"First common multiple is 12",           skill:"lcm",              misconception:"finds-hcf-instead" },
          { id:"g7fmi-e09", tier:"easy",   prompt:"Using the divisibility rule, is 342 divisible by 3?", options:["Yes","No"], answer:"Yes", hint:"Add the digits: 3+4+2=9. Is 9 a multiple of 3?", explanation:"3+4+2=9, and 9 is a multiple of 3, so 342 is too", skill:"divisibility-rules", misconception:"checks-last-digit-instead-of-digit-sum" },
          { id:"g7fmi-e10", tier:"easy",   prompt:"Using the divisibility rule, is 4,120 divisible by 5?", options:["Yes","No"], answer:"Yes", hint:"Does it end in 0 or 5?", explanation:"It ends in 0, so it's divisible by 5", skill:"divisibility-rules", misconception:"unsure-of-rule" },
          { id:"g7fmi-m05", tier:"medium", prompt:"Simplify: (3²)³",                            options:["3⁶","3⁵","9⁶","3⁹"],                              answer:"3⁶",            hint:"Power of a power — MULTIPLY the exponents.", explanation:"(3²)³=3^(2×3)=3⁶",                       skill:"power-of-power", misconception:"adds-exponents-instead-of-multiplying" },
          { id:"g7fmi-m06", tier:"medium", prompt:"Using divisibility rules, which of these is divisible by 9?", options:["234","235","326","413"], answer:"234", hint:"Add the digits of each and check for a multiple of 9.", explanation:"2+3+4=9 ✓ (the others: 2+3+5=10, 3+2+6=11, 4+1+3=8 — none are multiples of 9)", skill:"divisibility-rules", misconception:"checks-divisibility-by-3-rule-for-9" },
          { id:"g7fmi-h04", tier:"hard",  prompt:"Simplify: (2²)³ × 2",                          options:["2⁷","2⁶","4⁶","2⁵"],                              answer:"2⁷",             hint:"First (2²)³=2⁶ (power of a power), then multiply by 2¹ — add exponents.", explanation:"(2²)³=2⁶. 2⁶×2¹=2^(6+1)=2⁷", skill:"power-of-power", misconception:"forgets-to-combine-with-final-multiplication" },
          { id:"g7fmi-m01", tier:"medium", prompt:"Write 60 as a product of prime factors",    options:["2²×3×5","2×3×10","2²×15","4×15"],                 answer:"2²×3×5",       hint:"Use a factor tree: 60=2×30=2×2×15=2×2×3×5.", explanation:"60=2×2×3×5=2²×3×5",                   skill:"prime-factorization", misconception:"leaves-composite-factors" },
          { id:"g7fmi-m02", tier:"medium", prompt:"Simplify: 2³ × 2⁴",                         options:["2⁷","2¹²","4⁷","2¹"],                             answer:"2⁷",            hint:"Same base — ADD the powers.", explanation:"2³×2⁴=2^(3+4)=2⁷",                        skill:"index-laws",      misconception:"multiplies-powers-instead-of-adding" },
          { id:"g7fmi-m03", tier:"medium", prompt:"Simplify: 5⁶ ÷ 5²",                         options:["5⁴","5³","5¹²","1⁴"],                             answer:"5⁴",            hint:"Same base — SUBTRACT the powers.", explanation:"5⁶÷5²=5^(6-2)=5⁴",                       skill:"index-laws",      misconception:"divides-powers-instead-of-subtracting" },
          { id:"g7fmi-m04", tier:"medium", prompt:"Find the HCF and LCM of 8 and 12 — what is HCF × LCM?", options:["96","20","4","24"], answer:"96", hint:"HCF=4, LCM=24. Multiply them.", explanation:"HCF=4, LCM=24, 4×24=96 (this always equals the product of the original numbers: 8×12=96)", skill:"hcf-lcm-relationship", misconception:"adds-instead-of-multiplies" },
          { id:"g7fmi-h01", tier:"hard",   prompt:"Evaluate: √144 + 3²",                       options:["21","24","15","153"],                             answer:"21",            hint:"√144=12, 3²=9. Add them.", explanation:"12+9=21",                                 skill:"mixed-powers-roots", misconception:"wrong-order-of-operations" },
          { id:"g7fmi-h02", tier:"hard",   prompt:"A number's prime factorization is 2²×3². What is the number?",    options:["36","12","24","30"], answer:"36", hint:"2²=4, 3²=9. Multiply.", explanation:"4×9=36", skill:"prime-factorization", misconception:"adds-instead-of-multiplies-factors" },
          { id:"g7fmi-h03", tier:"hard",   prompt:"Two bells ring every 6 and 8 minutes. If they ring together now, when do they next ring together?", options:["24 min","48 min","14 min","2 min"], answer:"24 min", hint:"This is asking for the LCM of 6 and 8.", explanation:"LCM(6,8)=24 minutes", skill:"lcm-word-problems", misconception:"uses-hcf-instead-of-lcm" }
        ],
        challenge: { prompt:"A rectangular garden has area 2³×3² m². If both sides are whole numbers and the garden isn't a square, what could its dimensions be?", options:["8m × 9m","6m × 12m","4m × 18m","Any of these"], answer:"Any of these", explanation:"2³×3²=72. Factor pairs of 72 that aren't equal: 8×9, 6×12, 4×18 all work — none are square (side≠side).", coach:"Once you know the total (72), think about which factor pairs multiply to it." }
      }]
    },
    {
      id: "g7-rational-irrational", grade: 7, term: 1,
      realWorld: {"title": "Sorting Numbers at Home", "emoji": "📐", "task": "Find 5 numbers around the house — a price tag, a recipe measurement, a shoe size, π on a circular object's label, a calculator's √2 button. Sort each into 'rational' (can be written as a fraction) or 'irrational' (cannot). Which was hardest to decide?", "materials": "A calculator, notebook, anything with numbers on it", "bringBack": "Your list of 5 numbers, sorted, and which one was tricky."}, title: "Rational & Irrational Numbers", emoji: "🔀",
      tagline: "Numbers that fit a fraction, and numbers that don't", color: "topic-purple", difficulty: "core",
      lessons: [{
        id: "g7ri-1", title: "Classifying rational and irrational numbers",
        firstPrinciple: "A rational number can always be written as a fraction a/b where a and b are whole numbers (b≠0) — this includes whole numbers, fractions, and decimals that terminate or repeat. An irrational number CANNOT be written as an exact fraction — its decimal goes on forever with no repeating pattern. √2, √3, and π are the most famous examples.",
        blocks: [
          { type: "text", title: "What makes a number rational", body: "Rational = can be written as a fraction:\n• Whole numbers: 5 = 5/1 ✓\n• Terminating decimals: 0.75 = 3/4 ✓\n• Repeating decimals: 0.333... = 1/3 ✓\n• Negative fractions: -2/3 ✓\n\nIrrational = decimal never ends AND never repeats:\n• π = 3.14159265... (no pattern, ever)\n• √2 = 1.41421356... (no pattern, ever)" },
          { type: "example", title: "The square root test", body: "√ of a perfect square is rational: √25=5 (whole number, rational)\n√ of a non-perfect square is irrational: √7=2.6457513...(never repeats, never ends)\n\nCheck: is the number under the root a perfect square (1,4,9,16,25,36...)? If yes → rational. If no → irrational." },
          { type: "tip", body: "Every whole number, fraction, and decimal you've used since Grade 1 is rational. Irrational numbers are the 'special' exceptions — mainly square roots of non-perfect-squares, and constants like π." }
        ],
        practice: [
          { id:"g7ri-e01", tier:"easy",   prompt:"Is 0.5 rational or irrational?",             options:["Rational","Irrational"],           answer:"Rational", hint:"Can it be written as a fraction? 0.5=1/2", explanation:"0.5=1/2, a fraction of two whole numbers", skill:"classify-rational", misconception:"decimals-always-irrational" },
          { id:"g7ri-e02", tier:"easy",   prompt:"Is √9 rational or irrational?",              options:["Rational","Irrational"],           answer:"Rational", hint:"9 is a perfect square: √9=3.", explanation:"√9=3, a whole number, so it's rational", skill:"classify-rational", misconception:"all-square-roots-irrational" },
          { id:"g7ri-e03", tier:"easy",   prompt:"Is √5 rational or irrational?",              options:["Rational","Irrational"],           answer:"Irrational", hint:"Is 5 a perfect square? (1,4,9,16...)", explanation:"5 isn't a perfect square, so √5's decimal never ends or repeats", skill:"classify-rational", misconception:"all-square-roots-rational" },
          { id:"g7ri-e04", tier:"easy",   prompt:"Is -7 rational or irrational?",              options:["Rational","Irrational"],           answer:"Rational", hint:"Can whole numbers be written as fractions?", explanation:"-7=-7/1, a fraction of whole numbers", skill:"classify-rational", misconception:"negatives-are-irrational" },
          { id:"g7ri-e05", tier:"easy",   prompt:"Is 1/3 (as a decimal, 0.333...) rational or irrational?", options:["Rational","Irrational"], answer:"Rational", hint:"It repeats forever in a pattern — does that count?", explanation:"Repeating decimals ARE rational — 0.333...=1/3 exactly", skill:"classify-rational", misconception:"never-ending-means-irrational" },
          { id:"g7ri-e06", tier:"easy",   prompt:"Is π (3.14159...) rational or irrational?",  options:["Rational","Irrational"],           answer:"Irrational", hint:"Does its decimal ever repeat in a pattern?", explanation:"π's decimal never ends and never repeats", skill:"classify-rational", misconception:"famous-numbers-are-rational" },
          { id:"g7ri-e07", tier:"easy",   prompt:"Is √16 rational or irrational?",             options:["Rational","Irrational"],           answer:"Rational", hint:"Is 16 a perfect square?", explanation:"√16=4, a whole number", skill:"classify-rational", misconception:"all-square-roots-irrational" },
          { id:"g7ri-e08", tier:"easy",   prompt:"Is 2.75 rational or irrational?",            options:["Rational","Irrational"],           answer:"Rational", hint:"It ends — can it become a fraction?", explanation:"2.75=11/4, a fraction of whole numbers", skill:"classify-rational", misconception:"decimals-always-irrational" },
          { id:"g7ri-m01", tier:"medium", prompt:"Which of these is irrational?",              options:["√36","√50","0.25","-3/4"],          answer:"√50",       hint:"Check which number under the root is NOT a perfect square.", explanation:"50 isn't a perfect square (36 and 49 are the nearest), so √50 is irrational", skill:"classify-rational", misconception:"guesses-without-checking-perfect-square" },
          { id:"g7ri-m02", tier:"medium", prompt:"Between which two whole numbers does √20 lie?", options:["4 and 5","3 and 4","5 and 6","2 and 3"], answer:"4 and 5", hint:"√16=4 and √25=5. Where does 20 fit?", explanation:"16<20<25, so 4<√20<5", skill:"estimate-irrational", misconception:"picks-wrong-perfect-square-bounds" },
          { id:"g7ri-m03", tier:"medium", prompt:"Which set contains ONLY rational numbers?", options:["2, 0.5, -3/4, √9","2, √3, π, 0.5","√2, √3, √5, √7","π, √2, 1.414..."], answer:"2, 0.5, -3/4, √9", hint:"Check every square root — is what's inside a perfect square?", explanation:"√9=3 is rational, and the rest are already fractions/decimals", skill:"classify-rational", misconception:"assumes-all-roots-in-set-are-same-type" },
          { id:"g7ri-h01", tier:"hard",   prompt:"Is the sum √4 + √9 rational or irrational?",  options:["Rational","Irrational"],           answer:"Rational", hint:"Simplify each root first: √4=2, √9=3.", explanation:"√4+√9=2+3=5, a whole number, which is rational", skill:"operations-with-roots", misconception:"assumes-any-root-sum-is-irrational" },
          { id:"g7ri-h02", tier:"hard",   prompt:"Is the sum √2 + √3 rational or irrational?",  options:["Rational","Irrational"],           answer:"Irrational", hint:"Are 2 and 3 perfect squares? Can these roots simplify to whole numbers?", explanation:"Neither √2 nor √3 simplifies to a whole number, and their sum stays irrational (≈3.146...)", skill:"operations-with-roots", misconception:"assumes-sum-of-irrationals-is-rational" },
          { id:"g7ri-h03", tier:"hard",   prompt:"Which statement is TRUE?", options:["Every square root is irrational","Every fraction is rational","Every decimal is rational","Every whole number is irrational"], answer:"Every fraction is rational", hint:"Think about the definition — a fraction IS a/b form.", explanation:"By definition, any number written as a fraction of two whole numbers is rational", skill:"rational-definitions", misconception:"overgeneralizes-square-root-rule" }
        ],
        challenge: { prompt:"A square has an area of 50cm². Is the length of its side a rational or irrational number?", options:["Irrational","Rational","Cannot be determined","Both"], answer:"Irrational", explanation:"Side = √50. Since 50 isn't a perfect square, √50 is irrational — the side length has a never-ending, non-repeating decimal.", coach:"Area of a square = side². So side = √area. Check if that area is a perfect square." }
      }]
    },
    {
      id: "g7-percentage", grade: 7, term: 1,
      realWorld: {"title": "Discount Detective", "emoji": "🏷️", "task": "Find 3 'X% off' signs — at a shop, on a food delivery app, or an online store screenshot. For each, work out the actual rupee discount and the final price by hand, then check against what the app/shop shows. Did they match?", "materials": "Phone or a shop visit, notebook", "bringBack": "Your 3 worked-out discounts and whether they matched the real price."}, title: "Percentage Deep Dive", emoji: "💯",
      tagline: "Increase, decrease, and reverse percentages", color: "topic-orange", difficulty: "core",
      lessons: [{
        id: "g7pct-1", title: "Percentage increase, decrease, and reverse percentages",
        firstPrinciple: "A percentage change scales a quantity by a multiplier. Increasing by 20% means multiplying by 1.20 (100%+20%). Decreasing by 20% means multiplying by 0.80 (100%-20%). Reverse percentage problems give you the AFTER value and ask for the BEFORE value — you divide by the multiplier instead of multiplying.",
        blocks: [
          { type: "text", title: "Percentage increase and decrease", body: "To increase ₹200 by 15%:\n₹200 × 1.15 = ₹230\n\nTo decrease ₹200 by 15%:\n₹200 × 0.85 = ₹170\n\nThe multiplier is always 1 ± (percent/100)." },
          { type: "example", title: "Reverse percentage — working backwards", body: "A shirt costs ₹460 AFTER a 15% discount. What was the ORIGINAL price?\n\n₹460 represents 85% of the original (100%-15%).\nOriginal × 0.85 = 460\nOriginal = 460 ÷ 0.85 = ₹541.18\n\nKey clue for reverse percentage: you're given the price AFTER a change, and asked for the price BEFORE." },
          { type: "tip", body: "Common mistake: for a reverse percentage, do NOT just add 15% back onto ₹460 — that gives the wrong answer (₹529, not ₹541.18) because 15% of ₹460 isn't the same as 15% of the original price." }
        ],
        practice: [
          { id:"g7pct-e01", tier:"easy",   prompt:"Increase ₹150 by 20%",                       options:["₹180","₹170","₹120","₹30"],         answer:"₹180",  hint:"Multiply by 1.20.", explanation:"150×1.20=180",                          skill:"percentage-increase", misconception:"adds-percent-as-rupees" },
          { id:"g7pct-e02", tier:"easy",   prompt:"Decrease ₹80 by 25%",                        options:["₹60","₹20","₹100","₹55"],           answer:"₹60",   hint:"Multiply by 0.75.", explanation:"80×0.75=60",                            skill:"percentage-decrease", misconception:"subtracts-percent-as-rupees" },
          { id:"g7pct-e03", tier:"easy",   prompt:"Increase ₹500 by 10%",                       options:["₹550","₹510","₹450","₹600"],        answer:"₹550",  hint:"Multiply by 1.10.", explanation:"500×1.10=550",                          skill:"percentage-increase", misconception:"miscalculates-multiplier" },
          { id:"g7pct-e04", tier:"easy",   prompt:"Decrease ₹90 by 10%",                        options:["₹81","₹80","₹9","₹99"],             answer:"₹81",   hint:"Multiply by 0.90.", explanation:"90×0.90=81",                            skill:"percentage-decrease", misconception:"miscalculates-multiplier" },
          { id:"g7pct-e05", tier:"easy",   prompt:"What multiplier increases a value by 35%?",  options:["1.35","0.35","3.5","1.035"],        answer:"1.35",  hint:"100%+35% = 135% = ?", explanation:"135/100=1.35",                          skill:"find-multiplier", misconception:"forgets-to-add-100-percent" },
          { id:"g7pct-e06", tier:"easy",   prompt:"What multiplier decreases a value by 40%?",  options:["0.60","0.40","1.40","0.4"],         answer:"0.60",  hint:"100%-40% = 60% = ?", explanation:"60/100=0.60",                           skill:"find-multiplier", misconception:"uses-the-decrease-percent-directly" },
          { id:"g7pct-e07", tier:"easy",   prompt:"Increase ₹40 by 50%",                        options:["₹60","₹20","₹90","₹80"],            answer:"₹60",   hint:"Multiply by 1.5.", explanation:"40×1.5=60",                             skill:"percentage-increase", misconception:"finds-50-percent-only" },
          { id:"g7pct-e08", tier:"easy",   prompt:"Decrease ₹200 by 5%",                        options:["₹190","₹195","₹10","₹205"],         answer:"₹190",  hint:"Multiply by 0.95.", explanation:"200×0.95=190",                          skill:"percentage-decrease", misconception:"arithmetic-slip" },
          { id:"g7pct-m01", tier:"medium", prompt:"A jacket is ₹850 after a 15% discount. What was the original price? (round to nearest ₹)", options:["₹1000","₹978","₹977","₹722"], answer:"₹1000", hint:"₹850 = 85% of original. Divide by 0.85.", explanation:"850÷0.85=1000", skill:"reverse-percentage", misconception:"adds-percent-back-onto-final-price" },
          { id:"g7pct-m02", tier:"medium", prompt:"After a 20% pay rise, someone earns ₹36,000/month. What was their pay before?", options:["₹30,000","₹28,800","₹43,200","₹34,000"], answer:"₹30,000", hint:"₹36,000 = 120% of original. Divide by 1.20.", explanation:"36000÷1.20=30000", skill:"reverse-percentage", misconception:"subtracts-percent-from-final-value" },
          { id:"g7pct-m03", tier:"medium", prompt:"₹300 increases to ₹360. What is the percentage increase?", options:["20%","25%","60%","16.7%"], answer:"20%", hint:"Increase=60. 60/300 ×100.", explanation:"(360-300)/300×100=20%", skill:"find-percent-change", misconception:"divides-by-new-value-instead-of-original" },
          { id:"g7pct-h01", tier:"hard",  prompt:"A price rises 10% then falls 10%. Compared to the original, the final price is:", options:["Lower than original","Same as original","Higher than original","Cannot tell"], answer:"Lower than original", hint:"Try ₹100: ×1.10=110, then ×0.90=99.", explanation:"100→110→99. The 10% fall is calculated on a bigger number, so it removes more than the rise added — final is ₹99, lower than ₹100", skill:"successive-percentage-change", misconception:"assumes-increase-decrease-cancel-out" },
          { id:"g7pct-h02", tier:"hard",  prompt:"A shop marks up cost price by 40%, then offers 25% off the marked price. If cost price is ₹200, what's the final selling price?", options:["₹210","₹200","₹190","₹220"], answer:"₹210", hint:"200×1.40=280 (marked price). Then 280×0.75.", explanation:"200×1.40=280. 280×0.75=210", skill:"successive-percentage-change", misconception:"applies-percentages-to-original-instead-of-running-total" },
          { id:"g7pct-h03", tier:"hard",  prompt:"After a 12% discount, a bag costs ₹2,024. What was the original price?", options:["₹2,300","₹2,267","₹2,267.68","₹2,500"], answer:"₹2,300", hint:"₹2024 = 88% of original. Divide by 0.88.", explanation:"2024÷0.88=2300", skill:"reverse-percentage", misconception:"adds-percent-back-onto-final-price" }
        ],
        challenge: { prompt:"A laptop's price increased by 25% to ₹62,500. Due to a sale, it then decreased by 20% from that new price. What is the final price?", options:["₹50,000","₹46,875","₹62,500","₹53,125"], answer:"₹50,000", explanation:"Original: 62500÷1.25=50000. After 20% sale off ₹62,500: 62500×0.80=50000. Final price: ₹50,000 (same as original — coincidence of these specific numbers).", coach:"Work one step at a time — first find the original, or apply each percentage change in sequence to the correct starting value." }
      }]
    }
  ]
};

export const bankKeyForTopic = {
  algebra:"algebra", fractions:"fractions", ratio:"ratio", patterns:"patterns",
  graphs:"graphs", measurement:"measurement", probability:"probability",
  rounding:"rounding", integers:"integers", functions:"functions", "surface-area":"surfaceArea",
  "g7-integer-ops":"g7-integer-ops", "g7-factors-indices":"g7-factors-indices",
  "g7-rational-irrational":"g7-rational-irrational", "g7-percentage":"g7-percentage"
};

// Returns only the topics belonging to a given grade (6 or 7).
// Used by the dashboard/topics/parent views to show one grade at a time.
export function topicsForGrade(grade) {
  return curriculum.topics.filter(t => t.grade === grade);
}

// Groups a grade's topics by term: { 1: [...], 2: [...], 3: [...] }.
// Topics without a term field (e.g. Grade 6, which has no term concept)
// are omitted from the result — callers should fall back to a flat list.
export function topicsByTerm(grade) {
  const topics = topicsForGrade(grade);
  const groups = {};
  topics.forEach(t => {
    if (!t.term) return;
    if (!groups[t.term]) groups[t.term] = [];
    groups[t.term].push(t);
  });
  return groups;
}
