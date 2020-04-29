/** @jsx jsx */
import { graphql } from 'gatsby';
import React from 'react';
import { jsx } from 'theme-ui';
import { DiscussionEmbed } from 'disqus-react';

import { ContextConsumer } from '../Context';
import SEO from '../components/seo';
import Header from '../components/header';
import Aside from '../components/aside';

export const episodeQuery = graphql`
  query($id: String!) {
    episode(id: { eq: $id }) {
      id
      title
      descriptionHtml
      num
      enclosureUrl
      coverImgUrl
    }
  }
`;

const EpisodeTemplate = ({ data }) => {
  const { episode } = data;

  return (
    <>
      <SEO
        title={episode.title}
        image={episode.coverImgUrl}
        description={episode.descriptionHtml}
      />
      <div
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row'],
        }}
      >
        <div sx={{ maxWidth: ['100%', 710] }}>
          <Header episode={episode} />
          <article>
            <div
              dangerouslySetInnerHTML={{
                __html: episode.descriptionHtml,
              }}
            />
          </article>
          <ContextConsumer>
            {context => (
              <DiscussionEmbed
                shortname={context.disqusShortName}
                config={{
                  identifier: `episode-${episode.num}`,
                  title: episode.title,
                }}
              />
            )}
          </ContextConsumer>
        </div>
        <Aside />
      </div>
    </>
  );
};

export default EpisodeTemplate;
