/** @jsx jsx */
import Img from 'gatsby-image';
import { jsx } from 'theme-ui';
import { FaExternalLinkAlt as ExternalLinkIcon } from 'react-icons/fa';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import config from '../lib/config';
import itunesIcon from '../images/apple.svg';
import spotifyImage from '../images/spotify.png';
import googleImage from '../images/google.svg';
import Link from './link';

const PodcastProvider = styled(Link)(
  css({
    mb: 5,
    display: 'flex',
    alignItems: 'center',
    img: { m: 0, mr: 3 },
  }),
);

const Aside = props => {
  return (
    <aside className="sidebar">
      <div
        sx={{
          mb: 2,
          pr: [10, 0],
          a: { color: 'text', textDecoration: 'none' },
        }}
      >
        {config.spotifyUrl && (
          <PodcastProvider to={config.spotifyUrl}>
            <img src={spotifyImage} alt="Spotify logo" width="90" />
          </PodcastProvider>
        )}
        {config.applePodcastsUrl && (
          <PodcastProvider to={config.applePodcastsUrl}>
            <img src={itunesIcon} alt="Apple Podcasts" />
          </PodcastProvider>
        )}
        {config.googlePodcastsUrl && (
          <PodcastProvider to={config.googlePodcastsUrl}>
            <img src={googleImage} alt="Google Podcasts" />
          </PodcastProvider>
        )}
      </div>
    </aside>
  );
};

export default Aside;
