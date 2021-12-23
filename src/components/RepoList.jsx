import { React, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

function RepoList({
  value,
  orgReposSaved,
  favoritesSaved,
  setFilter,
  loading,
  orgRepos,
  setSelectedRepo,
  favorites,
  setOrgRepos,
  setFavorites,
  filter,
  handleOpen,
  searchedYet,
}) {
  //Sort
  function sortAsc(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function sortDesc(a, b) {
    if (a.name < b.name) {
      return 1;
    }
    if (a.name > b.name) {
      return -1;
    }
    return 0;
  }

  const handleSortAscOrgRepos = async () => {
    setOrgRepos();
    const orgReposToSort = orgRepos;
    await orgReposToSort.sort(sortAsc);
    await setOrgRepos(orgReposToSort);
  };

  const handleSortDescOrgRepos = async () => {
    setOrgRepos();
    const orgReposToSort = orgRepos;
    await orgReposToSort.sort(sortDesc);
    await setOrgRepos(orgReposToSort);
  };

  const handleSortAscFavorites = async () => {
    setFavorites();
    const favoritesToSort = favorites;
    await favoritesToSort.sort(sortAsc);
    await setFavorites(favoritesToSort);
  };

  const handleSortDescFavorites = async () => {
    setFavorites();
    const favoritesToSort = favorites;
    await favoritesToSort.sort(sortDesc);
    await setFavorites(favoritesToSort);
  };

  //Filter

  useEffect(() => {
    const filterOrgRepos = async () => {
      if (filter && filter.length > 0) {
        const orgReposToFilter = orgReposSaved.filter((item) => {
          return item.name.toLowerCase().includes(filter.toLowerCase());
        });
        await setOrgRepos();
        await setOrgRepos(orgReposToFilter);
      } else setOrgRepos(orgReposSaved);
    };

    const filterFavorites = async () => {
      if (filter && filter.length > 0) {
        const favoritesToFilter = favoritesSaved.filter((item) => {
          return item.name.toLowerCase().includes(filter.toLowerCase());
        });
        await setFavorites();
        await setFavorites(favoritesToFilter);
      } else setFavorites(favoritesSaved);
    };

    filterOrgRepos();
    filterFavorites();
  }, [filter]);

  return (
    <nav className="repo-list" aria-label="secondary mailbox folders">
      <List>
        {/* Sort and Filter Search Results */}
        {((value === 0 && orgReposSaved && orgReposSaved.length > 0) ||
          (value === 1 && favoritesSaved && favoritesSaved.length > 0)) && (
          <>
            <Divider />
            <div className="sort-and-filter">
              <IconButton
                aria-label="sort-asc"
                onClick={
                  value === 0 ? handleSortAscOrgRepos : handleSortAscFavorites
                }
                alt="sort-asc"
              >
                <SortIcon className="sort-asc" />
              </IconButton>
              <IconButton
                aria-label="sort-desc"
                onClick={
                  value === 0 ? handleSortDescOrgRepos : handleSortDescFavorites
                }
                alt="sort-desc"
              >
                <SortIcon />
              </IconButton>
              <TextField
                id="standard-basic"
                label={value === 0 ? "Filter Results" : "Filter Favorites"}
                variant="standard"
                style={{ marginBottom: "15px" }}
                onChange={async (e) => {
                  setFilter(e.target.value);
                }}
              />
            </div>
          </>
        )}

        <Divider />
        {loading && <CircularProgress className="loading" />}
        {value === 0 &&
          orgRepos &&
          orgRepos.map((repo) => {
            return (
              <>
                <ListItem
                  disablePadding
                  onClick={async () => {
                    handleOpen();
                    const date = new Date(repo.created_at);
                    const dateginal =
                      (await (date.getMonth() + 1)) +
                      "-" +
                      date.getDate() +
                      "-" +
                      date.getFullYear();
                    setSelectedRepo({
                      name: repo.name,
                      id: repo.id,
                      login: repo.owner.login,
                      watchers: repo.watchers,
                      avatar: repo.owner.avatar_url,
                      language: repo.language,
                      url: repo.html_url,
                      date: dateginal,
                      license: repo.license
                        ? repo.license.name
                        : "No License Info",
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
        {value === 0 && searchedYet === true &&
          (orgRepos === undefined || orgRepos.length < 1) && (
            <div className="no-saved-favorites">
              No repos found, please try again.
            </div>
          )}
        {value === 1 &&
          favorites &&
          favorites.map((favorite) => {
            return (
              <>
                <ListItem
                  disablePadding
                  onClick={async () => {
                    setSelectedRepo({
                      name: favorite.name,
                      id: favorite.id,
                      login: favorite.login,
                      watchers: favorite.watchers,
                      avatar: favorite.avatar,
                      language: favorite.language,
                      url: favorite.url,
                      date: favorite.date,
                      license: favorite.license,
                      comment: favorite.comment,
                    });
                    await handleOpen();
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={favorite.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            );
          })}
        {value === 1 && favoritesSaved.length < 1 && (
          <div className="no-saved-favorites">No Saved Favorites</div>
        )}
      </List>
    </nav>
  );
}

export default RepoList;
