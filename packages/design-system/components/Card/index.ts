import { Card } from './Card';
import { CardActions } from './CardActions';
import { CardContent } from './CardContent';
import { CardDescription } from './CardDescription';
import { CardMedia } from './CardMedia';
import { CardTitle } from './CardTitle';

const Compound = Object.assign(Card, {
	Content: CardContent,
	Actions: CardActions,
	Media: CardMedia,
	Title: CardTitle,
	Description: CardDescription,
});
export { Compound as Card };
