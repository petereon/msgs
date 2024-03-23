import React, { useState, useCallback, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';
import './editor.scss';

const Editor: React.FC = () => {
    const [value, setValue] = useState("console.log('hello world!');");
    const [editorHeight, setEditorHeight] = useState(0);

    const editorRef = useRef<HTMLDivElement>(null);

    const onChange = useCallback((val: string) => {
        setValue(val);
    }, []);

    useEffect(() => {

        const handleResize = () => {
            if (editorRef.current) {
                const editorElement = editorRef.current;
                setEditorHeight(editorElement.clientHeight);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return (
        <div className='editor' ref={editorRef}>
            <CodeMirror
                value={value}
                height={`${editorHeight}px`}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
                theme={githubDark}

            />
        </div>
    );
};

export default Editor;
