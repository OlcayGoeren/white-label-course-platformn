import React, { Component, FC, useEffect, useState, useMemo, useCallback, memo } from 'react';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import './react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { Button } from '../ui/button';



const EditorConvertToHTML: FC<{ text: any, setText: any }> = ({ setText, text }) => {
  // text hier überführen
  const [editorState, setEditorState] = useState(EditorState.createEmpty());


  useEffect(() => {
    const blocksFromHtml = htmlToDraft(text);

    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  function onBlurEvent() {

  }

  function onEditorStateChanged() {
    setText(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className=''>
      {<Editor
        onChange={onEditorStateChanged}
        onBlur={onBlurEvent}
        editorState={editorState}
        wrapperClassName="border-2 border-gray-300 p-4"
        editorClassName="wrapper-editor"
        onEditorStateChange={onEditorStateChange}
      />}
      {/* <div className='p-4 prose-lg rounded-lg mt-3 bg-base-200 w-1/2' dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} /> */}
    </div>
  );
};

export default EditorConvertToHTML;

