import { ChevronLeftIcon, XIcon } from '@heroicons/react/solid'
import PlayAnimation from './PlayAnimation'

import React, { useState, useRef, useEffect } from 'react'
import { findDOMNode } from 'react-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ReactPlayer from 'react-player'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeMute from '@material-ui/icons/VolumeOff'
import FullScreen from '@material-ui/icons/Fullscreen'
import Popover from '@material-ui/core/Popover'
import screenful from 'screenfull'
import Controls from './Controls'
import { auth, db } from '../../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    maxWidth: '1050px',
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',

    // "&:hover": {
    //   "& $controlsWrapper": {
    //     visibility: "visible",
    //   },
    // },
  },

  controlsWrapper: {
    visibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topControls: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
  },
  middleControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomWrapper: {
    display: 'flex',
    flexDirection: 'column',

    // background: "rgba(0,0,0,0.6)",
    // height: 60,
    padding: theme.spacing(2),
  },

  bottomControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height:40,
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: '#777',

    fontSize: 50,
    transform: 'scale(0.9)',
    '&:hover': {
      color: '#fff',
      transform: 'scale(1)',
    },
  },

  bottomIcons: {
    color: '#999',
    '&:hover': {
      color: '#fff',
    },
  },

  volumeSlider: {
    width: 100,
  },
}))

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`
  }
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = date.getUTCSeconds().toString().padStart(2, '0')
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
  }
  return `${mm}:${ss}`
}

let count = 0

function Video({
  id,
  videoSrc,
  courseTitle,
  videoTitle,
  videoDescription,
  thumbnailImg,
  showNotes,
  setShowNotes,
}) {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const classes = useStyles()
  const [showControls, setShowControls] = useState(false)
  // const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState('normal')
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  })

  const playerRef = useRef(null)
  const playerContainerRef = useRef(null)
  const controlsRef = useRef(null)
  const canvasRef = useRef(null)
  const {
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = state

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing })
  }

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
  }

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
  }

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = 'hidden'
      count = 0
    }
    if (controlsRef.current.style.visibility == 'visible') {
      count += 1
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState })
    }
  }

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue })
    setState({ ...state, played: parseFloat(newValue / 100) })
  }

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true })
  }

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target })
    setState({ ...state, seeking: false })
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, 'fraction')
  }

  const handleDuration = (duration) => {
    setState({ ...state, duration })
  }

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) })
  }
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    })
  }

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current)
  }

  const handleMouseMove = () => {
    console.log('mousemove')
    controlsRef.current.style.visibility = 'visible'
    count = 0
  }

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = 'hidden'
    count = 0
  }

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(timeDisplayFormat == 'normal' ? 'remaining' : 'normal')
  }

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate })
  }

  const handleMute = () => {
    setState({ ...state, muted: !state.muted })
  }

  const [bookmarksSnapshot] = useCollection(
    db.collection('customers').doc(user?.uid).collection('continuewatching')
  )

  const addBookmark = () => {
    const canvas = canvasRef.current
    canvas.width = 160
    canvas.height = 90
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height
    )
    const dataUri = canvas.toDataURL()
    canvas.width = 0
    canvas.height = 0
    db.collection('customers')
      .doc(user?.uid)
      .collection('continuewatching')
      .add({
        time: playerRef.current.getCurrentTime(),
        display: format(playerRef.current.getCurrentTime()),
        image: dataUri,
        categoryId: router.query.categoryId,
        resultId: router.query.resultId,
        title: router.query.title,
        thumbnailImg: thumbnailImg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        videoId: id,
      })
  }

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : '00:00'

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00'
  const elapsedTime =
    timeDisplayFormat == 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`

  const totalDuration = format(duration)

  console.log(videoSrc)

  return (
    <>
      <>
        <div>
          {/* <Container> */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={hanldeMouseLeave}
            ref={playerContainerRef}
            className={classes.playerWrapper}
          >
            <ReactPlayer
              ref={playerRef}
              width="100%"
              height="100%"
              url={videoSrc}
              pip={true}
              playing={playing}
              controls={false}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onProgress={handleProgress}
              onContextMenu={(e) => e.preventDefault()}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
            />

            <img
              src="/images/watermark.png"
              alt=""
              className="h-28 absolute bottom-0"
            />

            <img
              src="/images/logo.png"
              alt=""
              className="h-28 absolute bottom-0 -right-12"
            />

            <Controls
              ref={controlsRef}
              onSeek={handleSeekChange}
              onSeekMouseDown={handleSeekMouseDown}
              onSeekMouseUp={handleSeekMouseUp}
              onDuration={handleDuration}
              onRewind={handleRewind}
              onPlayPause={handlePlayPause}
              onFastForward={handleFastForward}
              playing={playing}
              played={played}
              elapsedTime={elapsedTime}
              totalDuration={totalDuration}
              onMute={handleMute}
              muted={muted}
              onVolumeChange={handleVolumeChange}
              onVolumeSeekDown={handleVolumeSeekDown}
              onChangeDispayFormat={handleDisplayFormat}
              playbackRate={playbackRate}
              onPlaybackRateChange={handlePlaybackRate}
              onToggleFullScreen={toggleFullScreen}
              volume={volume}
              onBookmark={addBookmark}
              setShowNotes={setShowNotes}
              videoTitle={videoTitle}
            />
          </div>

          <Grid container style={{ marginTop: 20 }} spacing={3}>
            {/* {bookmarks.map((bookmark, index) => (
                <Grid key={index} item>
                  <Paper
                    onClick={() => {
                      playerRef.current.seekTo(bookmark.time);
                      controlsRef.current.style.visibility = "visible";

                      setTimeout(() => {
                        controlsRef.current.style.visibility = "hidden";
                      }, 1000);
                    }}
                    elevation={3}
                  >
                    <img crossOrigin="anonymous" src={bookmark.image} />
                    <Typography variant="body2" align="center">
                      bookmark at {bookmark.display}
                    </Typography>
                  </Paper>
                </Grid>
              ))} */}
          </Grid>
          {/* <canvas ref={canvasRef} /> */}
          {/* </Container> */}
        </div>
      </>
      {/* </div> */}
    </>
  )
}

export default Video
