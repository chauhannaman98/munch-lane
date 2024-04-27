import { Helmet } from "react-helmet-async";


const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{`${title}  ${description} - Munch Lane`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome to Munch Lane',
    description: 'We sell tasty food products handmade like home for you',
    keywords: 'food, sweets, dessert'
};

export default Meta;