import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SearchBox({setSearch, setLoading, setOrgRepos, search, setOrgReposSaved, setValue, setFilter, setFavorites}) {
    const handleSearch = () => {
        setLoading(true);
        setOrgRepos([]);
        setFavorites([]);
        const getOrgRepos = async () => {
          try {
            const body = { search: search };
    
            const res = await fetch(
              // https://cors-everywhere.herokuapp.com/
              "http://githubsearchbackend-env.eba-kztnienv.us-east-2.elasticbeanstalk.com/search_org",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              }
            );
            const jsonData = await res.json();
            await setLoading(false);
            if (jsonData) {
              await setOrgRepos(jsonData.data);
              await setOrgReposSaved(jsonData.data);
            } else {
              await setOrgRepos("Error");
            }
            await setValue(0);
            await setFilter();
    
            // console.log(bounds);
          } catch (err) {
            console.log(err);
          }
        };
        getOrgRepos([]);
      };
    return (
        <div>
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
        </div>
    )
}

export default SearchBox
