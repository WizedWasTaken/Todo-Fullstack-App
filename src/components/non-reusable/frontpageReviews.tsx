import { InfiniteMovingCards } from '../ui-library/infinite-moving-cards';

/**
 *
 * @returns HTML and logic for the reviews component
 */
export default function reviews() {
  return (
    <InfiniteMovingCards
      direction='right'
      speed='normal'
      pauseOnHover={false}
      items={GetReviews()}
      className='py-10 w-full overflow-hidden'
    />
  );
}

/**
 *
 * @returns an array of reviews
 */
function GetReviews() {
  return [
    {
      quote: 'Bedre en trello!',
      name: 'Joe Mama',
      title: 'CEO (Chief Executive Officer)',
    },
    {
      quote: 'Amazing app!',
      name: 'John Doe',
      title: 'Software Engineer',
    },
    {
      quote: 'Highly recommended!',
      name: 'Jane Smith',
      title: 'Product Manager',
    },
  ];
}
