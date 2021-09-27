import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Replay10RoundedIcon from "@material-ui/icons/Replay10Rounded";
import Forward10RoundedIcon from "@material-ui/icons/Forward10Rounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeDownRoundedIcon from "@material-ui/icons/VolumeDownRounded";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";
import FullscreenRoundedIcon from "@material-ui/icons/FullscreenRounded";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    // background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 40,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#f9f9f9",
  },

  volumeSlider: {
    width: 100,
  },
}));

const PrettoSlider = withStyles({
  root: {},
  // thumb: {
  //   height: 24,
  //   width: 24,
  //   backgroundColor: "#fff",
  //   border: "2px solid currentColor",
  //   marginTop: -8,
  //   marginLeft: -12,
  //   "&:focus, &:hover, &$active": {
  //     boxShadow: "inherit",
  //   },
  // },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      onBookmark,
      setShowNotes,
      videoTitle,
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <div ref={ref} className={classes.controlsWrapper}>
        <Grid
          container
          direction="column"
          justify="space-between"
          style={{ flexGrow: 1 }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            style
            style={{ padding: 16 }}
          >
            {/* <Grid item>
              <Button
                onClick={() => setShowNotes(true)}
                variant="contained"
                color="primary"
                startIcon={<BookmarkIcon />}
              >
                Notes
              </Button>
              <Button
                onClick={onBookmark}
                variant="contained"
                color="primary"
                startIcon={<BookmarkIcon />}
              >
                Bookmark
              </Button>
            </Grid> */}
          </Grid>
          <Grid container direction="row" alignItems="center" justify="center">
            <IconButton
              onClick={onRewind}
              className={classes.controlIcons}
              aria-label="rewind"
            >
              <Replay10RoundedIcon
                className={classes.controlIcons}
                fontSize="inherit"
              />
            </IconButton>
            <IconButton
              onClick={onPlayPause}
              className={classes.controlIcons}
              aria-label="play"
            >
              {playing ? (
                <PauseRoundedIcon fontSize="inherit" />
              ) : (
                <PlayArrowRoundedIcon fontSize="inherit" />
              )}
            </IconButton>
            <IconButton
              onClick={onFastForward}
              className={classes.controlIcons}
              aria-label="forward"
            >
              <Forward10RoundedIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          {/* bottom controls */}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ padding: 16 }}
          >
            <Grid item xs={12}>
              <PrettoSlider
                min={0}
                max={100}
                ValueLabelComponent={(props) => (
                  <ValueLabelComponent {...props} value={elapsedTime} />
                )}
                aria-label="custom thumb label"
                value={played * 100}
                onChange={onSeek}
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onSeekMouseUp}
                onDuration={onDuration}
                style={{ marginBottom: "-15px" }}
              />
            </Grid>

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ flexWrap: "nowrap" }}
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  style={{ flexWrap: "nowrap" }}
                  alignItems="center"
                >
                  <IconButton
                    onClick={onPlayPause}
                    className={classes.bottomIcons}
                  >
                    {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
                  </IconButton>

                  <IconButton
                    // onClick={() => setState({ ...state, muted: !state.muted })}
                    onClick={onMute}
                    className={`${classes.bottomIcons} ${classes.volumeButton}`}
                  >
                    {muted ? (
                      <VolumeOffRoundedIcon />
                    ) : volume > 0.5 ? (
                      <VolumeUpRoundedIcon />
                    ) : (
                      <VolumeDownRoundedIcon />
                    )}
                  </IconButton>

                  <Slider
                    min={0}
                    max={100}
                    value={muted ? 0 : volume * 100}
                    onChange={onVolumeChange}
                    aria-labelledby="input-slider"
                    className={classes.volumeSlider}
                    onMouseDown={onSeekMouseDown}
                    onChangeCommitted={onVolumeSeekDown}
                  />
                  <Button
                    variant="text"
                    onClick={
                      onChangeDispayFormat
                      //     () =>
                      //   setTimeDisplayFormat(
                      //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                      //   )
                    }
                  >
                    <Typography
                      variant="body1"
                      style={{ color: "#fff", marginLeft: 16 }}
                    >
                      {elapsedTime}/{totalDuration}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                style={{
                  flexWrap: "nowrap",
                }}
              >
                <Button
                  onClick={handleClick}
                  aria-describedby={id}
                  className={classes.bottomIcons}
                  variant="text"
                  style={{ marginLeft: "auto" }}
                >
                  <Typography>{playbackRate}X</Typography>
                </Button>

                <Popover
                  container={ref.current}
                  open={open}
                  id={id}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Grid container direction="column-reverse">
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <Button
                        key={rate}
                        //   onClick={() => setState({ ...state, playbackRate: rate })}
                        onClick={() => onPlaybackRateChange(rate)}
                        variant="text"
                      >
                        <Typography
                          color={
                            rate === playbackRate ? "secondary" : "inherit"
                          }
                        >
                          {rate}x
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </Popover>
                <IconButton
                  onClick={onToggleFullScreen}
                  className={classes.bottomIcons}
                >
                  <FullscreenRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;
