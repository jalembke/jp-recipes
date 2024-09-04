import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="recipe/:id" element={<RecipePage />} />
            </Routes>
        </Router>
    );
}

export default App;