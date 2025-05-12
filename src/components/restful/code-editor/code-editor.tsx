'use client';

import { langs } from '@uiw/codemirror-extensions-langs';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';

import { lang } from '@/types/types';

export function CodeEditor({
  readOnly,
  value,
  height = '200px',
  onChangeAction,
  onBlurAction,
  lang = 'json',
}: {
  readOnly: boolean;
  value?: string;
  height?: string;
  onChangeAction?: (value: string) => void;
  onBlurAction?: () => void;
  lang?: lang;
}) {
  return (
    <CodeMirror
      onBlur={onBlurAction}
      extensions={
        lang !== 'text' ? [langs[lang](), githubLight] : [githubLight]
      }
      readOnly={readOnly}
      height={height}
      value={value}
      onChange={onChangeAction}
      editable={!readOnly}
      basicSetup={{
        highlightActiveLineGutter: !readOnly,
        highlightActiveLine: !readOnly,
      }}
    />
  );
}
