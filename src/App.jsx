import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";

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

function App() {
  const [orgRepos, setOrgRepos] = useState();
  const [search, setSearch] = useState();
  const [value, setValue] = useState(0);

  const [selectedRepo, setSelectedRepo] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = () => {
    const getOrgRepos = async () => {
      try {
        // setIsLoading(true);
        const body = { search: search };
        const res = await fetch(
          // https://cors-everywhere.herokuapp.com/
          "http://localhost:5000/search_org",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const jsonData = await res.json();
        await setOrgRepos(jsonData.data);
        await setValue(0);
        // console.log(bounds);
      } catch (err) {
        console.log(err);
      }
    };
    getOrgRepos();
  };

  useEffect(() => {
    console.log(orgRepos);
  }, [orgRepos]);

  return (
    <div className="App">
      <h1 className="header-title">Github Repository Search</h1>
      <h4 className="header-subtitle">
        Search the name of an organization to recieve a list of their
        respositories.
      </h4>
      <div className="search-box">
        <TextField
          id="outlined-basic"
          label="Organization Name"
          variant="outlined"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />{" "}
        <Button type="submit" variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}
      >
        <BottomNavigationAction label="Search Results" icon={<SearchIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      </BottomNavigation>

      <nav aria-label="secondary mailbox folders">
        <List>
          {orgRepos &&
            orgRepos.map((repo) => {
              return (
                <>
                  <Divider />
                  <ListItem
                    disablePadding
                    onClick={() => {
                      handleOpen();
                      setSelectedRepo({
                        name: repo.name,
                        id: repo.id,
                        login: repo.owner.login,
                      });
                    }}
                  >
                    <ListItemButton>
                      <ListItemText primary={repo.name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
        </List>
      </nav>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedRepo && (
            <>
              <h1>{selectedRepo.login}</h1>
              {selectedRepo.name}
              <p></p>
              {selectedRepo.id}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default App;
