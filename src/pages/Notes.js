import React, { useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
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
});

const Notes = () => {
  const [notes, setNotes] = useState([]);
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
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <Container>
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
