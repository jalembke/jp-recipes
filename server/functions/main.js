import cors from 'cors';
import functions from 'firebase-functions';

// Allow CORS
const corsHandler = cors({ origin: true });

const common_handler = (req, res, handler) => {
    if (req.method === 'PUT') {
        res.status(403).send('Forbidden');
        return;
    }
    corsHandler(req, res, () => {
        handler
            .then((response) => {
                if(response.errorCode) {
                    res.status(response.errorCode).send(response.errorMessage)
                } else {
                    res.status(200).send(response);
                }
            })
            .catch((error) => res.status(500).send(error.toString()));
    });
}

// Get Recipe
export const recipe = functions.https.onRequest((req, res) => {

});