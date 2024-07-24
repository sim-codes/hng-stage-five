import { Option, PreviewSectionProps } from '@/app/lib/definitions';

import GithubIcon from '@/public/icons/github.svg';
import TwitterIcon from '@/public/icons/twitter.svg';
import LinkedinIcon from '@/public/icons/linkedin.svg';
import FrontendIcon from '@/public/icons/frontendmentor.svg';
import TwitchIcon from '@/public/icons/twitch.svg';
import FacebookIcon from '@/public/icons/facebook.svg';
import YoutubeIcon from '@/public/icons/youtube.svg';
import CodewarsIcon from '@/public/icons/codewars.svg';
import DevtoIcon from '@/public/icons/devto.svg';
import GitlabIcon from '@/public/icons/gitlab.svg';
import FreecodecampIcon from '@/public/icons/freecodecamp.svg';
import CodepenIcon from '@/public/icons/codepen.svg';
import StackoverflowIcon from '@/public/icons/stackoverflow.svg';
import HashnodeIcon from '@/public/icons/hashnode.svg';

export const options: Option[] = [
    { value: 'github', label: 'Github',
        icon: GithubIcon.src,
     },
     { value: 'frontendmentor', label: 'Frontend Mentor',
        icon: FrontendIcon,
     },
    { value: 'twitter', label: 'Twitter',
        icon: TwitterIcon,
     },
    { value: 'linkedin', label: 'LinkedIn',
        icon: LinkedinIcon,
     },
    { value: 'youtube', label: 'YouTube',
        icon: YoutubeIcon,
     },
    { value: 'facebook', label: 'Facebook',
        icon: FacebookIcon,
     },
    { value: 'twitch', label: 'Twitch',
        icon: TwitchIcon,
     },
    { value: 'dev', label: 'Dev.to',
        icon: DevtoIcon,
     },
    { value: 'codewars', label: 'Codewars',
        icon: CodewarsIcon,
    },
    { value: 'codepen', label: 'CodePen',
        icon: CodepenIcon,
     },
    { value: 'freecodecamp', label: 'freeCodeCamp',
        icon: FreecodecampIcon,
    },
    { value: 'gitlab', label: 'GitLab',
        icon: GitlabIcon,
    },
    { value: 'hashnode', label: 'Hashnode',
        icon: HashnodeIcon,
     },
    { value: 'stackoverflow', label: 'Stack Overflow',
        icon: StackoverflowIcon,
    },
];

export const optionsWhite: Option[] = [
    {
        value: 'github',
        label: 'Github',
        icon: '/icons/white/github.svg',
        color: '#000',
    },
    {
        value: 'frontendmentor',
        label: 'Frontend Mentor',
        icon: '/icons/white/frontendmentor.svg',
        color: '#fff',
    },
    {
        value: 'twitter',
        label: 'Twitter',
        icon: '/icons/white/twitter.svg',
        color: '#43B7E9',
    },
    {
        value: 'linkedin',
        label: 'LinkedIn',
        icon: '/icons/white/linkedin.svg',
        color: '#2D68FF',
    },
    {
        value: 'youtube',
        label: 'YouTube',
        icon: '/icons/white/youtube.svg',
        color: '#EE3939',
    },
    {
        value: 'facebook',
        label: 'Facebook',
        icon: '/icons/white/facebook.svg',
        color: '#2442AC',
    },
    {
        value: 'twitch',
        label: 'Twitch',
        icon: '/icons/white/twitch.svg',
        color: '#EE3FC8',
    },
    {
        value: 'dev',
        label: 'Dev.to',
        icon: '/icons/white/devto.svg',
        color: '#333',
    },
    {
        value: 'codewars',
        label: 'Codewars',
        icon: '/icons/white/codewars.svg',
        color: '#8A1A50',
    },
    {
        value: 'codepen',
        label: 'CodePen',
        icon: '/icons/white/codepen.svg',
        color: '#000',
    },
    {
        value: 'freecodecamp',
        label: 'freeCodeCamp',
        icon: '/icons/white/freecodecamp.svg',
        color: '#302267',
    },
    {
        value: 'gitlab',
        label: 'GitLab',
        icon: '/icons/white/gitlab.svg',
        color: '#EB4925',
    },
    {
        value: 'hashnode',
        label: 'Hashnode',
        icon: '/icons/white/hashnode.svg',
        color: '#0330D1',
    },
    {
        value: 'stackoverflow',
        label: 'Stack Overflow',
        icon: '/icons/white/stackoverflow.svg',
        color: '#EC7100',
    },
]