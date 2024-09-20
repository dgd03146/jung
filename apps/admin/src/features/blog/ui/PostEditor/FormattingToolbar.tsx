import {
	BasicTextStyleButton,
	BlockTypeSelect,
	ColorStyleButton,
	CreateLinkButton,
	FileCaptionButton,
	FileReplaceButton,
	FormattingToolbar,
	NestBlockButton,
	TextAlignButton,
	UnnestBlockButton,
} from '@blocknote/react';

export const FormattingToolbarComponent = () => (
	<FormattingToolbar>
		<BlockTypeSelect />
		<FileCaptionButton />
		<FileReplaceButton />
		<BasicTextStyleButton basicTextStyle='bold' />
		<BasicTextStyleButton basicTextStyle='italic' />
		<BasicTextStyleButton basicTextStyle='underline' />
		<BasicTextStyleButton basicTextStyle='strike' />
		<BasicTextStyleButton basicTextStyle='code' />
		<TextAlignButton textAlignment='left' />
		<TextAlignButton textAlignment='center' />
		<TextAlignButton textAlignment='right' />
		<ColorStyleButton />
		<NestBlockButton />
		<UnnestBlockButton />
		<CreateLinkButton />
	</FormattingToolbar>
);
