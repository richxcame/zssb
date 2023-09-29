import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { FC } from 'react';

type TProps = {
	onChange: (v: any) => any;
	defaultValue?: string;
};

const Editor: FC<TProps> = ({ onChange, defaultValue }) => (
	<div>
		<CKEditor
			data={defaultValue}
			editor={ClassicEditor}
			onChange={(_: any, editor: any) => {
				const data = editor.getData();
				onChange(data);
			}}
		/>
	</div>
);

Editor.defaultProps = {
	defaultValue: '',
};

export default Editor;
