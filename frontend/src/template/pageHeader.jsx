import React from 'react';

export default props => (
    <header className='page-header shadow-sm p-3 mb-5 bg-white rounded'>
        <h2> { props.name } <small>{props.small}</small> </h2>
    </header>
)