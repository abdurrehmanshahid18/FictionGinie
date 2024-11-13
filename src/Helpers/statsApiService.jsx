import axios from 'axios';
import config from './config.json'; // Adjust the path as necessary

// Function to update or insert book reading stats
export const updateOrInsertBookStats = (userId, profileId, bookId, lastPageRead) => {
    const apiEndpoint = `${config['statsUrl']}updateOrInsertBook/`;

    const data = {
        userId: userId,
        profileId: profileId,
        bookId: bookId,
        lastPageRead: lastPageRead
    };

    axios.put(apiEndpoint, data)
        .then(response => {

            console.log('Update or Insert Book Stats Success:', response.data);
            // Additional success logic here, if needed
        })
        .catch(error => {
            console.error('Update or Insert Book Stats Error:', error);
            // Additional error handling here, if needed
        });
};


// Function to update or insert book Languages reading stats
export const updateOrInsertBookLanguageStats = (userId, profileId, bookId, lastPageRead, language) => {
    const apiEndpoint = `${config['statsUrl']}updateOrInsertLanguageRead/`;

    const data = {
        userId: userId,
        profileId: profileId,
        bookId: bookId,
        lastPageRead: lastPageRead,
        language: language
    };

    axios.put(apiEndpoint, data)
        .then(response => {
            console.log('Update or Insert Book Language Read Stats Success: ', response.data);
            // Additional success logic here, if needed
        })
        .catch(error => {
            console.error('Update or Insert Book Language Read Stats Error:', error);
            // Additional error handling here, if needed
        });
};

// Function to update or insert word lookup stats
export const updateOrInsertwordLookup = (userId, profileId, bookId, word, pageNo, meaning) => {
    const apiEndpoint = `${config['statsUrl']}updateOrInsertwordLookup/`;
    if (meaning == null || meaning == "") {
        meaning = "not found";
    }
    const data = {
        userId: userId,
        profileId: profileId,
        bookId: bookId,
        word: word,
        pageNo: pageNo,
        meaning: meaning
    };

    axios.put(apiEndpoint, data)
        .then(response => {
            console.log('Update or Insert Word Lookup Stats Success: ', response.data);
            // Additional success logic here, if needed
        })
        .catch(error => {
            console.error('Update or Insert Word Lookup Read Stats Error:', error);
            // Additional error handling here, if needed
        });
};

// Function to update or insert translation lookup stats
export const updateOrInsertBookTranslationChecked = (userId, profileId, bookId, pageNo, language, sentence, translation) => {
    const apiEndpoint = `${config['statsUrl']}updateOrInsertBookTranslationChecked/`;
    if (translation == null || translation == "") {
        translation = "not found";
    }
    const data = {
        userId: userId,
        profileId: profileId,
        bookId: bookId,
        pageNo: pageNo,
        language: language,
        sentence: sentence,
        translation: translation,
    };

    console.log("Data in stats apis file: ", data)

    axios.put(apiEndpoint, data)
        .then(response => {
            console.log('Update or Insert translation Lookup Stats Success: ', response.data);
            // Additional success logic here, if needed
        })
        .catch(error => {
            console.error('Update or Insert translation Lookup Read Stats Error:', error);
            // Additional error handling here, if needed
        });
};
