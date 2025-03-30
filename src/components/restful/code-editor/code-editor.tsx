'use client';

import { langs } from '@uiw/codemirror-extensions-langs';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';

export function CodeEditor({
  readOnly,
  value,
  height = '200px',
  onChangeAction,
  onBlurAction,
  mode = 'json',
}: {
  readOnly: boolean;
  value?: string;
  height?: string;
  onChangeAction?: (value: string) => void;
  onBlurAction?: () => void;
  mode?: 'json' | 'text';
}) {
  return (
    <CodeMirror
      onBlur={onBlurAction}
      extensions={mode === 'json' ? [langs.json(), githubLight] : [githubLight]}
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
