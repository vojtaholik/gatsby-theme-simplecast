// by Wes Bos, syntax.fm
// https://github.com/wesbos/Syntax/blob/master/components/Player.js
/** @jsx jsx */
import React from "react"
import PropTypes from "prop-types"
import { FaPlay, FaPause } from "react-icons/fa"
import { jsx, Container } from "theme-ui"
import { keyframes } from "@emotion/core"
import formatTime from "../lib/formatTime"
import VisuallyHidden from "@reach/visually-hidden"
// import VolumeBars from "./volumeBars"

export default class Player extends React.Component {
  static propTypes = {
    episode: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    let lastPlayed = 0
    let lastVolumePref = 1
    // let lastPlaybackRate = 1

    // for Server Side Rendering
    if (typeof window !== "undefined") {
      const { episode } = this.props
      const lp = localStorage.getItem(`lastPlayed${episode.number}`)
      const lastVolume = localStorage.getItem(`lastVolumeSetting`)
      // const lastPlayback = localStorage.getItem(`lastPlaybackSetting`)

      if (lp) lastPlayed = JSON.parse(lp).lastPlayed
      if (lastVolume) lastVolumePref = JSON.parse(lastVolume).lastVolumePref
      // if (lastPlayback)
      //   lastPlaybackRate = JSON.parse(lastPlayback).lastPlaybackRate
    }

    this.state = {
      progressTime: 50,
      playing: false,
      duration: 0,
      currentTime: lastPlayed,
      currentVolume: lastVolumePref,
      // playbackRate: lastPlaybackRate,
      timeWasLoaded: lastPlayed !== 0,
      showTooltip: false,
      tooltipPosition: 0,
      tooltipTime: "0:00",
    }
  } // END Constructor

  componentWillUpdate(nextProps, nextState) {
    // this.audio.playbackRate = nextState.playbackRate
  }

  componentDidUpdate(prevProps, prevState) {
    const { episode } = this.props
    const {
      currentTime,
      currentVolume,
      // playbackRate
    } = this.state
    if (episode.number !== prevProps.episode.number) {
      const lp = localStorage.getItem(`lastPlayed${episode.number}`)
      if (lp) {
        const lastVolume = localStorage.getItem(`lastVolumeSetting`)
        // const lastPlayback = localStorage.getItem(`lastPlaybackSetting`)
        const data = JSON.parse(lp)
        const data2 = JSON.parse(lastVolume)
        // const data3 = JSON.parse(lastPlayback)

        this.setState({
          currentTime: data.lastPlayed,
          currentVolume: data2.lastVolumePref,
          // playbackRate: data3.lastPlaybackRate,
        })
        this.audio.currentTime = data.lastPlayed
        this.audio.volume = data2.lastVolumePref
        // this.audio.playbackRate = data3.lastPlaybackRate
      }
      this.audio.play()
    } else {
      localStorage.setItem(
        `lastPlayed${episode.number}`,
        JSON.stringify({ lastPlayed: currentTime })
      )
      localStorage.setItem(
        `lastVolumeSetting`,
        JSON.stringify({ lastVolumePref: currentVolume })
      )
      // localStorage.setItem(
      //   `lastPlaybackSetting`,
      //   JSON.stringify({ lastPlaybackRate: playbackRate })
      // )
    }
  }

  timeUpdate = e => {
    // console.log('Updating Time');
    const { episode } = this.props
    const { timeWasLoaded } = this.state
    // Check if the user already had a curent time
    if (timeWasLoaded) {
      const lp = localStorage.getItem(`lastPlayed${episode.number}`)

      if (lp) {
        e.currentTarget.currentTime = JSON.parse(lp).lastPlayed
      }
      this.setState({ timeWasLoaded: false })
    } else {
      const { currentTime = 0, duration = 0 } = e.currentTarget

      const progressTime = (currentTime / duration) * 100
      if (Number.isNaN(progressTime)) return
      this.setState({ progressTime, currentTime, duration })
    }
  }

  volumeUpdate = e => {
    const { timeWasLoaded } = this.state
    // Check if the user already had a curent volume
    if (timeWasLoaded) {
      const lastVolume = localStorage.getItem(`lastVolumeSetting`)
      if (lastVolume) {
        e.currentTarget.volume = JSON.parse(lastVolume).lastVolumePref
      }
      this.setState({ timeWasLoaded: false })
    }
  }

  groupUpdates = e => {
    this.timeUpdate(e)
    this.volumeUpdate(e)
  }

  togglePlay = () => {
    const { playing } = this.state
    const method = playing ? "pause" : "play"
    this.audio[method]()
  }

  scrubTime = eventData =>
    (eventData.nativeEvent.offsetX / this.progress.offsetWidth) *
    this.audio.duration

  scrub = e => {
    this.audio.currentTime = this.scrubTime(e)
  }

  seekTime = e => {
    this.setState({
      tooltipPosition: e.nativeEvent.offsetX,
      tooltipTime: formatTime(this.scrubTime(e)),
    })
  }

  playPause = () => {
    this.setState({ playing: !this.audio.paused })
    const method = this.audio.paused ? "add" : "remove"
    document.querySelector(".bars").classList[method]("bars--paused") // 💩
  }

  volume = e => {
    this.audio.volume = e.currentTarget.value
    this.setState({
      currentVolume: `${e.currentTarget.value}`,
    })
  }

  speedUp = () => {
    this.speed(0.25)
  }

  speedDown = e => {
    e.preventDefault()
    this.speed(-0.25)
  }

  // speed = change => {
  //   const playbackRateMax = 2.5
  //   const playbackRateMin = 0.75

  //   let playbackRate = this.state.playbackRate + change

  //   if (playbackRate > playbackRateMax) {
  //     playbackRate = playbackRateMin
  //   }

  //   if (playbackRate < playbackRateMin) {
  //     playbackRate = playbackRateMax
  //   }

  //   this.setState({ playbackRate })
  // }

  render() {
    const { episode } = this.props
    const {
      playing,
      // playbackRate,
      progressTime,
      currentTime,
      duration,
      showTooltip,
      tooltipPosition,
      tooltipTime,
    } = this.state

    const bounce = keyframes`
    from {
      transform: translateX(0)
    }
  to {
    transform: translateX(-200px)
  }
  `

    return (
      <div
        sx={{
          zIndex: 10,
          position: "fixed",
          width: "100%",
          color: "text",
          borderTop: "2px solid",
          borderColor: "backgroundLighten10",
          backgroundColor: "background",
          height: ["auto", 60],
          bottom: 0,
          left: 0,
          display: "flex",

          alignItems: "center",
        }}
        className="player"
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: ["column", "row"],
            alignItems: ["flex-start", "center"],
            pb: [2, "inherit"],
            pt: [0, "inherit"],
          }}
        >
          <div
            sx={{
              width: "100%",
              maxWidth: ["100%", 310],
              display: "flex",
              alignItems: "center",
              "*": {
                m: 0,
              },
            }}
          >
            <button
              tabIndex="0"
              sx={{
                backgroundImage:
                  "linear-gradient(224deg, #B298FF 0%, #7A5EFF 100%)",
                color: "text",
                border: "none",
                width: "100%",
                maxWidth: 40,
                height: 40,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 1,
                cursor: "pointer",
                svg: {
                  mt: "1px",
                  ml: playing ? "0" : "2px",
                },
              }}
              onClick={this.togglePlay}
              aria-label={playing ? "pause" : `play ${episode.title}`}
              type="button"
            >
              <VisuallyHidden>{playing ? "Pause" : "Play"}</VisuallyHidden>{" "}
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <div
              sx={{
                ml: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: ["flex-start", "flex-end"],
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                height: 60,
                ".fade-out": {
                  display: ["none", "block"],
                  position: "absolute",
                  zIndex: 999,
                  width: 40,
                  height: 60,
                  backgroundImage:
                    "linear-gradient(270deg, #1A2232 20%, rgba(26,34,50,0) 100%)",
                },
                h3: {
                  overflow: "hidden",
                  position: "relative",
                  fontSize: 4,
                  display: "block",
                },
                ":hover": {
                  h3: { animation: `${bounce} 5s linear infinite` },
                },
              }}
            >
              <h3>
                {episode.title} - EP{episode.number}
              </h3>
              <div className="fade-out" />
            </div>
          </div>

          <div
            sx={{
              ml: [0, 2],
              width: "100%",
              display: "flex",
              alignItems: "center",
              span: {
                fontVariantNumeric: "tabular-nums",
                width: ["auto", 50],
                fontSize: 1,
                textAlign: "center",
                opacity: 0.6,
              },
            }}
          >
            <span>{formatTime(currentTime)}</span>
            <div
              sx={{
                mx: 2,
                height: [4, 2],
                flexGrow: "1",
                borderRadius: ["3px", "0px"],
                maxWidth: 460,
                backgroundColor: "backgroundLighten20",
              }}
              className="progress"
              onClick={this.scrub}
              onMouseMove={this.seekTime}
              onMouseEnter={() => {
                this.setState({ showTooltip: true })
              }}
              onMouseLeave={() => {
                this.setState({ showTooltip: false })
              }}
              ref={x => (this.progress = x)}
            >
              {/* eslint-enable */}
              <div
                className="progress__time"
                sx={{
                  width: `${progressTime}%`,
                  backgroundImage:
                    "linear-gradient(224deg, #B298FF 0%, #7A5EFF 100%)",
                }}
              />
            </div>
            <span>{formatTime(duration)}</span>
            <div
              style={{
                position: "absolute",
                left: `${tooltipPosition}px`,
                opacity: `${showTooltip ? "1" : "0"}`,
              }}
            >
              {tooltipTime}
            </div>
          </div>

          {/* <div className="player__section player__section--right">
          <button
            onClick={this.speedUp}
            onContextMenu={this.speedDown}
            className="player__speed"
            type="button"
          >
            <p>FASTNESS</p>
            <span className="player__speeddisplay">{playbackRate} &times;</span>
          </button>
        </div> */}
          {/* <div
          className="player__volume"
          style={{ display: "flex", width: "100%" }}
        >
          <p>LOUDNESS</p>
          <div className="player__inputs">
            <VolumeBars volume={this.volume} />
          </div>
        </div> */}
          <audio
            ref={audio => (this.audio = audio)}
            onPlay={this.playPause}
            onPause={this.playPause}
            onTimeUpdate={this.timeUpdate}
            onVolumeChange={this.volumeUpdate}
            onLoadedMetadata={this.groupUpdates}
            src={episode.enclosure_url}
          />
        </Container>
      </div>
    )
  }
}
