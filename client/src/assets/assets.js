import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import puppy from './puppy.avif'



export const assets = {
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
  puppy

}

export const stepsData = [
  {
    title: 'Describe Your Vision',
    description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
    icon: step_icon_1,
  },
  {
    title: 'See the Magic',
    description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
    icon: step_icon_2,
  },
  {
    title: 'Download & Share',
    description: 'Instantly download your creation or share it with the world directly from our platform.',
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: "/ironman.jpg",
    name: 'Tony Stark',
    role: 'Vibe Coder',
    stars: 5,
    text: `This text-to-image generator is absolutely mind-blowing! I just type what I imagine, and it creates stunning visuals instantly. It has made my projects so much more creative.`
  },
  {
    image: "wanda.webp",
    name: 'Wanda',
    role: 'Content Creator',
    stars: 4,
    text: `As a content creator, this tool is a game-changer. It saves me hours of searching for stock images. Now I can generate unique artwork tailored to my ideas within seconds.`
  },
  {
    image: "/captain.avif",
    name: 'Steve Rogers',
    role: 'Avengers Lead',
    stars: 5,
    text: `I have tried many AI tools, but this text-to-image generator stands out. The quality of images is fantastic, and it gives me endless inspiration for my design work.`
  },
]

export const plans = [
  {
    id: 'Basic',
    price: 150,
    credits: 100,
    desc: 'Best for personal use.'
  },
  {
    id: 'Advanced',
    price: 750,
    credits: 500,
    desc: 'Best for business use.'
  },
  {
    id: 'Business',
    price: 4500,
    credits: 5000,
    desc: 'Best for enterprise use.'
  },
]