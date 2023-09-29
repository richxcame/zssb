import { Select } from 'antd';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const LanguageSelect: FC = () => {
	const { i18n } = useTranslation();

	const onSelectLang = (value: string) => {
		localStorage.setItem('I18N_LANGUAGE', value);
		i18n.changeLanguage(value);
	};

	return (
		<Select bordered={false} defaultValue={i18n.language} onChange={onSelectLang}>
			<Option value='tk'>TK</Option>
			{/* <Option value='en'>EN</Option> */}
			<Option value='ru'>RU</Option>
		</Select>
	);
};

export default LanguageSelect;
