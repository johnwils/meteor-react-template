import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 100,
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

function valuetext(value) {
  return `${value}`;
}

// function valueLabelFormat(value) {
//   return marks.findIndex(mark => mark.value === value) + 1;
// }

export default function DiscreteSlider({ issueId, onChange, onDragStop }) {
  const classes = useStyles();
  console.log('In Slider', issueId);

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" variant="body2" color="textSecondary">
        Severity
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
        onChange={(e, v) => onChange(issueId, e, v)}
        // onDragStop={onDragStop}
      />
    </div>
  );
}
