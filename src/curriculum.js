// curriculum.js — 11 topics (7 core + 4 from Tanusree's school papers)
export const curriculum = {
  version: "2.0",
  student: { name: "Tanusree", grade: 6, nextGrade: 7, schoolStartMonth: "July" },
  topics: [
    {
      id: "algebra",
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
      id: "fractions",
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
      id: "ratio",
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
      id: "patterns",
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
      id: "graphs",
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
      id: "measurement",
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
      id: "probability",
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
      id: "rounding",
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
      id: "integers",
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
      id: "functions",
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
      id: "surface-area",
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
    }
  ]
};

export const bankKeyForTopic = {
  algebra:"algebra", fractions:"fractions", ratio:"ratio", patterns:"patterns",
  graphs:"graphs", measurement:"measurement", probability:"probability",
  rounding:"rounding", integers:"integers", functions:"functions", "surface-area":"surfaceArea"
};
