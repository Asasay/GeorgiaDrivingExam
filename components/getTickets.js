import {tickets} from '../assets/tickets.js';
import ticketsByCat from '../assets/ticketsByCat.json';
import categories from '../assets/categories.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const getAllTickets = cat => {
  const catId = categories.find(e => e.categoryName === cat).id;

  const examTicketIds = Object.keys(ticketsByCat[catId]);

  let filteredTickets = tickets.filter(t =>
    examTicketIds.includes(t.examTicketId.toString()),
  );

  filteredTickets.forEach(t => {
    t.num = ticketsByCat[catId][t.examTicketId];
  });
  filteredTickets.sort((a, b) => a.num - b.num);

  return filteredTickets;
};

export const getAmountTickets = (cat, amount) => {
  const catId = categories.find(e => e.categoryName === cat).id;

  const validExamTicketIds = Object.keys(ticketsByCat[catId]);

  const examTicketIds = randomExamTicketsIds(validExamTicketIds, amount);

  let filteredTickets = tickets.filter(t =>
    examTicketIds.includes(t.examTicketId.toString()),
  );

  filteredTickets.forEach(t => {
    t.num = ticketsByCat[catId][t.examTicketId];
  });

  shuffle(filteredTickets);

  return filteredTickets;
};

export const getFavoriteTickets = favorites => {
  let filteredTickets = tickets.filter(t => favorites.includes(t.examTicketId));

  for (let index = 0; index < filteredTickets.length; index++) {
    const ticket = filteredTickets[index];
    ticket.num = index + 1;
  }

  return filteredTickets;
};
