// const usernames = [
//     'Mike',
//     'John',
//     'Jane',
//     'Mary',
//     'Kevin',
//     'Lisa',
//     'Sarah',
// ];

// const thoughts = [
//     'I like to code',
//     'I dont think very much',
//     'Juice is good',
//     'Potatoes are fun to throw',
//     'I like to eat',
//     'I like to drink',
//     'I like to sleep',
//     'Snow is cold'
// ];

// const reactions = [
//     '👍',
//     '👎',
//     '👌',
//     '👍',
//     '👎',
//     'I agree',
//     'I disagree',
//     'Great thought',
//     'Sad thought'
// ];

// const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

// const getRandomThought = () => thoughts[genRandomIndex(thoughts)];

// const getRandomUser = () => usernames[genRandomIndex(usernames)];

// const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// const getRandomReactions = (int) => {
//     const results = [];
//     for (let i = 0; i < int; i++) {
//         results.push({
//             text: getRandomArrItem(reactions),
//             username: getRandomUser().split(' ')[0]
//         });
//     }
//     return results;
// };

// module.exports = {
//     getRandomThought,
//     getRandomUser,
//     getRandomArrItem,
//     getRandomReactions
// };