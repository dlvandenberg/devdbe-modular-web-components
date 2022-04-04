import React from 'react';

import('vanilla/component');
import('angular/web-components');

const App = () => (
    <div>
        <h1>React Shell</h1>
        <h2>Remote Components:</h2>
        <counter-writer/>
        <hr/>
        <counter-reader/>
        <hr/>
        <wc-reader/>
    </div>
);

export default App;