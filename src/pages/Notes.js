import React, { useEffect, useState } from "react";
import {
  Container,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

const useStyles = makeStyles({
  masonryGrid: {
    display: "flex",
    marginLeft: -30 /* gutter size offset */,
    width: "auto",
  },
  masonryGridColumn: {
    paddingLeft: 30 /* gutter size */,
    backgroundClip: "padding-box",
  },
  selectCategory: {
    width: 150,
    marginBottom: 10,
  },
});

const Notes = ({ note }) => {
  const [notes, setNotes] = useState([]);
  const [noteByCategory, setNoteByCategory] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const handleSelect = () => {
    const filteredNotes = notes.filter(
      (note) => note.category === notes.category
    );
    setNoteByCategory(filteredNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <InputLabel id='demo-simple-select-label'>Category</InputLabel>
      <Select
        className={classes.selectCategory}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={notes.category}
        // onChange={}
      >
        {notes.map((note) => (
          <MenuItem value={note.category}>{note.category}</MenuItem>
        ))}
      </Select>
      <Masonry
        breakpointCols={breakpoints}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
};

export default Notes;
