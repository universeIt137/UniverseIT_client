import { Helmet } from "react-helmet-async";
import SuccessStories from "../../../components/clientSide/SuccessStories/SuccessStories";

const SuccessStoryPage = () => {
    return (
        <div>
            <Helmet>
                <title>Universe IT | Success Story</title>
            </Helmet>
            <SuccessStories />
        </div>
    );
};

export default SuccessStoryPage;