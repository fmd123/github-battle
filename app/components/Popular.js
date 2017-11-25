var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function RepoGrid(props){
  console.log("props inside grid", props);
  return(
    <ul className = 'popular-list'>
      {props.repos.map(function(repo, index){
        return(
        <li key={repo.name} className = 'popular-item'>
          <div className = 'popular-rank'>#{index + 1}</div>
          <ul className = 'space-list-items'>
            <li>
              <img
                className = 'avatar'
                src = {repo.owner.avatar_url}
                alt = {'Avatar for ' + repo.owner.login}
              />
            </li>
            <li><a href = {repo.html_url}>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count}stars</li>
          </ul>
        </li>
      )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

function SelectLanguage(props){
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    console.log("props", props);
    return (
      < ul className = 'languages' >
      {languages.map(function(lang) {
        return (
          <li
            style= {lang === props.selectedLanguage ?
              {color: '#d0021b'}: null} onClick={props.onSelect.bind(null, lang)} // null because already established what state it will be on line 9.
  //can also pass other arguments besides context
  //lang where clicked will be passed to updateLanguage
            key={lang}>
              {lang}
          </li>
        )
      })}
      < /ul>
    )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
    // above line is what keeps "this" always bound to correct context
    // .bind() takes in a context and then return a new function
    //here the context being taken in is the 'this' variable for whatever is being clicked.
  }

  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang){
    this.setState(function(){
      console.log("this.state", this.state);
      return{
        selectedLanguage: lang,
        repos: null
      }

    });
    api.fetchPopularRepos(lang)
    .then(function(repos){
      this.setState(function(){

        return{
          repos:repos
        }
      });
    }.bind(this))
  }
  render(){

    return(
      <div>
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}
        />
        {!this.state.repos
        ?<p>Loading</p>
      :<RepoGrid repos = {this.state.repos}/>}
      </div>
    )
  }
}

module.exports = Popular;
