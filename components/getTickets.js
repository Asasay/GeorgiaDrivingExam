import {tickets} from '../assets/tickets.js';
import descriptions from '../assets/descriptions.json';
import ticketsByCat from '../assets/ticketsByCat.json';
import categories from '../assets/categories.json';

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

export const getTickets = (cat, amount) => {
  const catId = categories.find(e => e.categoryName === cat).id;

  const validExamTicketIds = ticketsByCat[catId].map(o => o.examTicketId);

  const examTicketIds =
    amount === 'all'
      ? validExamTicketIds
      : randomExamTicketsIds(validExamTicketIds, amount);

  let filteredTickets = tickets.filter(t =>
    examTicketIds.includes(t.examTicketId),
  );

  filteredTickets.forEach(t => {
    t.description = descriptions.find(
      e => e.examTicketId === t.examTicketId,
    )?.description;
    t.num = ticketsByCat[catId].find(e => e.examTicketId === t.examTicketId).id;
  });
  amount === 'all'
    ? filteredTickets.sort((a, b) => a.num - b.num)
    : shuffle(filteredTickets);
  return filteredTickets;
};
