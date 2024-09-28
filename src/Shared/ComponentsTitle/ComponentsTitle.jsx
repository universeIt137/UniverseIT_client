/* eslint-disable react/prop-types */

const ComponentsTitle = ({title, description}) => {
    return (
        <div className="space-y-5 px-5 sm:px-20 text-center mb-3">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-text_color">{title}</h2>
            <p className="font-medium text-text_color">{description}</p>
        </div>
    );
}; 

export default ComponentsTitle;