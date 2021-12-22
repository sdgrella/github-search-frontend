import "./App.css";

import { useState, useEffect } from "react";

import Navigation from "./components/Navigation";

import axios from "axios";

import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import RepoList from "./components/RepoList";
import Popup from "./components/Popup";

function App() {
  const [orgRepos, setOrgRepos] = useState([]);
  const [orgReposSaved, setOrgReposSaved] = useState([]);
  const [search, setSearch] = useState([]);
  const [value, setValue] = useState(0);

  const [selectedRepo, setSelectedRepo] = useState();
  const [comment, setComment] = useState();

  const [repoToSave, setRepoToSave] = useState();

  const [favorites, setFavorites] = useState();
  const [favoritesSaved, setFavoritesSaved] = useState();

  const [loading, setLoading] = useState();

  const [filter, setFilter] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/favorites");
        setFavorites(res.data);
        setFavoritesSaved(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFavorites();
  }, []);

  useEffect(() => {
    console.log("favorites: ", favorites);
    console.log("favoritesSaved: ", favoritesSaved);
  }, [favorites, favoritesSaved]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    console.log("orgRepos", orgRepos);
    console.log("orgReposSaved", orgReposSaved);
  }, [orgRepos, orgReposSaved]);

  useEffect(() => {
    if (selectedRepo) {
      setRepoToSave({
        name: selectedRepo.name,
        id: selectedRepo.id,
        login: selectedRepo.login,
        watchers: selectedRepo.watchers,
        avatar: selectedRepo.avatar,
        language: selectedRepo.language,
        url: selectedRepo.url,
        date: selectedRepo.date,
        license: selectedRepo.license,
        comment: comment,
      });
    }
  }, [comment]);

  useEffect(() => {
    setRepoToSave(selectedRepo);
  }, [selectedRepo]);

  useEffect(() => {
    console.log(repoToSave);
  }, [repoToSave]);

  return (
    <div className="App">
      <Header />

      <SearchBox
        setSearch={setSearch}
        setLoading={setLoading}
        setOrgRepos={setOrgRepos}
        search={search}
        setOrgReposSaved={setOrgReposSaved}
        setValue={setValue}
        setFilter={setFilter}
        setFavorites={setFavorites}
      />

      <Navigation
        value={value}
        setValue={setValue}
        setFilter={setFilter}
        setFavorites={setFavorites}
        favoritesSaved={favoritesSaved}
        setOrgRepos={setOrgRepos}
        orgReposSaved={orgReposSaved}
      />

      <RepoList
        value={value}
        orgReposSaved={orgReposSaved}
        orgRepos={orgRepos}
        setOrgRepos={setOrgRepos}
        favoritesSaved={favoritesSaved}
        filter={filter}
        setFilter={setFilter}
        loading={loading}
        setFavorites={setFavorites}
        setSelectedRepo={setSelectedRepo}
        favorites={favorites}
        handleOpen={handleOpen}
      />

      <Popup
        open={open}
        setOpen={setOpen}
        setComment={setComment}
        value={value}
        selectedRepo={selectedRepo}
        setSelectedRepo={setSelectedRepo}
        setRepoToSave={setRepoToSave}
        setFavorites={setFavorites}
        setFavoritesSaved={setFavoritesSaved}
        setValue={setValue}
        setFilter={setFilter}
        favoritesSaved={favoritesSaved}
        favorites={favorites}
        repoToSave={repoToSave}
      />
    </div>
  );
}

export default App;
