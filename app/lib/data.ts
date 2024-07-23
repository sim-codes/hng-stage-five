import { Option } from '@/app/lib/definitions';

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