const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');


const intros = [
    "Wow!", "Amazing!", "Incredible!", "Fantastic!", "Awesome!",
    "Bravo!", "Congratulations!", "Excellent work!", "Well done!",
    "You've done it again!", "This is outstanding!", "Remarkable!",
    "Way to go!", "You're on fire!", "This is gold!"
];

const subjects = [
    "Your", "The team's", "This", "That", "Such"
];

const adjectives = [
    "amazing", "fantastic", "incredible", "outstanding", "superb",
    "excellent", "brilliant", "stellar", "phenomenal", "impressive",
    "extraordinary", "remarkable", "exceptional", "top-notch", "first-rate",
    "unparalleled", "unmatched", "exemplary", "praiseworthy", "commendable"
];

const nouns = [
    "work", "effort", "dedication", "commitment", "achievement",
    "progress", "innovation", "collaboration", "execution", "delivery",
    "performance", "contribution", "accomplishment", "success", "breakthrough",
    "improvement", "creativity", "problem-solving", "teamwork", "leadership"
];

const impacts = [
    "is making a real difference",
    "is pushing us forward",
    "is setting a new standard",
    "is inspiring everyone",
    "is driving our success",
    "is breaking new ground",
    "is exceeding all expectations",
    "is paving the way for greatness",
    "is transforming our approach",
    "is revolutionizing our process"
];

const encouragements = [
    "Keep up the great work!",
    "You should be incredibly proud!",
    "You're setting a fantastic example!",
    "Your contribution is invaluable!",
    "You're absolutely crushing it!",
    "You're a key part of our success!",
    "Your skills are truly shining through!",
    "We're lucky to have you on the team!",
    "You're making us all look good!",
    "This is why you're the best!",
    "You make it look easy!",
    "You're raising the bar for all of us!",
    "We couldn't have done it without you!",
    "Your hard work is really paying off!",
    "You're knocking it out of the park!"
];

const futures = [
    "The sky's the limit from here!",
    "I can't wait to see what you do next!",
    "You're destined for great things!",
    "The future looks bright with you on board!",
    "You're paving the way for amazing things!",
    "We're excited for what's to come!",
    "You're laying the groundwork for incredible success!",
    "Your potential is truly limitless!",
    "You're setting us up for an amazing future!",
    "Great things are on the horizon because of you!"
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const fetchQuote = async () => {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        return response.data.content;
    } catch (error) {
        core.warning('Could not fetch quote');
        return null;
    }
};

const fetchJoke = async () => {
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist');
        return response.data.joke || `${response.data.setup} - ${response.data.delivery}`;
    } catch (error) {
        core.warning('Could not fetch joke');
        return null;
    }
};

const generatePhrase = async () => {
    const intro = getRandomElement(intros);
    const subject = getRandomElement(subjects);
    const adjective = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);
    const impact = getRandomElement(impacts);
    const encouragement = getRandomElement(encouragements);
    const future = getRandomElement(futures);

    let phrase = `${intro} ${subject} ${adjective} ${noun} ${impact}. ${encouragement} ${future}`;

    const quote = await fetchQuote();
    const joke = await fetchJoke();

    return { phrase, quote, joke };
};

try {
    generatePhrase().then(({ phrase, quote, joke }) => {
        core.setOutput("phrase", `${phrase}`);
        core.setOutput("quote", `${quote}`);
        core.setOutput("joke", `${joke}`);
        // const payload = JSON.stringify(github.context.payload, undefined, 2);
        // console.log(`The event payload: ${payload}`);
    });
} catch (error) {
    core.setFailed(error.message);
}