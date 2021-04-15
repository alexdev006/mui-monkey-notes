import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Grow,
} from "@material-ui/core";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const CreateNote = () => {
  const history = useHistory();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");
  const noteDate = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category, noteDate }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Grow in style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <Container size='sm'>
        <Typography
          className={classes.title}
          variant='h6'
          component='h2'
          color='textSecondary'
          gutterBottom
        >
          Create new note
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            className={classes.field}
            label='Note title'
            variant='outlined'
            color='secondary'
            fullWidth
            required
            error={titleError}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            className={classes.field}
            label='Details'
            variant='outlined'
            color='secondary'
            multiline
            rows={4}
            fullWidth
            required
            error={detailsError}
          />

          <FormControl className={classes.field}>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value='money'
                control={<Radio />}
                label='Money'
              />
              <FormControlLabel
                value='todos'
                control={<Radio />}
                label='Todos'
              />
              <FormControlLabel
                value='reminders'
                control={<Radio />}
                label='Reminders'
              />
              <FormControlLabel value='work' control={<Radio />} label='Work' />
            </RadioGroup>
          </FormControl>

          <Button
            className={classes.btn}
            type='submit'
            color='primary'
            variant='contained'
            endIcon={<KeyboardArrowRightOutlinedIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </Grow>
  );
};

export default CreateNote;
