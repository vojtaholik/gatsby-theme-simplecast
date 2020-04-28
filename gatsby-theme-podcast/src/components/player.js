/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause } from 'react-icons/fa';
import { jsx, Container } from 'theme-ui';
import { keyframes } from '@emotion/core';

import formatTime from '../lib/formatTime';

export default class Player extends React.Component {
  static propTypes = {
    episode: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    let lastPlayed = 0;
    let lastVolumePref = 1;

    // for Server Side Rendering
    if (typeof window !== 'undefined') {
      const { episode } = this.props;
      const lp = localStorage.getItem(`lastPlayed${episode.num}`);
      const lastVolume = localStorage.getItem(`lastVolumeSetting`);
      if (lp) lastPlayed = JSON.parse(lp).lastPlayed;
      if (lastVolume) lastVolumePref = JSON.parse(lastVolume).lastVolumePref;
    }

    this.state = {
      progressTime: 50,
      playing: false,
      duration: 0,
      currentTime: lastPlayed,
      currentVolume: lastVolumePref,
      timeWasLoaded: lastPlayed !== 0,
      showTooltip: false,
      tooltipPosition: 0,
      tooltipTime: '0:00',
    };
  }

  componentDidUpdate(prevProps) {
    const { episode, isPlaying } = this.props;
    const { currentTime, currentVolume } = this.state;
    if (episode.num !== prevProps.episode.num) {
      const lp = localStorage.getItem(`lastPlayed${episode.num}`);
      if (lp) {
        const lastVolume = localStorage.getItem(`lastVolumeSetting`);
        const data = JSON.parse(lp);
        const data2 = JSON.parse(lastVolume);

        this.setState({
          currentTime: data.lastPlayed,
          currentVolume: data2.lastVolumePref,
        });
        this.audio.currentTime = data.lastPlayed;
        this.audio.volume = data2.lastVolumePref;
      }
    } else {
      localStorage.setItem(
        `lastPlayed${episode.num}`,
        JSON.stringify({ lastPlayed: currentTime }),
      );
      localStorage.setItem(
        `lastVolumeSetting`,
        JSON.stringify({ lastVolumePref: currentVolume }),
      );
    }
    if (isPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  timeUpdate = e => {
    const { episode } = this.props;
    const { timeWasLoaded } = this.state;
    // Check if the user already had a curent time
    if (timeWasLoaded) {
      const lp = localStorage.getItem(`lastPlayed${episode.num}`);

      if (lp) {
        e.currentTarget.currentTime = JSON.parse(lp).lastPlayed;
      }
      this.setState({ timeWasLoaded: false });
    } else {
      const { currentTime = 0, duration = 0 } = e.currentTarget;

      const progressTime = (currentTime / duration) * 100;
      if (Number.isNaN(progressTime)) return;
      this.setState({ progressTime, currentTime, duration });
    }
  };

  volumeUpdate = e => {
    const { timeWasLoaded } = this.state;
    // Check if the user already had a curent volume
    if (timeWasLoaded) {
      const lastVolume = localStorage.getItem(`lastVolumeSetting`);
      if (lastVolume) {
        e.currentTarget.volume = JSON.parse(lastVolume).lastVolumePref;
      }
      this.setState({ timeWasLoaded: false });
    }
  };

  groupUpdates = e => {
    this.timeUpdate(e);
    this.volumeUpdate(e);
  };

  togglePlay = () => {
    const { playing } = this.state;
    const method = playing ? 'pause' : 'play';
    this.audio[method]();
    const { setIsPlaying } = this.props;
    setIsPlaying(!playing);
  };

  scrubTime = eventData =>
    (eventData.nativeEvent.offsetX / this.progress.offsetWidth) *
    this.audio.duration;

  scrub = e => {
    this.audio.currentTime = this.scrubTime(e);
  };

  seekTime = e => {
    this.setState({
      tooltipPosition: e.nativeEvent.offsetX,
      tooltipTime: formatTime(this.scrubTime(e)),
    });
  };

  playPause = () => {
    this.setState({ playing: !this.audio.paused });
    const method = this.audio.paused ? 'add' : 'remove';
    document.querySelector('.bars').classList[method]('bars--paused'); // 💩
  };

  volume = e => {
    this.audio.volume = e.currentTarget.value;
    this.setState({
      currentVolume: `${e.currentTarget.value}`,
    });
  };

  speedUp = () => {
    this.speed(0.25);
  };

  speedDown = e => {
    e.preventDefault();
    this.speed(-0.25);
  };

  render() {
    const { episode } = this.props;
    const {
      playing,
      progressTime,
      currentTime,
      duration,
      showTooltip,
      tooltipPosition,
      tooltipTime,
    } = this.state;

    const bounce = keyframes`
      from {
        transform: translateX(0)
      }
      to {
        transform: translateX(-200px)
      }
    `;

    return (
      <div
        sx={{
          zIndex: 10,
          position: 'fixed',
          width: '100%',
          color: 'text',
          borderTop: '2px solid',
          borderColor: 'backgroundLighten10',
          backgroundColor: 'background',
          height: ['auto', 60],
          bottom: 0,
          left: 0,
          display: 'flex',

          alignItems: 'center',
        }}
        className="player"
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            pb: [2, 'inherit'],
            pt: [0, 'inherit'],
            maxWidth: '1200px',
            padding: '16px',
          }}
        >
          <div
            sx={{
              width: '100%',
              maxWidth: ['100%', 310],
              display: 'flex',
              alignItems: 'center',
              '*': {
                m: 0,
              },
            }}
          >
            <button
              tabIndex="0"
              sx={{
                backgroundImage:
                  'linear-gradient(224deg, #B298FF 0%, #7A5EFF 100%)',
                color: 'text',
                border: 'none',
                width: '100%',
                maxWidth: 40,
                height: 40,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 1,
                cursor: 'pointer',
                svg: {
                  mt: '1px',
                  ml: playing ? '0' : '2px',
                },
              }}
              onClick={this.togglePlay}
              aria-label={playing ? 'pause' : `play ${episode.title}`}
              type="button"
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <div
              sx={{
                ml: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: ['flex-start', 'flex-end'],
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                height: 60,
                '.fade-out': {
                  display: ['none', 'block'],
                  position: 'absolute',
                  zIndex: 999,
                  width: 40,
                  height: 60,
                  backgroundImage:
                    'linear-gradient(270deg, #1A2232 20%, rgba(26,34,50,0) 100%)',
                },
                h3: {
                  overflow: 'hidden',
                  position: 'relative',
                  fontSize: 4,
                  display: 'block',
                },
                // ':hover': {
                //   h3: { animation: `${bounce} 5s linear infinite` },
                // },
              }}
            >
              <h3>{episode.title}</h3>
              <div className="fade-out" />
            </div>
          </div>

          <div
            sx={{
              ml: [0, 2],
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              span: {
                fontVariantNumeric: 'tabular-nums',
                width: ['auto', 50],
                fontSize: 1,
                textAlign: 'center',
                opacity: 0.6,
              },
            }}
          >
            <span>{formatTime(currentTime)}</span>
            <div
              sx={{
                mx: 2,
                height: [4, 2],
                flexGrow: '1',
                borderRadius: ['3px', '0px'],
                maxWidth: 460,
                backgroundColor: 'backgroundLighten20',
              }}
              className="progress"
              onClick={this.scrub}
              onMouseMove={this.seekTime}
              onMouseEnter={() => {
                // this.setState({ showTooltip: true });
              }}
              onMouseLeave={() => {
                // this.setState({ showTooltip: false });
              }}
              ref={x => (this.progress = x)}
            >
              {/* eslint-enable */}
              <div
                className="progress__time"
                sx={{
                  width: `${progressTime}%`,
                  backgroundImage:
                    'linear-gradient(224deg, #B298FF 0%, #7A5EFF 100%)',
                }}
              />
            </div>
            <span>{formatTime(duration)}</span>
            <div
              style={{
                position: 'absolute',
                left: `${tooltipPosition}px`,
                opacity: `${showTooltip ? '1' : '0'}`,
              }}
            >
              {tooltipTime}
            </div>
          </div>
          <audio
            ref={audio => (this.audio = audio)}
            onPlay={this.playPause}
            onPause={this.playPause}
            onTimeUpdate={this.timeUpdate}
            onVolumeChange={this.volumeUpdate}
            onLoadedMetadata={this.groupUpdates}
            src={episode.enclosureUrl}
          />
        </Container>
      </div>
    );
  }
}
