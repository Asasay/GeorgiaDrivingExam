function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function randomExamTicketsIds(categorisedTickets, amount) {
  const result = [];
  const randomNs = [];
  while (randomNs.length < amount) {
    let r = Math.floor(Math.random() * categorisedTickets.length);
    if (randomNs.indexOf(r) === -1) {
      randomNs.push(r);
    }
  }
  for (let i = 0; i < amount; i++) {
    result.push(categorisedTickets[randomNs[i]]);
  }
  return result;
}

const categoriesLookup = [
  'A, A1',
  'B, B1',
  'C1',
  'TS',
  'C',
  'D1',
  'D',
  'Трамвай',
  'Военная',
  'AM',
];

export const getTickets = (catName, setTickets) => {
  let cat = categoriesLookup.indexOf(catName);
  setTickets([]);
  let start = Date.now();
  global.db.transaction(async function (txn) {
    await txn.executeSql(
      `SELECT 
      question, 
      answer0, 
      answer1,
      answer2,
      answer3,
      rightAnswer,
      img,
      id,
      description
      FROM (
        SELECT *
          FROM tickets T
               JOIN
               ticketsIdsByCat C ON T.examTicketId = C.examTicketId AND C.catId = ?
               LEFT JOIN
               descriptions D ON T.examTicketId = D.examTicketId
    ) ORDER BY id`,
      [cat],
      (tx, results) => {
        let timeTaken = Date.now() - start;
        console.log('Total time taken : ' + timeTaken + ' milliseconds');
        let tickets = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          row.answers = [
            row.answer0,
            row.answer1,
            row.answer2,
            row.answer3,
          ].filter(Boolean);
          delete row.answer0;
          delete row.answer1;
          delete row.answer2;
          delete row.answer3;
          tickets.push(row);
        }
        setTickets(tickets);
        console.log('Query completed');
      },
    );
  });
};

export const getRandomTickets = (tickets, amount) => {
  return shuffle(randomExamTicketsIds(tickets, amount));
};
