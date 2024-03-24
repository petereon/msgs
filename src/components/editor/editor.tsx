import React, { useState, useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import './editor.scss';

const Editor: React.FC = () => {

    const [value, setValue] = useState("console.log('hello world!');");

    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            const editorElement = editorRef.current;
            const editor = monaco.editor.create(editorElement, {
                value,
                language: 'javascript',
                theme: 'vs-dark',
                automaticLayout: false,

            });

            window.addEventListener('resize', () => {
                // make editor as small as possible
                editor.layout({ width: 0, height: 0 })

                // wait for next frame to ensure last layout finished
                window.requestAnimationFrame(() => {
                    // get the parent dimensions and re-layout the editor
                    const rect = editorContainerRef.current?.getBoundingClientRect()
                    if (rect) {
                        editor.layout({ width: rect.width, height: rect.height })
                    }

                })
            })

            editor.onDidChangeModelContent(() => {
                setValue(editor.getValue());
            });

            return () => {
                editor.dispose();
            };
        }
    }, []);

    return (
        <div ref={editorContainerRef} className='editor'>
            <div ref={editorRef} className='editor__container'></div>
        </div>
    );
};

export default Editor;
