/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DiscreteSlider from '../Slider/Slider';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginBottom: '10px',
    marginTop: '10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Issue({ issueId, issue, onChange, onDragStop }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  console.log('In Recipe', issueId);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const name = user.name.substring(0, 1);
  // console.log(typeof name);
  // console.log(name);
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {issue.ownerName ? issue.ownerName.substring(0, 1) : ''}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={issue.ownerName}
        subheader={new Date(issue.createdOn).toDateString()}
      />
      <ProgressIndicator />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {issue.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography>{issue.description}</Typography>
      </CardContent>
      {issue.image && (
        <CardMedia
          className={classes.media}
          image="https://via.placeholder.com/150
"
          title="Paella dish"
        />
      )}
      <CardActions disableSpacing>
        <DiscreteSlider
          issueId={issueId}
          onChange={onChange}
          onDragStop={onDragStop}
        />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
