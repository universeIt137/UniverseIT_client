import React from 'react';

const HeaderText = ({ className, title }) => {
    return (
        <>
            <p className={className}>{ title }</p>
        </>
    );
};

export default HeaderText;