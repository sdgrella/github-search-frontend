import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Popup({
  open,
  setOpen,
  setComment,
  value,
  selectedRepo,
  setSelectedRepo,
  setRepoToSave,
  setFavorites,
  setFavoritesSaved,
  setValue,
  setFilter,
  favoritesSaved,
  favorites,
  repoToSave,
}) {
  const handleClose = () => {
    setOpen(false);
    setComment();
    setSelectedRepo();
    setRepoToSave();
  };

  const handleAddToFavorites = async () => {
    try {
      const res = await axios.post(
        "https://cors-everywhere.herokuapp.com/http://githubsearchbackend-env.eba-kztnienv.us-east-2.elasticbeanstalk.com/add_favorite",
        repoToSave
      );
      await setFavorites([...favorites, res.data]);
      await setFavoritesSaved([...favoritesSaved, res.data]);
      await handleClose();
      await setValue(1);
      await setFilter();
    } catch (error) {
      console.log(error.code);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="selected-repo">
          {selectedRepo && (
            <>
              <div className="organization-name-modal">
                <img
                  src={selectedRepo.avatar}
                  alt="org icon"
                  className="avatar"
                />
                <div className="organization-name-login-modal">
                  <span className="modal-repo-name">{selectedRepo.name}</span>
                  <span className="modal-login-name">{selectedRepo.login}</span>
                </div>
              </div>

              <div className="modal-info">
                <div className="modal-info-item">
                  <span className="modal-info-title">Language: </span>
                  <span className="modal-info-value">
                    {selectedRepo.language}
                  </span>
                </div>

                <div className="modal-info-item">
                  <span className="modal-info-title">Stars: </span>
                  <span className="modal-info-value">
                    {selectedRepo.watchers}
                  </span>
                </div>

                <div className="modal-info-item">
                  <span className="modal-info-title">Date Created: </span>
                  <span className="modal-info-value">{selectedRepo.date}</span>
                </div>
              </div>

              <div className="modal-info-item">
                <span className="modal-info-title">License: </span>
                <span className="modal-info-value">{selectedRepo.license}</span>
              </div>

              <div className="modal-info-item">
                <a
                  href={selectedRepo.url}
                  target="blank"
                  className="modal-repo-link"
                >
                  See Repository On Github{" "}
                </a>
              </div>
            </>
          )}

          <div className="note-box">
            {value === 0 && (
              <>
                <div className="note-input">
                  <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={4}
                    defaultValue=""
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />{" "}
                  <Button variant="outlined" onClick={handleAddToFavorites}>
                    Add To Favorites
                  </Button>
                </div>
              </>
            )}
            {value === 1 && selectedRepo && (
              <div className="notes">
                <div className="notes-title">Notes:</div>
                <div className="notes-content">{selectedRepo.comment}</div>
              </div>
            )}
            {value === 1 &&
              selectedRepo &&
              !selectedRepo.comment &&
              "No Notes Added"}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Popup;
