const path = require('path')
const express = require('express');
const { Octokit } = require("@octokit/rest");

const app = express().use(express.static('public'));

const octokit = new Octokit();

app.get('/', (req, res) => {
  octokit.request('GET /orgs/{org}/repos', {
    org: 'takenet'
  })
  .then(({ data }) => {    
    let filterlanguage = data.filter(function(el) {
      return el.language === 'C#';
    })

    const result = filterlanguage
    .map(object => ({
      
      title : object.name,
      text : object.description,
      type : "image/jpeg",
      uri : "https://avatars.githubusercontent.com/u/4369522?s=200&v=4"
    }))
    .sort((a, b)=> b.data - a.data )
    .slice(0,5); 
    
    const repositorios= {};
    result.map((repo, index)=>{
      repositorios[index] = repo;
    })
    // jsonForBuildTake.content.items = result;  
    
    res.status(200).json( repositorios ).end();
  });
  
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});


module.exports = app;
