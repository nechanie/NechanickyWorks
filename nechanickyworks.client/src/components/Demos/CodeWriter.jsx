import React, { useRef, useEffect, useState } from 'react';
import hljs from 'highlight.js';
import Typewriter from 'typewriter-effect';
import 'highlight.js/styles/night-owl.css'; // Import a stylesheet for highlight.js

function AnimatedCodeBlock({isVisible, code}) {
    const [elements, setElements] = useState(null);

    useEffect(() => {
        const highlightedCode = hljs.highlightAuto(code).value;
        setElements(highlightedCode);
    }, [code]);

    return (
        <div className="hljs">
            <pre style={{ textAlign: 'left', tabSize:4 }}>
                <code dangerouslySetInnerHTML={{ __html: elements} }/>
            </pre>
        </div>
    );
}

export default AnimatedCodeBlock;
