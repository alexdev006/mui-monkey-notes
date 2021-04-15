import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  makeStyles,
  Avatar,
  Grow,
  CardActions,
  Collapse,
  Button,
} from "@material-ui/core";
//import clsx from "clsx";
import { DeleteOutlined } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { blue, green, pink, yellow } from "@material-ui/core/colors";
import { formatDistanceToNow } from "date-fns";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "money") {
        return green[500];
      }
      if (note.category === "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
  cardMarginBottom: {
    marginBottom: 20,
  },
  deleteButton: {
    "&:hover": {
      cursor: "pointer",
      color: "red",
    },
    marginLeft: "auto",
  },
  vertButton: {
    "&:hover": {
      cursor: "pointer",
      color: "blue",
    },
  },
  // expand: {
  //   transform: "rotate(0deg)",
  //   marginLeft: "auto",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: "rotate(180deg)",
  // },
  dateTypo: {
    fontSize: "15px",
  },
  seeMoreButton: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "purple",
      color: "white",
      border: "solid 1px white",
      borderRadius: "5px",
    },
  },
  expandIcon: {
    "&:hover": {
      transform: "rotate(180deg)",
    },
  },
}));

const NoteCard = ({ note, handleDelete }) => {
  const classes = useStyles(note);
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Grow in style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        <Card elevation={1} className={classes.cardMarginBottom}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {note.category[0].toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton className={classes.vertButton}>
                <MoreVertIcon />
              </IconButton>
            }
            title={note.title}
            subheader={note.category}
          />
          <CardContent>
            <Typography gutterBottom className={classes.dateTypo}>
              Create {formatDistanceToNow(new Date(note.noteDate))}
            </Typography>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <Typography
                variant='body2'
                color='textSecondary'
                // noWrap={noExpanded}
                align='justify'
              >
                {note.details}
              </Typography>
            </Collapse>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              onClick={() => setExpanded(!expanded)}
              variant='outlined'
              className={classes.seeMoreButton}
              endIcon={<ExpandMoreIcon className={classes.expandIcon} />}
              size='small'
            >
              See more...
            </Button>

            <IconButton
              onClick={() => handleDelete(note.id)}
              className={classes.deleteButton}
            >
              <DeleteOutlined />
            </IconButton>
          </CardActions>
        </Card>
      </Grow>
    </div>
  );
};

export default NoteCard;
