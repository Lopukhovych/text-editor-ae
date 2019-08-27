const datamuseUrl = 'https://api.datamuse.com/';

export function getSynonyms(value) {
    return fetch(`${datamuseUrl}words?ml=${value}&max=5`)
        .then(result => {
            if (result.ok) {
                return result.json();
            } else {
                return result.text()
                    .then(data => {
                        throw new Error(data)
                    });
            }
        })
        .catch((error) => {
            console.log('getSynonyms error: ', error);
        })
}
