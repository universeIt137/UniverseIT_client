import { Helmet } from "react-helmet-async";
import SuccessStories from "../../../components/clientSide/SuccessStories/SuccessStories";

const SuccessStoryPage = () => {
    window.scrollTo(0, 0);
    return (
        <div>
            <Helmet>
                <title>Universe IT | video Gallary</title>
            </Helmet>
            <SuccessStories />
        </div>
    );
};

export default SuccessStoryPage;